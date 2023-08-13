import { useFetcher, useLoaderData } from "@remix-run/react";
import { FC } from "react";
import { CodeInput } from "~/forms/CodeInput";
import { SubmitButton } from "~/forms/SubmitButton";
import { FetcherContext, useFetcherContext } from "~/hooks/useFetcherContext";
import { Section } from "~/layout/Section";
import { SectionHeader } from "~/layout/SectionHeader";
import { SectionItem } from "~/layout/SectionItem";
import { ServerMessage } from "~/layout/ServerMessage";
import { TextLink } from "~/layout/TextLink";
import { ActionResponse } from "~/utils";
import { RegisterPasswordInput } from "../register/RegisterPasswordInput";

export const ChangePassword: FC = () => {
  const { csrf } = useLoaderData();
  const fetcher = useFetcher<ActionResponse>();

  return (
    <Section>
      <FetcherContext.Provider value={fetcher}>
        <fetcher.Form method="post" noValidate>
          <input name="csrf" value={csrf} hidden readOnly />
          <SectionHeader
            title="Password Recovery"
            description="Enter new password"
          />
          <SectionItem withStripe>
            <CodeInput />
          </SectionItem>
          <SectionItem>
            <RegisterPasswordInput />
          </SectionItem>
          <SectionItem withStripe>
            <ChangePasswordSubmitButton />
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

const ChangePasswordSubmitButton = () => {
  const fetcher = useFetcherContext();

  const type = "change-password";
  const submitting =
    fetcher?.state === "submitting"
      ? fetcher.formData?.get("type") === type
      : false;

  return (
    <SubmitButton type={type} disabled={submitting}>
      {submitting ? "Changing password.." : "Change password"}
    </SubmitButton>
  );
};
