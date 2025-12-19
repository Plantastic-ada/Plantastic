import { RiAddLargeLine } from "react-icons/ri";
import { useState, type ComponentType } from "react";
import Modal from "./Modal";

type FloatingAddButtonProps = {
	FormComponent: ComponentType<{ onClose: () => void }>;
};

export default function FloatingAddButton({ FormComponent }: FloatingAddButtonProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const addButtonClass =
		"h-16 w-16 sm:h-20 sm:w-20 xl:h-24 xl:w-24 2xl:h-28 2xl:w-28 absolute -top-6 md:-top-10 xl:-top-12  2xl:-top-14 left-1/2 -translate-x-1/2  bg-[#2D3D2D] rounded-full z-30";

	const iconClass =
		"w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-10 xl:h-10 2xl:w-14 2xl:h-14 transition-all group-hover:scale-110";

	return (
		<div className={addButtonClass}>
			<button
				onClick={() => setIsModalOpen(true)}
				className="
					rounded-full w-full h-full 
					bg-gradient-to-br from-[#2D3D2D] from-50% to-[#232e23]
					hover:from-[#232e23] hover:to-[#2D3D2D]
					shadow-lg hover:shadow-xl
					hover:-translate-y-1
					transition duration-700
					flex items-center justify-center
					group
				"
			>
				<RiAddLargeLine className={iconClass} />
			</button>

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
				<FormComponent onClose={() => setIsModalOpen(false)} />
			</Modal>
		</div>
	);
}
