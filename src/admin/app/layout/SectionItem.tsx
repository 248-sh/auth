import { FC, PropsWithChildren } from "react";
import { join } from "~/utils";

const SectionItem: FC<
  PropsWithChildren & {
    withStripe: boolean;
  }
> = ({ children, withStripe = false }) => (
  <div
    className={join(
      "px-4 sm:px-6 py-5 space-y-5",
      withStripe ? "bg-slate-50" : ""
    )}
  >
    {children}
  </div>
);

export default SectionItem;
