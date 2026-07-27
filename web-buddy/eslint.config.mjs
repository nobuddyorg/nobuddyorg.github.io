import * as espree from "espree";
import nextConfig from "eslint-config-next";

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
    // ESLint 10. Pinning the version skips detection entirely — which the
    // plugin recommends anyway, since it also avoids a package lookup on
    // every run. Keep this in step with the react dependency.
    settings: { react: { version: "19.2" } },
  },
];

export default config;
