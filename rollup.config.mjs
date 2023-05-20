import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import { uglify } from "rollup-plugin-uglify";

/** @type {import('rollup').RollupOptions} */
export default {
  input: "src/index.ts",
  output: {
    file: "dist/serve.cjs",
    format: "cjs",
    exports: "default",
    sourcemap: "hidden",
  },
  plugins: [
    typescript(),
    uglify(),
    json({
      exclude: ["node_modules/**"],
    }),
  ],
};
