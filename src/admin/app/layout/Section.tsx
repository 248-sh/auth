import { FC, PropsWithChildren } from "react";
import { join } from "~/utils";

const Section: FC<
  PropsWithChildren & {
    withBorder: boolean;
  }
> = ({ children, withBorder = true }) => (
  <section
    className={join(
      "bg-white divide-y divide-slate-200",
      withBorder ? "rounded-md shadow overflow-hidden" : ""
    )}
  >
    {children}
  </section>
);

export default Section;
