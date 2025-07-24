import { useEffect, useState } from "react";

type ErrorMessageProps = {
  message: string;
  duration?: number;
  onDismiss?: () => void;
};

export function ErrorMessage({
  message,
  duration,
  onDismiss,
}: ErrorMessageProps) {
  const [visible, setVisible] = useState(!!message);

  if (!duration) {
    duration = 3000;
  }

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onDismiss?.();
      }, duration);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [message, duration, onDismiss]);

  if (!visible || !message) return null;

  return (
    <div
      style={{
        color: "white",
        backgroundColor: "red",
        padding: "10px",
        borderRadius: "4px",
      }}
    >
      {message}
    </div>
  );
}
