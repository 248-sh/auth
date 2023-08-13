import { HashtagIcon } from "@heroicons/react/20/solid";
import { useFetcherData } from "~/hooks/useFetcherContext";
import { FieldError } from "~/layout/FieldError";

export const CodeInput = ({ name = "code" }) => {
  const { defaultValues = {} } = useFetcherData() || {};

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-slate-900"
      >
        Code
      </label>
      <div className="mt-2 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <HashtagIcon
              className="h-5 w-5 text-slate-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="text"
            autoComplete="one-time-code"
            placeholder="123456"
            name={name}
            id={name}
            defaultValue={defaultValues[name]}
            className="block w-full rounded-md border-0 py-1.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <FieldError name={name} />
    </div>
  );
};
