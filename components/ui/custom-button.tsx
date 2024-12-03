import { FC, ReactNode } from "react";

type CustomButtonType = {
  children?: ReactNode;
  variant?: "default" | "filled";
};

const CustomButton: FC<CustomButtonType> = ({
  children,
  variant = "default",
}) => {
  return (
    <button
      className={`py-2 px-10 dark:bg-opacity-80  bg-opacity-80 backdrop-blur backdrop-filter ${
        variant === "default"
          ? "border border-white hover:bg-white hover:text-black"
          : "bg-white text-black"
      } rounded-lg font-semibold transition duration-200 hover:translate-y-[-5px]`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
