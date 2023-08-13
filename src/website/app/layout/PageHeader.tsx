import { FC } from "react";
import { H1 } from "~/layout/H1";

export const PageHeader: FC<{
  title: string;
}> = ({ title }) => (
  <header>
    <H1>{title}</H1>
  </header>
);
