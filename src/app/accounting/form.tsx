"use client";
import { useState } from "react";

interface FormProps {
  handleAdd: (amount: number, description: string, type: string) => void;
}

export default function Form({ handleAdd }: FormProps) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("income");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAdd(Number(amount), description, type);
    setAmount("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
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
        placeholder="描述"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">新增紀錄</button>
    </form>
  );
}
