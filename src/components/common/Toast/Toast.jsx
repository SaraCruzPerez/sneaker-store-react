import "./Toast.css";

const Toast = ({ message, action = "add" }) => {
  return (
    <div className={`toast toast--${action}`} role="status" aria-live="polite">
      <span className="toast__symbol">
        {action === "add" ? "+" : "−"} 
      </span>
      <p className="toast__message">{message}</p>
    </div>
  );
};

export default Toast;