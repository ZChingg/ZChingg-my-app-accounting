"use client";
import { useState } from "react";
import styles from "@/styles/accounting.module.css";

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
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
