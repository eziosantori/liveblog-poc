import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import prettierConfig from "prettier-config-standard";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:prettier/recommended" // Integrate Prettier
  ),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      "prettier/prettier": ["error", prettierConfig], // Enforce Prettier rules
      "no-unused-vars": "warn", // Warn on unused variables
      "react/jsx-key": "error", // Ensure keys in lists
    },
  },
];

export default eslintConfig;
