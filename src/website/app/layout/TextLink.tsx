import { Link } from "@remix-run/react";
import { FC, PropsWithChildren } from "react";
import { join } from "~/utils";

export const TextLink: FC<
  PropsWithChildren & {
    className?: string;
    to: string;
  }
> = ({ children, className, to }) => (
  <Link
    to={to}
    className={join(
      "font-semibold leading-6 text-slate-500 hover:text-slate-900 transition",
      className
    )}
  >
    {children}
  </Link>
);
