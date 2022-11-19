import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { FC, Fragment } from "react";
import SidebarItem from "~/layout/SidebarItem";

const Sidebar: FC<{
  navigation: object[];
  onSidebarClose: () => void;
  sidebarOpen: boolean;
}> = ({ navigation, onSidebarClose, sidebarOpen }) => (
  <>
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        onClose={onSidebarClose}
        className="fixed inset-0 flex z-40 md:hidden"
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-slate-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  onClick={onSidebarClose}
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  />
                </button>
              </div>
            </Transition.Child>
            <nav className="flex flex-1 flex-col px-4 py-6 space-y-3">
              {navigation.map((item) => (
                <SidebarItem
                  key={item.name}
                  to={item.path}
                  name={item.name}
                  icon={item.icon}
                />
              ))}
              <SidebarItem
                to="/profile"
                name="John Smith"
                image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
            </nav>
          </div>
        </Transition.Child>
        <div aria-hidden="true" className="flex-shrink-0 w-14">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>

    {/* Static sidebar for desktop */}
    <section className="md:flex flex-col fixed inset-y-0 justify-items-center hidden w-28 z-10">
      <nav className="flex flex-1 flex-col justify-center px-6 py-8 space-y-4">
        {/* <SidebarItem
          to="/profile"
          name="John Smith"
          image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        />
        <div className="flex-1" /> */}
        {navigation.map((item) => (
          <SidebarItem
            key={item.name}
            to={item.path}
            name={item.name}
            icon={item.icon}
          />
        ))}
        {/* <div className="flex-1" /> */}
        <SidebarItem
          to="/profile"
          name="John Smith"
          image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        />
      </nav>
    </section>
  </>
);

export default Sidebar;
