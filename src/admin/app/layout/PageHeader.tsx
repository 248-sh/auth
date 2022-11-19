import { FC } from "react";
import H1 from "~/layout/H1";

const PageHeader: FC<{
  links: string[];
  title: string;
}> = ({ links, title }) => (
  <header>
    <H1>{title}</H1>
    {links && <nav></nav>}
  </header>
);

export default PageHeader;
