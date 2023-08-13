import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { FC } from "react";
import { useFetcherData } from "~/hooks/useFetcherContext";

export const ServerMessage: FC = () => {
  const data = useFetcherData();

  if (data === undefined) {
    return null;
  }

  console.log("ServerMessage data", data);

  const { errors, success } = data;

  if (success) {
    return (
      <div className="flex rounded-md bg-green-50 p-4 space-x-3">
        <CheckCircleIcon
          className="h-5 w-5 text-green-400"
          aria-hidden="true"
        />
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-green-800">Yay</h3>
          <p className="text-sm text-green-700">{success}</p>
        </div>
      </div>
    );
  }
  if (errors?.serverError) {
    return (
      <div className="flex rounded-md bg-red-50 p-4 space-x-3">
        <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-red-800">Oops</h3>
          <div className="text-sm text-red-700">{errors.serverError}</div>
        </div>
      </div>
    );
  }

  return null;
};
