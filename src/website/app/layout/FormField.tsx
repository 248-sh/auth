import { ChangeEvent, FC } from "react";
import { join } from "~/utils";

export const FormField: FC<{
  defaultValue: string;
  disabled: boolean;
  label: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}> = ({ defaultValue, disabled, label, name, onChange, value }) => (
  <div className={join("sm:grid sm:grid-cols-3 sm:gap-4")}>
    <label
      htmlFor={name}
      className="flex items-center text-sm font-medium text-slate-700"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={join(
        "sm:col-span-2 sm:h-10 sm:mt-0 sm:text-sm focus:ring-slate-500 focus:border-slate-500 bg-white border-2 border-slate-300 col-span-3 mt-1 px-2 rounded-md",
        disabled ? "pointer-events-none opacity-50" : ""
      )}
    />
  </div>
);
