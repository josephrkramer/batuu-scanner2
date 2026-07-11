import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Module = require("module");
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === "typescript") {
    return originalLoad("typescript-classic", parent, isMain);
  }
  return originalLoad(request, parent, isMain);
};

const eslint = await import("@eslint/js");
const tseslint = await import("typescript-eslint");
const eslintConfigPrettier = await import("eslint-config-prettier");

export default tseslint.default.config(
  {
    ignores: [
      "**/node_modules",
      "**/dist",
      "**/coolant-stabilizer",
      "**/react-godot",
      "**/venv",
    ],
  },
  eslint.default.configs.recommended,
  ...tseslint.default.configs.recommended,
  eslintConfigPrettier.default,
);
