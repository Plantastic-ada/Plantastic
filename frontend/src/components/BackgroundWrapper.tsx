import clsx from "clsx";

type BackgroundWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export default function BackgroundWrapper({ children, className }: BackgroundWrapperProps) {
  return (
    <div
      className={clsx(
        "w-full h-screen flex",
        "bg-[url('./assets/img/bg-img2.jpg')] bg-cover bg-center",
        "bg-[#4F674F] bg-opacity-90",
        className
      )}
    >
      {children}
    </div>
  );
}