import type { ReactNode } from "react";
import bgimg from "@/assets/img/bg-img2.jpg"

export default function BackgroundWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full h-screen flex">
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ bgimg })` }}
      />

      {/* Overlay couleur avec transparence */}
      <div className="absolute inset-0 bg-[#253025] opacity-90" />

      {/* Contenu au-dessus */}
      <div className="relative z-10 flex w-full">
        {children}
      </div>
    </div>
  );
}