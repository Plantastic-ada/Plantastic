import type { ModalProps } from "../types/ModalProps";

export default function Modal({ isOpen, onClose, children}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onClose}>
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
            >
                <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={onClose}>
                    x
                </button>
                {children}
            </div>
        </div>
    );
}