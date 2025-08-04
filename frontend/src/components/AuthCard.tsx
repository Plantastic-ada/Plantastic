import { type ReactNode } from "react";
import { clsx } from "clsx";

type AuthCardsProps = {
    title: string;
    children: ReactNode;
    className?: string;
}

export default function AuthCard({ title, children, className}: AuthCardsProps) {
    return (
        <div 
        className={clsx (
        "bg-white shadow-md shadow-black border-[#4f674f] rounded-lg w-full max-w-sm p-4 sm:p-6 lg:p-8",
        className
        )}
        >
        <h1 className="text-2xl font-bold text-gray-900 font-montserrat mb-4 text-center">
            {title}
        </h1>
        {children}
        </div>
    );
}