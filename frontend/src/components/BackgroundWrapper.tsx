import type { ReactNode } from "react";
import bgimg from "@/assets/img/bg-img2.jpg";

export default function BackgroundWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative w-full min-h-screen flex">
      <div
        className="fixed inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundColor: "#253025",
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
          backgroundPosition: "0 0",
          height: "100vh", 
          minHeight: "100%", 
        }}
      />
      <div className="fixed inset-0 bg-[#253025] opacity-90" />
      <div className="relative z-10 flex w-full">{children}</div>
    </div>
  );
}