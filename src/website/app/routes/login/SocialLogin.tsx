import { useFetcher, useLoaderData } from "@remix-run/react";
import { FC } from "react";
import { FetcherContext } from "~/hooks/useFetcherContext";
import { Section } from "~/layout/Section";
import { SectionHeader } from "~/layout/SectionHeader";
import { SectionItem } from "~/layout/SectionItem";
import { ServerMessage } from "~/layout/ServerMessage";
import { ActionResponse } from "~/utils";
import { SocialButtons } from "../social/SocialButtons";

// const initialState = {
//   passwordVisible: false,
// };
// const reducer = produce((draft, { type, payload }) => {
//   console.log("reducer type", type, payload);

//   switch (type) {
//     case "show-password":
//       draft.passwordVisible = true;
//       break;
//     case "hide-password":
//       draft.passwordVisible = false;
//       break;
//   }
// });

export const SocialLogin: FC = () => {
  const { csrf } = useLoaderData();
  const fetcher = useFetcher<ActionResponse>();

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