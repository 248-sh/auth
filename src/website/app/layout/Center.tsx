import { FC, PropsWithChildren } from "react";
import { join } from "~/utils";

export const Center: FC<PropsWithChildren & { horizontal?: boolean }> = ({
  children,
  horizontal = false,
}) => (
  <div
    className={join(
      "flex flex-1 items-center justify-center",
      horizontal ? "flex-row" : "flex-col"
    )}
  >
    {children}
  </div>
);
