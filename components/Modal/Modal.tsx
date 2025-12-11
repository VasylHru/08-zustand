"use client";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useCallback } from "react";
import css from "./Modal.module.css";

type ModalProps = {
  children: React.ReactNode;
  onClose?: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {
  const router = useRouter();

  const close = useCallback(() => {
    if (onClose) onClose();
    else router.back();
  }, [onClose, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <div className={css.backdrop} onClick={close}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
