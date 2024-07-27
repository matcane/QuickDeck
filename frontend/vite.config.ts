import { defineConfig } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), viteTsconfigPaths()],
    resolve: {
        alias: {
            "@/*": "./src/*",
            "@core/*": "./src/modules/core/*",
        },
    },
    optimizeDeps: {
        include: [
            "react",
            "react-dom",
            "axios",
            "react-router-dom",
            "react-router",
            "@remix-run/router",
            "zustand",
            "flowbite-react",
        ],
    },
    build: {
        target: "esnext",
        chunkSizeWarningLimit: 300,
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ["react"],
                    react_dom: ["react-dom"],
                    react_router: ["react-router", "@remix-run/router"],
                    zustand: ["zustand"],
                    axios: ["axios"],
                    flowbite_react: ["flowbite-react"],
                },
            },
        },
        minify: "terser",
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
});
