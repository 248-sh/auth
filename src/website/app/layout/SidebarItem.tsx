import { NavLink } from "@remix-run/react";
import { FC } from "react";
import { join } from "~/utils";

export const SidebarItem: FC<{
  icon?: any;
  image?: string;
  name?: string;
  to: string;
}> = ({ icon: Icon, image, name, to }) => (
  <div className="md:w-16 bg-slate-100 group h-14 relative rounded-md">
    <NavLink
      to={to}
      className={({ isActive }) =>
        join(
          "md:group-hover:absolute flex flex-row items-center min-w-max px-4 py-3 rounded-md space-x-2 text-slate-500",
          isActive ? "bg-slate-300" : "hover:bg-slate-200"
        )
      }
    >
      {Icon && <Icon aria-hidden="true" className="w-8 h-8 text-slate-600" />}
      {image && <img src={image} alt="" className="w-8 h-8 rounded-sm" />}
      {name && (
        <span className="group-hover:block md:hidden font-medium text-base">
          {name}
        </span>
      )}
    </NavLink>
  </div>
);
