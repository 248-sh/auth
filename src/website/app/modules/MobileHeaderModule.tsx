import { Bars3Icon } from "@heroicons/react/20/solid";
import { FC } from "react";

export const MobileHeaderModule: FC<{ onSidebarOpen: () => void }> = ({
  onSidebarOpen,
}) => {
  return (
    <div className="md:hidden bg-slate-100 pl-1 pt-1 sticky top-0 z-10">
      <button
        type="button"
        className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-slate-500 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500"
        onClick={onSidebarOpen}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
};
