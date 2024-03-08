import styles from './styles/legend.module.css'

export default function Legend() {
  return (
    <div className={styles.colorsContainer}>
      <div className={styles.cont}>
        <p className={styles.par}>Copa Libertadores</p>
        <div className={`${styles.square} green`}></div>
      </div>
      <div className={styles.cont}>
        <p className={styles.par}>Copa Sudamericana</p>
        <div className={`${styles.square} yellow`}></div>
      </div>
      <div className={styles.cont}>
        <p className={styles.par}>Descendería por tabla</p>
        <div className={`${styles.square} red`}></div>
      </div>
      <div className={styles.cont}>
        <p className={styles.par}>Descendería por promedios</p>
        <div className={`${styles.square} dark-red`}></div>
      </div>
    </div>
  );
}
