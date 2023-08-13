import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { useFetcherData } from "~/hooks/useFetcherContext";
import { FieldError } from "~/layout/FieldError";

export const RegisterPasswordInput = ({ name = "password" }) => {
  const { defaultValues = {} } = useFetcherData() || {};
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-slate-900"
      >
        Password
      </label>
      <div className="mt-2 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <LockClosedIcon
              className="h-5 w-5 text-slate-400"
              aria-hidden="true"
            />
          </div>
          <input
            type={passwordVisible ? "text" : "password"}
            autoComplete="new-password"
            placeholder="password"
            name={name}
            id={name}
            defaultValue={defaultValues[name]}
            className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
          />
        </div>
        {passwordVisible ? (
          <button
            type="button"
            onClick={() => setPasswordVisible(false)}
            className="w-24 relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
          >
            <EyeSlashIcon
              className="-ml-0.5 h-5 w-5 text-slate-400"
              aria-hidden="true"
            />
            Hide
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setPasswordVisible(true)}
            className="w-24 relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
          >
            <EyeIcon
              className="-ml-0.5 h-5 w-5 text-slate-400"
              aria-hidden="true"
            />
            Show
          </button>
        )}
      </div>
      <FieldError name={name} />
    </div>
  );
};
