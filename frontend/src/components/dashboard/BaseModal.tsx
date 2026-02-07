import React from "react";

interface BaseModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  error?: string | null;
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  title,
  onClose,
  onConfirm,
  children,
  error,
}) => {
  const [internalError, setInternalError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setInternalError(error ?? null);
  }, [error]);

  React.useEffect(() => {
    if (!isOpen) {
      setInternalError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="transaction-backdrop" onClick={onClose}>
      <div
        className="card transaction-card"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h6 className="card-title">{title}</h6>}

        {children}

        {internalError && <h3 className="card-text danger mb-3">{internalError}</h3>}

        <div className="d-flex justify-content-start gap-3">
          <button
            className="rounded-pill button confirm w-50"
            onClick={() => {
              onConfirm();
            }}
          >
            Confirm
          </button>
          <button
            className="rounded-pill button cancel w-50"
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
