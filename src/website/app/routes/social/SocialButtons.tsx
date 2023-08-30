import {
  SiApple,
  SiFacebook,
  SiGithub,
  SiGoogle,
} from "@icons-pack/react-simple-icons";
import { FC, PropsWithChildren } from "react";
import { join } from "~/utils";

export const SocialButtons = () => (
  <div className="flex flex-row items-center justify-between gap-4">
    <SocialButton
      type="google"
      className="text-slate-500 hover:text-google-900"
    >
      <SiGoogle className="w-8 h-8" />
    </SocialButton>
    <SocialButton
      type="github"
      disabled
      className="text-slate-500 hover:text-github-900"
    >
      <SiGithub className="w-8 h-8" />
    </SocialButton>
    <SocialButton
      type="facebook"
      disabled
      className="text-slate-500 hover:text-facebook-900"
    >
      <SiFacebook className="w-8 h-8" />
    </SocialButton>
    <SocialButton
      type="apple"
      disabled
      className="text-slate-500 hover:text-apple-900"
    >
      <SiApple className="w-8 h-8" />
    </SocialButton>
  </div>
);

const SocialButton: FC<
  PropsWithChildren & { type: string; disabled?: boolean; className?: string }
> = ({ type, disabled = false, className, children }) => (
  <button
    type="submit"
    name="type"
    value={type}
    disabled={disabled}
    className={join(
      "shadow shadow-slate-200 border border-slate-200 rounded-sm p-6 bg-white hover:bg-slate-100 transition",
      className,
      disabled ? "pointer-events-none opacity-50" : ""
    )}
  >
    {children}
  </button>
);
