"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import showNotify from "@/components/shownotify";
import { auth, db } from "@/utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Page() {
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  // 監聽登入狀態
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsSignedIn(true);
      } else {
        setUser(null);
        setIsSignedIn(false);
      }
    });
    return () => unsubscribe(); 
  }, []);

  // 註冊
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        createEmail,
        createPassword
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        uid: user.uid,
      });

      setCreateEmail("");
      setCreatePassword("");
      showNotify("success", "Success!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        // console.log(error.message);
        showNotify("error", "Error! " + error.message);
      } else {
        showNotify("error", "An unknown error occurred");
      }
    }
  };

  // 登入
  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, signinEmail, signinPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setIsSignedIn(true);
        showNotify("success", "Success!");
      })
      .catch((error) => {
        // console.log(error.message);
        showNotify("error", "Error! " + error.message);
      });
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>REACT PRACTICE PROJECT</h3>
      <div className={styles.description}>
        <ToastContainer />
        {!isSignedIn ? (
          <form onSubmit={handleSignin}>
            <h3>Log In</h3>
            <input
              type="email"
              placeholder="Email"
              value={signinEmail}
              onChange={(e) => setSigninEmail(e.target.value)}
              required
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={signinPassword}
              onChange={(e) => setSigninPassword(e.target.value)}
              required
            />
            <br />
            <button type="submit">Log In</button>
          </form>
        ) : (
          <>
            <p>
              Hi {user?.email},<br />
              Welcome to Money Manager!
            </p>
            <div>
              <Link href="/accounting">
                <button className={styles.redirect}>Get Started</button>
              </Link>
            </div>
          </>
        )}
        <form style={{ marginTop: "20px" }} onSubmit={handleCreate}>
          <h3>Sign Up</h3>
          <input
            type="email"
            placeholder="Email"
            value={createEmail}
            onChange={(e) => setCreateEmail(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={createPassword}
            onChange={(e) => setCreatePassword(e.target.value)}
            required
          />
          <br />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
