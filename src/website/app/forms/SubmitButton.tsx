import { FC, PropsWithChildren } from "react";
import { join } from "~/utils";

export const SubmitButton: FC<
  PropsWithChildren & { type: string; disabled?: boolean }
> = ({ type, disabled, children }) => (
  <button
    type="submit"
    name="type"
    value={type}
    disabled={disabled}
    className={join(
      "flex w-full justify-center rounded-md bg-slate-500 hover:bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 transition",
      disabled ? "opacity-50" : ""
    )}
  >
    {children}
  </button>
);
