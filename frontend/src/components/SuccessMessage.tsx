import { useEffect, useState } from "react";

type SuccessMessageProps = {
  message: string;
  duration?: number;
  onDismiss?: () => void;
};

export function SuccessMessage({
  message,
  duration,
  onDismiss,
}: SuccessMessageProps) {
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
        backgroundColor: "green",
        padding: "10px",
        borderRadius: "4px",
      }}
    >
      {message}
    </div>
  );
}
