import path from "node:path";
import process from "node:process";
import { exec, execSync } from "node:child_process";
import { type UserConfigExport, defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const config: UserConfigExport = {
    plugins: [
      {
        name: "build-start",
        buildStart() {
          if (mode === "dev") this.addWatchFile(path.join(process.cwd(), `settings.yaml`));
          else execSync("npm run build:icons");
          execSync("npm run build:settings");
        },
      },
      {
        name: "close-bundle",
        closeBundle() {
          exec("npm run sync");
        },
      },
    ],
    publicDir: "./static",
    build: {
      outDir: "public",
      minify: mode === "production",
      rollupOptions: {
        input: {
          main: "./src/scss/theme.scss",
        },
        output: {
          assetFileNames: "theme.[ext]",
        },
      },
    },
  };

  if (mode === "dev") config.build!.watch = { exclude: ["./src/scss/icons/**"] };

  return config;
});
