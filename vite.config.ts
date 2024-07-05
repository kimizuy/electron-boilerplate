import electron from "vite-plugin-electron/simple";

export default {
  plugins: [
    electron({
      main: {
        entry: "electron/main.ts",
      },
      preload: {
        input: "electron/preload.ts",
      },
    }),
  ],
};
