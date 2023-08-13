import forms from "@tailwindcss/forms";
import { siApple, siFacebook, siGithub, siGoogle } from "simple-icons";
import type { Config } from "tailwindcss";
import { lerpColors } from "tailwind-lerp-colors";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      // google: `#${siGoogle.hex}`,
      // github: `#${siGithub.hex}`,
      // facebook: `#${siFacebook.hex}`,
      // apple: `#${siApple.hex}`,
      ...lerpColors(
        {
          google: { 900: `#${siGoogle.hex}` },
          github: { 900: `#${siGithub.hex}` },
          facebook: { 900: `#${siFacebook.hex}` },
          apple: { 900: `#${siApple.hex}` },
        },
        {
          includeBase: true,
          includeLegacy: false,
          lerpEnds: true,
          interval: 25,
          mode: "oklch",
          // mode: "rgb",
        }
      ),
    },
  },
  plugins: [forms],
} satisfies Config;
