import Link from "next/link";
import styles from "@/styles/accounting.module.css";

interface RecordItem {
  id: string;
  amount: number;
  description: string;
  type: string;
}

interface ListProps {
  records: RecordItem[];
  handleDelete: (id: string) => void;
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
            <button onClick={() => handleDelete(record.id)}>Delete</button>
          </div>
        ))}
      </ul>
      <p style={{ margin: "20px 0", color: "white" }}>Total：{subtotal}</p>
      <Link href="/">
        <button className={styles.redirect}>Homepage</button>
      </Link>
    </>
  );
}
