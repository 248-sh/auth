import { XCircleIcon } from "@heroicons/react/20/solid";
import { FC } from "react";
import { useFetcherData } from "~/hooks/useFetcherContext";

export const FieldError: FC<{ name: string }> = ({ name }) => {
  const data = useFetcherData();

  if (
    data === undefined ||
    data.type !== "not-valid" ||
    name in data.messages === false
  ) {
    return null;
  }

  return (
    <div className="mt-2 flex rounded-md bg-red-50 p-4 space-x-3">
      <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
      <div className="space-y-2">
        <div className="text-sm text-red-700">{data.messages[name]}</div>
      </div>
    </div>
  );
};
