"use client";
import { Eye, EyeClosed } from "lucide-react";
import { forwardRef, InputHTMLAttributes, useState } from "react";
import { FieldError } from "react-hook-form";

type PropsCustomInput = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error: FieldError | undefined;
};

const CustomInput = forwardRef<HTMLInputElement, PropsCustomInput>(
  ({ error, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    if (type === "password") {
      return (
        <div
          className={`w-full py-2 text-sm border bg-transparent text-white px-4 rounded-full focus-within:ring-2 flex gap-2 ${
            error
              ? "focus-within:ring-red-500 border-red-600"
              : "focus-within:ring-blue-500 border-gray-800"
          }`}
        >
          <input
            ref={ref}
            type={showPassword ? "text" : "password"}
            className="bg-transparent outline-none w-full placeholder-white"
            {...props}
          />
          {showPassword ? (
            <EyeClosed
              className="cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          ) : (
            <Eye
              className="cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          )}
        </div>
      );
    }
    return (
      <input
        ref={ref}
        className={`w-full py-2 text-sm border bg-transparent text-white placeholder-white px-4 rounded-full focus:ring-2 outline-none ${
          error
            ? "focus:ring-red-500 border-red-600"
            : "focus:ring-blue-500 border-gray-800"
        }`}
        {...props}
      />
    );
  }
);

CustomInput.displayName = "CustomInput";
export default CustomInput;
