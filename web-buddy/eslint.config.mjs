import { createRequire } from "node:module";
import * as espree from "espree";
import nextConfig from "eslint-config-next";

const { version: reactVersion } = createRequire(import.meta.url)(
  "react/package.json"
);

const config = [
  ...nextConfig,
  {
    // eslint-config-next routes plain JS through Next's bundled Babel
    // parser, whose scope manager predates the `addGlobals` API that ESLint
    // 10 calls on every parse — so linting those files throws. TS/TSX are
    // unaffected (eslint-config-next already parses them with
    // typescript-eslint), and none of the files below need syntax espree
    // can't handle, so point them at ESLint's own parser instead.
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { parser: espree },
  },
  {
    // eslint-config-next ships `react.version: "detect"`, and that detection
    // path in eslint-plugin-react calls `context.getFilename()`, removed in
    // ESLint 10. Supplying the version skips detection entirely. It's read
    // from the installed react rather than hardcoded so a future React bump
    // can't leave the linter checking against a stale version.
    settings: { react: { version: reactVersion } },
  },
];

export default config;
