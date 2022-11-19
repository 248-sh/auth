import { FC } from "react";

const SectionHeader: FC<{
  description: string;
  title: string;
}> = ({ description, title }) => (
  <header className="px-4 sm:px-6 py-5 space-y-1">
    {title && (
      <h2 className="text-lg leading-6 font-medium text-slate-900">{title}</h2>
    )}
    {description && (
      <p className="max-w-2xl text-sm text-slate-500">{description}</p>
    )}
  </header>
);

export default SectionHeader;
