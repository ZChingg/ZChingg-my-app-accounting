"use client";
import { useState } from "react";
import styles from "@/styles/page.module.css";

interface FormProps {
  handleAdd: (amount: number, description: string, type: string) => void;
}

export default function Form({ handleAdd }: FormProps) {
  const [amount, setAmount] = useState("0");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("income");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAdd(Number(amount), description, type);
    setAmount("0");
    setDescription("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">收入</option>
        <option value="expense">支出</option>
      </select>
      <input
        type="number"
        placeholder="金額"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="說明"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">新增紀錄</button>
    </form>
  );
}
