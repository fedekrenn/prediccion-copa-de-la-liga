import { defineConfig } from "vitest/config";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
  resolve: {
    alias: {
      "@components": resolve(__dirname, "./src/ui/components"),
      "@layouts": resolve(__dirname, "./src/ui/layouts"),
      "@contexts": resolve(__dirname, "./src/ui/state"),
      "@ui": resolve(__dirname, "./src/ui"),
      "@server": resolve(__dirname, "./src/server"),
      "@usecases": resolve(__dirname, "./src/server/use-cases"),
      "@prediction": resolve(__dirname, "./src/server/prediction"),
      "@auth": resolve(__dirname, "./src/server/auth"),
      "@repos": resolve(__dirname, "./src/server/repositories"),
      "@openapi": resolve(__dirname, "./src/server/openapi"),
      "@shared": resolve(__dirname, "./src/shared"),
      "@typos": resolve(__dirname, "./src/shared/types"),
      "@styles": resolve(__dirname, "./src/ui/styles"),
      "@assets": resolve(__dirname, "./src/assets"),
      "@config": resolve(__dirname, "./src/config"),
    },
  },
});
