import Link from "next/link";
import styles from "@/styles/page.module.css";

interface RecordItem {
  id: number;
  amount: number;
  description: string;
  type: string;
}

interface ListProps {
  records: RecordItem[];
  handleDelete: (id: number) => void;
}

export default function List({ records, handleDelete }: ListProps) {
  // 金額加總
  const subtotal = records.reduce((acc, record) => {
    return acc + record.amount;
  }, 0);

  return (
    <>
      <ul>
        {records.map((record) => (
          <div key={record.id} className={styles.record}>
            <div>
              <div
                style={{
                  width: "80px",
                  color: record.amount < 0 ? "red" : "green",
                }}
              >
                {record.amount}
              </div>
              <div>{record.description}</div>
            </div>
            <button onClick={() => handleDelete(record.id)}>刪除</button>
          </div>
        ))}
      </ul>
      <p style={{ margin: "20px 0", color: "white" }}>小計：{subtotal}</p>
      <Link href="/">
        <button className={styles.redirect}>返回首頁</button>
      </Link>
    </>
  );
}
