import Link from "next/link";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>React 練習專案</div>
      <div className={styles.description}>
        歡迎光臨我的頁面
        <div>
          <Link href="/accounting">
            <button className={styles.redirect}>點此開始</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
