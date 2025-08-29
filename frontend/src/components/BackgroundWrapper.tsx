import type { ReactNode } from "react";
import bgimg from "@/assets/img/bg-img2.jpg";

export default function BackgroundWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative w-full h-screen flex">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `linear-gradient(rgba(37, 48, 37, 0.9), rgba(37, 48, 37, 0.9)), url(${bgimg})`,
          backgroundColor: "#253025",
          backgroundRepeat: "repeat, repeat",
          backgroundPosition: "center, center ",
          backgroundSize: "auto, auto",
        }}
      />
      <div className="relative z-10 flex w-full">{children}</div>
    </div>
  );
}
