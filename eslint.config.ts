import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";

export default [
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], 
    languageOptions: { 
      globals: { ...globals.node, ...globals.es2021 },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    } 
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  { files: ["**/*.json"], plugins: { json }, language: "json/json" },
  { files: ["**/*.jsonc"], plugins: { json }, language: "json/jsonc" },
  { files: ["**/*.json5"], plugins: { json }, language: "json/json5" },
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm" },
  { files: ["**/*.css"], plugins: { css }, language: "css/css" },
];
