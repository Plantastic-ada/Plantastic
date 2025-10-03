import { type FieldError, type UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";

type InputFieldProps = {
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
};

export default function InputField({
  label,
  type = "text",
  placeholder,
  register,
  error,
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-900 font-montserrat mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={clsx(
          "w-full p-2.5 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500",
          "bg-gray-50",
          error ? "border border-red-500 text-red-700" : "border border-gray-300 text-gray-900"
        )}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}
