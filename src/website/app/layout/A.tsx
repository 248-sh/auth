import { NavLink } from "@remix-run/react";
import { FC, PropsWithChildren } from "react";
import { join } from "~/utils";

export const A: FC<
  PropsWithChildren & {
    className: string;
    selected: boolean;
    to: string;
  }
> = ({ children, className, selected, to }) => (
  <NavLink
    to={to}
    className={join(
      selected ? "bg-slate-300" : "hover:bg-slate-200",
      "bg-slate-100 max-w-[10rem] px-4 py-3 rounded-md text-center text-slate-500",
      className
    )}
  >
    {children}
  </NavLink>
);
