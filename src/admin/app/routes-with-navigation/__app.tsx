import { Cog6ToothIcon, HomeIcon, UsersIcon } from "@heroicons/react/20/solid";
import { Outlet } from "@remix-run/react";
import { useState } from "react";

import Sidebar from "~/layout/Sidebar";
import MobileHeaderModule from "~/modules/MobileHeaderModule";

const navigation = [
  { name: "Home", path: "/", icon: HomeIcon },
  { name: "Users", path: "/users", icon: UsersIcon },
  { name: "Settings", path: "/settings", icon: Cog6ToothIcon },
];

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar
        navigation={navigation}
        onSidebarClose={() => setSidebarOpen(false)}
        sidebarOpen={sidebarOpen}
      />
      <MobileHeaderModule onSidebarOpen={() => setSidebarOpen(true)} />
      <div className="md:mx-28 relative">
        <Outlet />
      </div>
    </>
  );
};

export default App;
