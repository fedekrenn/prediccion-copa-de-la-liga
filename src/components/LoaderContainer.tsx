// Components
import Skeleton from "./Skeleton.tsx";
// Styles
import styles from "@styles/table.module.css";

export default function loaderContainer() {
  return (
    <div className={styles.loaderContainer}>
      <span className={styles.loader}></span>
      <Skeleton width={"100%"} height={50} />
      {Array.from({ length: 28 }).map((_, index) => (
        <Skeleton key={index} width={"100%"} height={32} />
      ))}
    </div>
  );
}
