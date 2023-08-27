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
import { ActionData, LoaderData } from "~/utils";

export const RequestChangePassword: FC = () => {
  const { csrf } = useLoaderData<LoaderData>();
  const fetcher = useFetcher<ActionData>();

  return (
    <Section>
      <FetcherContext.Provider value={fetcher}>
        <fetcher.Form method="post" noValidate>
          <input name="csrf" value={csrf} hidden readOnly />
          <SectionHeader
            title="Password Recovery"
            description="Request code for password change"
          />
          <SectionItem withStripe>
            <EmailInput />
          </SectionItem>
          <SectionItem>
            <RequestChangePasswordSubmitButton />
            <ServerMessage />
          </SectionItem>
          <SectionItem withStripe>
            <p className="text-center text-sm text-slate-500">
              Not a member? <TextLink to="/register">Sign up here</TextLink>
            </p>
          </SectionItem>
        </fetcher.Form>
      </FetcherContext.Provider>
    </Section>
  );
};

const RequestChangePasswordSubmitButton = () => {
  const fetcher = useFetcherContext();

  const type = "request-change-password";
  const submitting =
    fetcher === undefined ||
    fetcher.formData === undefined ||
    fetcher.state !== "submitting"
      ? false
      : fetcher.formData.get("type") === type;

  return (
    <SubmitButton type={type} disabled={submitting}>
      {submitting ? "Requesting code.." : "Request code"}
    </SubmitButton>
  );
};
