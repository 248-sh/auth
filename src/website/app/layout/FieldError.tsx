import { XCircleIcon } from "@heroicons/react/20/solid";
import { FC } from "react";
import { useFetcherData } from "~/hooks/useFetcherContext";

export const FieldError: FC<{ name: string }> = ({ name }) => {
  const data = useFetcherData();

  if (data === undefined) {
    return null;
  }

  const { errors } = data;

  if (errors === undefined || name in errors === false) {
    return null;
  }

  const error = errors[name];

  console.log("FieldError name, error", name, error);

  return (
    <div className="mt-2 flex rounded-md bg-red-50 p-4 space-x-3">
      <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
      <div className="space-y-2">
        <div className="text-sm text-red-700">{error}</div>
      </div>
    </div>
  );
};
