import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/confirm-modal.css";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, onConfirm, onCancel }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    onConfirm();          
    navigate("/");
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <p className="modal-text">{message}</p>
        <div className="modal-buttons">
          <button className="btn-true" onClick={handleConfirm}>Yes</button>
          <button className="btn-false" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
