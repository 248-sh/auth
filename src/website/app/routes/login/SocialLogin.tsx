import { FC } from "react";
import {
  useTypedFetcher as useFetcher,
  useTypedLoaderData as useLoaderData,
} from "remix-typedjson";
import { FetcherContext } from "~/hooks/useFetcherContext";
import { Section } from "~/layout/Section";
import { SectionHeader } from "~/layout/SectionHeader";
import { SectionItem } from "~/layout/SectionItem";
import { ServerMessage } from "~/layout/ServerMessage";
import { ActionData, LoaderData } from "~/utils";
import { SocialButtons } from "../social/SocialButtons";

export const SocialLogin: FC = () => {
  const { csrf } = useLoaderData<LoaderData>();
  const fetcher = useFetcher<ActionData>();

  return (
    <Section>
      <FetcherContext.Provider value={fetcher}>
        <fetcher.Form method="post" noValidate>
          <input name="csrf" value={csrf} hidden readOnly />
          <SectionHeader
            title="Social Login"
            description="Login with external identity provider"
          />
          <SectionItem withStripe>
            <SocialButtons />
            <ServerMessage />
          </SectionItem>
        </fetcher.Form>
      </FetcherContext.Provider>
    </Section>
  );
};
