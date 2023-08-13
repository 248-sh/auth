import { SerializeFrom } from "@remix-run/node";
import { FetcherWithComponents } from "@remix-run/react";
import { createContext, useContext } from "react";
import { ActionResponse } from "~/utils";

export const FetcherContext = createContext<
  FetcherWithComponents<SerializeFrom<ActionResponse>> | undefined
>(undefined);

export const useFetcherContext = () => useContext(FetcherContext);
export const useFetcherData = () => {
  const fetcher = useFetcherContext();

  if (fetcher === undefined) {
    return undefined;
  }

  return fetcher.data as ActionResponse | undefined;
};
