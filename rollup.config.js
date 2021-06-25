import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import pkg from "./package.json";

export default [
  {
    input: "src/index.js",
    output: {
      name: "index",
      file: pkg.browser,
      format: "umd",
    },
    plugins: [json()],
  },
  {
    input: "src/index.js",
    plugins: [json()],
    external: [
      "tweetnacl",
      "orbit-db-identity-provider",
      "near-api-js/lib/providers",
      "bs58",
      "orbit-db-access-controllers",
    ],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
  },
];
