import { FC, PropsWithChildren } from "react";

export const Page: FC<PropsWithChildren> = ({ children }) => (
  <article className="flex flex-col flex-1 sm:mx-auto sm:max-w-6xl lg:max-w-7xl px-4 pt-10 pb-16 space-y-10">
    {children}
  </article>
);
