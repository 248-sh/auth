import { FC, PropsWithChildren } from "react";

const Page: FC<PropsWithChildren> = ({ children }) => (
  <article className="flex flex-col flex-1 lg:mx-auto lg:max-w-6xl xl:max-w-7xl px-4 pt-10 pb-16 space-y-10">
    {children}
  </article>
);

export default Page;
