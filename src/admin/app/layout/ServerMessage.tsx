import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { Fetcher } from "@remix-run/react/transition";
import { FC } from "react";

const ServerMessage: FC<{
  fetcher: Fetcher;
}> = ({ fetcher }) => {
  const action = fetcher.data;

  console.log("ServerMessage action", action);

  if (!action) {
    return null;
  }

  if (action.success) {
    return (
      <div className="flex rounded-md bg-green-50 p-4 space-x-3">
        <CheckCircleIcon
          className="h-5 w-5 text-green-400"
          aria-hidden="true"
        />
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-green-800">Yay</h3>
          <p className="text-sm text-green-700">{action.success}</p>
        </div>
      </div>
    );
  }
  if (action.errors) {
    return (
      <div className="flex rounded-md bg-red-50 p-4 space-x-3">
        <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-red-800">Oops</h3>
          <div className="text-sm text-red-700">
            <ul role="list" className="list-disc pl-5 space-y-1">
              {action.errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ServerMessage;
