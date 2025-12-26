import { createPortal } from "react-dom";
import { type BackdropProps } from "../types/BackdropProps";

export const Backdrop = ({ isOpen, onClick }: BackdropProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10"
      onClick={onClick}
    />,
    document.body
  );
};
