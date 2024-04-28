import styles from "@/app/ui/acceso/loading-dots.module.css";

const LoadingDots = ({ color = "#000" }: { color?: string }) => {
  return (
    <span className={styles.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
};

export default LoadingDots;
