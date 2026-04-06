import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.glb"], // dovrebbe modificarlo anche a voi, ma nel caso ricordarsi questa modifica per far riconoscere il file .glb
});
