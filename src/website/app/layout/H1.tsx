import { FC, PropsWithChildren } from "react";

export const H1: FC<PropsWithChildren> = ({ children }) => (
  <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900">
    {children}
  </h1>
);
