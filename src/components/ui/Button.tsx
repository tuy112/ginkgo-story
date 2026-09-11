import styles from "./Button.module.css";

type Variant = "primary" | "row" | "rowActive" | "ghost";

export function Button({
      children,
      variant = "ghost",
      disabled,
      onClick,
}: {
      children: React.ReactNode;
      variant?: Variant;
      disabled?: boolean;
      onClick?: () => void;
}) {
      return (
            <button
                  className={`${styles.base} ${styles[variant]}`}
                  disabled={disabled}
                  onClick={onClick}
            >
                  {children}
            </button>
      );
}