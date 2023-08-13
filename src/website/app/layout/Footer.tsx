import { TextLink } from "./TextLink";

export const Footer = () => (
  <footer className="text-center text-sm text-slate-500">
    {new Date().getFullYear()} © <TextLink to="https://248.sh">248.sh</TextLink>
  </footer>
);
