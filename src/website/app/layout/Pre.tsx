import { FC, PropsWithChildren } from "react";

export const Pre: FC<PropsWithChildren> = ({ children }) => (
  <pre className="bg-gray-100 rounded-md overflow-x-auto text-base leading-7 text-gray-600 px-6 lg:px-8 py-4 sm:py-6">
    {children}
  </pre>
);
