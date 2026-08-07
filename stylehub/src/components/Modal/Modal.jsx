import "./Modal.css";
import { FaTimes } from "react-icons/fa";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">

          <h2>{title}</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            <FaTimes />
          </button>

        </div>

        <div className="modal-body">
          {children}
        </div>

      </div>

    </div>
  );
}