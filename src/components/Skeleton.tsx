import styles from "@styles/skeleton.module.css";

export default function Skeleton({
  background = "#425164",
  color = "#68798d",
  width = 500,
  height = 50,
  center = false,
}) {
  const isCentered = center ? "0 auto" : "";

  const containerConfig = {
    backgroundColor: background,
    width,
    height,
    margin: isCentered,
  };

  const movementConfig = {
    backgroundColor: color,
  };

  return (
    <div className={styles.skeletonContainer} style={containerConfig}>
      <div className={styles.skeletonMovement} style={movementConfig}></div>
    </div>
  );
}
