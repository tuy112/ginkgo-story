import styles from "./Panal.module.css";

export function Panel({
      children,
      className = "",
}: {
      children: React.ReactNode;
      className?: string;
}) {
      return <div className={`${styles.panel} ${className}`}>{children}</div>;
}