import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  { ignores: ["dist", "_v1/**"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // Prettier integration
      "prettier/prettier": [
        "error",
        {
          trailingComma: "es5",
          tabWidth: 2,
          semi: true,
          singleQuote: false,
          quoteProps: "as-needed",
          jsxSingleQuote: false,
          arrowParens: "avoid",
          bracketSpacing: true,
          bracketSameLine: false,
          useTabs: false,
          proseWrap: "preserve",
          htmlWhitespaceSensitivity: "ignore",
          endOfLine: "auto",
        },
      ],
      // Additional rules that work well with Prettier
      "no-unused-vars": "warn",
      "no-console": "warn",
      "prefer-const": "error",
      "no-var": "error",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  }
);
