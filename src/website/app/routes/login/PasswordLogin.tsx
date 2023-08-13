import { useFetcher, useLoaderData } from "@remix-run/react";
import { FC } from "react";
import { EmailInput } from "~/forms/EmailInput";
import { SubmitButton } from "~/forms/SubmitButton";
import { FetcherContext, useFetcherContext } from "~/hooks/useFetcherContext";
import { Section } from "~/layout/Section";
import { SectionHeader } from "~/layout/SectionHeader";
import { SectionItem } from "~/layout/SectionItem";
import { ServerMessage } from "~/layout/ServerMessage";
import { TextLink } from "~/layout/TextLink";
import { LoginPasswordInput } from "~/routes/login/LoginPasswordInput";
import { ActionResponse } from "~/utils";

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

export const PasswordLogin: FC = () => {
  const { csrf } = useLoaderData();
  const fetcher = useFetcher<ActionResponse>();

  return (
    <Section>
      <FetcherContext.Provider value={fetcher}>
        <fetcher.Form method="post" noValidate>
          <input name="csrf" value={csrf} hidden readOnly />
          <SectionHeader
            title="Password Login"
            description="Login with email and password"
          />
          <SectionItem withStripe>
            <EmailInput />
          </SectionItem>
          <SectionItem>
            <LoginPasswordInput />
          </SectionItem>
          <SectionItem withStripe>
            <LoginSubmitButton />
            <ServerMessage />
          </SectionItem>
          <SectionItem>
            <p className="text-center text-sm text-slate-500">
              Not a member? <TextLink to="/register">Sign up here</TextLink>
            </p>
          </SectionItem>
        </fetcher.Form>
      </FetcherContext.Provider>
    </Section>
  );
};

const LoginSubmitButton = () => {
  const fetcher = useFetcherContext();

  const type = "login";
  const submitting =
    fetcher?.state === "submitting"
      ? fetcher.formData?.get("type") === type
      : false;

  return (
    <SubmitButton type={type} disabled={submitting}>
      {submitting ? "Signing in.." : "Sign in"}
    </SubmitButton>
  );
};
