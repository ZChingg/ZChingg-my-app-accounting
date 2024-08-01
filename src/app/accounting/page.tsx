"use client";
import Form from "@/components/form";
import List from "@/components/list";
import { useState, useEffect } from "react";
import styles from "@/styles/accounting.module.css";
import { auth, db } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Accounting() {
  const [records, setRecords] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // 監聽登入狀態
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchRecords(user.uid);
      } else {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, []);

  // 獲取花費
  const fetchRecords = (uid: string) => {
    const q = query(
      collection(db, "records"),
      where("uid", "==", uid),
      orderBy("timestamp", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      const recordsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecords(recordsData);
    });
  };

  // 新增花費
  const handleAdd = async (
    amount: number,
    description: string,
    type: string
  ) => {
    if (user) {
      await addDoc(collection(db, "records"), {
        amount: type === "income" ? amount : -amount,
        description,
        type,
        uid: user.uid,
        timestamp: new Date(),
      });
    }
  };

  // 刪除花費
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "records", id));
  };

  // 登出系統
  const handleLogOut = () => {
    auth.signOut();
    router.push("/");
  };

  return (
    <div className={styles.wrapper}>
      <p>
        Hi {user?.email},<br />
        Welcome to Money Manager!
      </p>
      <button className={styles.redirect} onClick={handleLogOut}>
        Log Out
      </button>
      <Form handleAdd={handleAdd} />
      <List records={records} handleDelete={handleDelete} />
    </div>
  );
}
