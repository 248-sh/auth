import { FC, PropsWithChildren } from "react";
import { join } from "~/utils";

export const Around: FC<PropsWithChildren & { horizontal?: boolean }> = ({
  children,
  horizontal = false,
}) => (
  <div
    className={join(
      "flex flex-1 items-center justify-around",
      horizontal ? "flex-row" : "flex-col"
    )}
  >
    {children}
  </div>
);
