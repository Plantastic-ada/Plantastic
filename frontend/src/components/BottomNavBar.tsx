import { PiPlantBold } from "react-icons/pi";
import { BiSolidBookBookmark } from "react-icons/bi";
import { RiAddLargeLine } from "react-icons/ri";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router";
import Modal from "./Modal";
import AddPlantForm from "./AddPlantForm";
import { useState } from "react";

export default function BottomNavigation() {
	const navigate = useNavigate();
	const location = useLocation();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const isActive = (path: string) => location.pathname === path;

	const getButtonClass = (path: string) => {
		const baseClass =
			"group hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-1";
		const activeClass = isActive(path) ? "text-yellow-200" : "";
		return `${baseClass} ${activeClass}`;
	};

	const getIconClass = (path: string) => {
		const baseClass =
			"w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-10 xl:h-10 2xl:w-14 2xl:h-14 transition-all group-hover:scale-110";
		const activeClass = isActive(path) ? "text-yellow-200 scale-110" : "";
		return `${baseClass} ${activeClass}`;
	};

	const textClass = "hidden sm:block sm:text-xs xl:text-sm 2xl:text-lg";

	const AddButton =
		"h-16 w-16 sm:h-20 sm:w-20 xl:h-24 xl:w-24 2xl:h-28 2xl:w-28 absolute -top-6 md:-top-10 xl:-top-12  2xl:-top-14 left-1/2 -translate-x-1/2  bg-[#2D3D2D] rounded-full z-30";

	return (
		<div
			id="navbar"
			className="fixed bottom-4 h-20 sm:h-24 2xl:h-28 left-4 right-4  xl:left-10 xl:right-10 2xl:right-12 2xl:left-12 grid grid-cols-2 gap-[4rem] text-white  mb-6 font-montserrat opacity-90"
		>
			<div
				id="right_navbar"
				className="relative z-20 bg-[#2D3D2D] grid grid-cols-2 place-items-center rounded-l-[2rem] pl-4"
			>
				<button
					id="digital-garden-button"
					onClick={() => navigate("/")}
					className={getButtonClass("/")}
					title="digital-garden"
				>
					<PiPlantBold className={getIconClass("/")} />
					<p className={textClass}>Digital garden</p>
				</button>
				<button
					onClick={() => navigate("/encyclopedia")}
					id="encyclopedia_button"
					className={getButtonClass("/encyclopedia")}
					title="encyclopedia"
				>
					<BiSolidBookBookmark className={getIconClass("/encyclopedia")} />
					<p className={textClass}>Encyclopedia</p>
				</button>
			</div>
			<div
				id="left_navbar"
				className="relative z-20 bg-[#2D3D2D] grid grid-cols-2 place-items-center rounded-r-[2rem] pr-4 "
			>
				<button
					id="advices_button"
					onClick={() => navigate("/advices")}
					className={getButtonClass("/advices")}
					title="advices"
				>
					<HiOutlineLightBulb className={getIconClass("/advices")} />
					<p className={textClass}>Advices</p>
				</button>
				<button
					id="forum_button"
					onClick={() => navigate("/forum")}
					className={getButtonClass("/forum")}
					title="forum"
				>
					<IoChatbubbleEllipsesOutline className={getIconClass("/forum")} />
					<p className={textClass}>Forum</p>
				</button>
			</div>

			{/* ADD A PLANT BUTTON */}
			{isActive("/") && (
				<div className={AddButton}>
					<button
						id="add_button"
						onClick={() => setIsModalOpen(true)}
						className="
        rounded-full w-full h-full 
        bg-gradient-to-br from-[#2D3D2D] from-50% to-[#232e23]
        hover:from-[#232e23] hover:to-[#2D3D2D] shadow-lg hover:shadow-xl
        hover:-translate-y-1
        transition duration-700
        flex items-center justify-center
        group"
					>
						<div className="grid group-hover:-translate-y-1 transition duration-700">
							<RiAddLargeLine className={getIconClass("add-plant")} />
						</div>
					</button>
					<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
						<AddPlantForm onClose={() => setIsModalOpen(false)}></AddPlantForm>
					</Modal>
				</div>
			)}
			<div
				id="middle_navbar"
				className="
        absolute z-10 bottom-0 h-full left-1/2 -translate-x-1/2 w-1/2 bg-[#2D3D2D] pointer-events-none "
			></div>
		</div>
	);
}
