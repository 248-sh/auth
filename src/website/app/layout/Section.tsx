import { FC, PropsWithChildren } from "react";
import { join } from "~/utils";

export const Section: FC<
  PropsWithChildren & {
    withBorder?: boolean;
  }
> = ({ children, withBorder = true }) => (
  <section
    className={join(
      "bg-white divide-y divide-slate-200",
      withBorder ? "rounded-md shadow shadow-slate-300 overflow-hidden" : ""
    )}
  >
    {children}
  </section>
);
