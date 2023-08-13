import { Session } from "@ory/kratos-client";
import { Section } from "~/layout/Section";
import { SectionHeader } from "~/layout/SectionHeader";
import { SectionItem } from "~/layout/SectionItem";

export const SessionDetails: FC<{ session: Session }> = ({ session }) => (
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
