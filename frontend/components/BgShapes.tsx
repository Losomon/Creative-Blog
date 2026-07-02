import styles from "@/styles/home.module.css";

export default function BgShapes() {
  return (
    <div className={styles.bgShapes}>
      <div className={styles.gridPattern} />
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />
      <div className={`${styles.blob} ${styles.blob3}`} />
    </div>
  );
}
