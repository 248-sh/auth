import { createContext, useContext } from "react";
import { TypedFetcherWithComponents } from "remix-typedjson";
import { ActionData } from "~/utils";

export const FetcherContext = createContext<
  TypedFetcherWithComponents<ActionData> | undefined
>(undefined);

export const useFetcherContext = () => useContext(FetcherContext);
export const useFetcherData = () => {
  const fetcher = useFetcherContext();

  if (fetcher === undefined) {
    return undefined;
  }

  return fetcher.data as ActionData | undefined;
};
