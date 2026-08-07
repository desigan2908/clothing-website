import "./Toast.css";
import { useEffect } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

export default function Toast({
  message,
  type = "success",
  show,
  onClose,
}) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className={`toast ${type}`}>

      <div className="toast-content">

        {type === "success" ? (
          <FaCheckCircle />
        ) : (
          <FaExclamationCircle />
        )}

        <span>{message}</span>

      </div>

    </div>
  );
}