import React from "react";
import "./Toast.css";

interface ToastProps {
  message: string;
  action?: "add" | "remove" | "error";
  onClose?: () => void; 
}

const Toast: React.FC<ToastProps> = ({ message, action = "add", onClose }) => {
  return (
    <div 
      className={`toast toast--${action}`} 
      role="status" 
      aria-live="polite"
      onClick={onClose} 
    >
      <span className="toast__symbol">
        {action === "add" ? "+" : "−"} 
      </span>
      <p className="toast__message">{message}</p>
    </div>
  );
};

export default Toast;