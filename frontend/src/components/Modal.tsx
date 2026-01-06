import type { ModalProps } from "../types/ModalProps";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, children, size = "md" }: ModalProps) {
	if (!isOpen) return null;
	const sizeClasses = {
		sm: "max-w-md",
		md: "max-w-2xl",
		lg: "max-w-4xl",
		xl: "max-w-6xl",
	};

	return createPortal(
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
			<div
				className={`bg-amber-50/95 rounded-lg p-4 sm:p-6 md:p-8 w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto relative shadow-xl font-bellota mx-4 sm:mx-6`}
				onClick={(e) => e.stopPropagation()}
			>
				<button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
					x
				</button>
				{children}
			</div>
		</div>,
		document.body
	);
}
