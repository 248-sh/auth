import { FC } from "react";
import { join } from "~/utils";

// const tabs = [
//   { name: "General", href: "#", current: true },
//   { name: "Password", href: "#", current: false },
//   { name: "Notifications", href: "#", current: false },
//   { name: "Plan", href: "#", current: false },
//   { name: "Billing", href: "#", current: false },
//   { name: "Team Members", href: "#", current: false },
// ];

export const TabsModule: FC<{
  tabs: { name: string; href: string; current: boolean }[];
}> = ({ tabs }) => {
  return (
    <>
      <div className="lg:hidden">
        <label htmlFor="selected-tab" className="sr-only">
          Select a tab
        </label>
        <select
          id="selected-tab"
          name="selected-tab"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
          defaultValue={tabs.find((tab) => tab.current)?.name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="lg:block hidden">
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={join(
                  tab.current
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700",
                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                )}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};
