import { ChangeEvent, Dispatch, SetStateAction, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface InputFieldProps {
  label: string;
  type?: "text" | "password" | "email";
  placeholder?: string;
  icon?: ReactNode;
  suffix?: ReactNode;
  className?: string;
  value?: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export function InputField({
  label,
  type = "text",
  placeholder,
  icon,
  suffix,
  className,
  value,
  setValue,
}: InputFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-label-03 text-foreground">{label}</span>
      <div className="flex items-center gap-3 bg-background rounded-full px-4 py-3.5">
        {icon && (
          <span className="text-gray-400 shrink-0 [&_svg]:size-[18px]">
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-body-04 text-foreground placeholder:text-gray-400 outline-none min-w-0"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
          }}
        />
        {suffix && (
          <span className="text-gray-400 shrink-0 [&_svg]:size-[18px]">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
