interface RecordItem{
  id: number,
  amount: number,
  description: string,
  type: string
};

interface ListProps{
  records: RecordItem[],
  handleDelete: (id: number) => void
};

export default function List({ records, handleDelete }: ListProps) {
  // 金額加總
  const subtotal = records.reduce((acc, record) => {
    return acc + record.amount;
  }, 0);

  return (
    <>
      <ul>
        {records.map((record) => (
          <li key={record.id}>
            <span style={{ color: record.amount < 0 ? "red" : "green" }}>
              {record.amount}
            </span>
            <span>{record.description}</span>
            <button onClick={() => handleDelete(record.id)}>刪除</button>
          </li>
        ))}
      </ul>
      <p>小計：{subtotal}</p>
    </>
  );
}
