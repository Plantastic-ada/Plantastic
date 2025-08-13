import type { ReactNode } from "react";


type DescriptionProps = {
  logo: string;
  descriptionTextJSX: ReactNode;
};

export default function Description({
  logo,
  descriptionTextJSX,
}: DescriptionProps) {
  return (
    <div className=" flex flex-col items-center">
      <img 
      src={logo} 
      alt="Plantastic logo" 
      className="sm:w-32 sm:h-32 lg:w-48 lg:h-48 w-40 h-40 object-contain lg:pb-12 " 
      />
      <div className=" leading-[1.5] text-[#FFFFE3] block text-sm  lg:text-xl antialiased font-normal text-center  font-montserrat">
        {descriptionTextJSX}
      </div>
    </div>
  );
}
