import { FC } from "react";
import {
  useTypedFetcher as useFetcher,
  useTypedLoaderData as useLoaderData,
} from "remix-typedjson";
import { EmailInput } from "~/forms/EmailInput";
import { SubmitButton } from "~/forms/SubmitButton";
import { FetcherContext, useFetcherContext } from "~/hooks/useFetcherContext";
import { Section } from "~/layout/Section";
import { SectionHeader } from "~/layout/SectionHeader";
import { SectionItem } from "~/layout/SectionItem";
import { ServerMessage } from "~/layout/ServerMessage";
import { TextLink } from "~/layout/TextLink";
import { RegisterPasswordInput } from "~/routes/register/RegisterPasswordInput";
import { ActionData, LoaderData } from "~/utils";

export const PasswordRegister: FC = () => {
  const { csrf } = useLoaderData<LoaderData>();
  const fetcher = useFetcher<ActionData>();

  return (
    <Section>
      <FetcherContext.Provider value={fetcher}>
        <fetcher.Form method="post" noValidate>
          <input name="csrf" value={csrf} hidden readOnly />
          <SectionHeader
            title="Password Register"
            description="Register with email and password"
          />
          <SectionItem withStripe>
            <EmailInput />
          </SectionItem>
          <SectionItem>
            <RegisterPasswordInput />
          </SectionItem>
          <SectionItem withStripe>
            <RegisterSubmitButton />
            <ServerMessage />
          </SectionItem>
          <SectionItem>
            <p className="text-center text-sm text-slate-500">
              Already a member? <TextLink to="/login">Sign in here</TextLink>
            </p>
          </SectionItem>
        </fetcher.Form>
      </FetcherContext.Provider>
    </Section>
  );
};

const RegisterSubmitButton = () => {
  const fetcher = useFetcherContext();

  const type = "register";
  const submitting =
    fetcher === undefined ||
    fetcher.formData === undefined ||
    fetcher.state !== "submitting"
      ? false
      : fetcher.formData.get("type") === type;

  return (
    <SubmitButton type={type} disabled={submitting}>
      {submitting ? "Signing up.." : "Sign up"}
    </SubmitButton>
  );
};
