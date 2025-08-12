import { type ReactNode } from "react";
import { clsx } from "clsx";

// React Props are like function arguments in JavaScript and attributes in HTML.
type AuthCardsProps = {
    title: string;
    children: ReactNode;
    className?: string;
}

export default function AuthCard({ title, children, className }: AuthCardsProps) {
  return (
    <div
      className={clsx(
        "bg-white/95 backdrop-blur-sm shadow-lg shadow-black/20 border border-[#4f674f] rounded-xl",
        "w-[90%] max-w-xs sm:max-w-sm", // largeur plus petite sur mobile
        "p-3 sm:p-4 lg:p-6", // moins de padding sur mobile
        "mx-auto", // centre horizontalement
        className
      )}
    >
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-montserrat mb-4 text-center">
        {title}
      </h1>
      {children}
    </div>
  );
}
