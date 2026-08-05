import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";

export default tseslint.config(
  {
    ignores: [
      ".astro/**",
      "dist/**",
      "node_modules/**",
      ".qoder/**",
      ".agents/**",
      ".github/skills/**",
      "party/**",
      "public/**",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs["jsx-a11y-strict"],
  {
    rules: {
      // Custom rules and overrides
    },
  }
);
