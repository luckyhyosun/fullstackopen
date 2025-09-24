import js from "@eslint/js";
import globals from "globals";

export default [
  { files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: { ...globals.jest }
    } },
  { files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs"
    } },
];
