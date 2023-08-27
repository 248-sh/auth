import { FC } from "react";
import { Section } from "~/layout/Section";
import { SectionHeader } from "~/layout/SectionHeader";
import { SectionItem } from "~/layout/SectionItem";
import { KratosSession } from "~/openapi/kratos";

export const SessionDetails: FC<{ session: KratosSession }> = ({ session }) => (
  <Section>
    <SectionHeader
      title="Session Details"
      description="This information will be displayed publicly so be careful what you share."
    />

    <SectionItem withStripe>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </SectionItem>
  </Section>
);
