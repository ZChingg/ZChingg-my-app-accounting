"use client";
import Form from "./components/form";
import List from "./components/list";
import { useState } from "react";
import styles from "./components/page.module.css";

export default function Accounting() {
  const [records, setRecords] = useState([
    {
      id: Math.random(),
      amount: -1200,
      description: "吃大餐",
      type: "expense",
    },
    {
      id: Math.random(),
      amount: -500,
      description: "咖啡十杯",
      type: "expense",
    },
    {
      id: Math.random(),
      amount: -200,
      description: "生活用品",
      type: "expense",
    },
    {
      id: Math.random(),
      amount: 50000,
      description: "十月份薪資",
      type: "income",
    },
  ]);

  // 新增花費
  const handleAdd = (amount: number, description: string, type: string) => {
    setRecords([
      ...records,
      {
        id: Math.random(),
        amount: type === "income" ? amount : -amount,
        description,
        type,
      },
    ]);
  };

  // 刪除花費，以 filter 過濾並回傳新陣列
  const handleDelete = (id: number) => {
    setRecords(
      records.filter((record) => {
        return record.id !== id;
      })
    );
  };

  return (
    <div className={styles.wrapper}>
      <Form handleAdd={handleAdd} />
      <List records={records} handleDelete={handleDelete} />
    </div>
  );
}
