import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import eslintPluginPrettier from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      import: importPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "no-duplicate-imports": "error",
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "no-multiple-empty-lines": "error",
      "no-undef": "error",
      indent: "off",
      "no-trailing-spaces": "error",
      "import/newline-after-import": ["error", { count: 1 }],
      "react-hooks/rules-of-hooks": "error",
      "arrow-parens": ["error", "always"],
      "no-multi-spaces": "error",
      "import/no-unresolved": "off",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
          ],
          pathGroups: [
            { pattern: "react", group: "builtin", position: "after" },
            { pattern: "react-dom", group: "builtin", position: "after" },
          ],
          pathGroupsExcludedImportTypes: ["react", "react-dom"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],
    },
  },
  eslintConfigPrettier,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "dist/**",
    "public/**",
  ]),
]);

export default eslintConfig;
