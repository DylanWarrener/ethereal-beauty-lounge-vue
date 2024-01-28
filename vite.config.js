import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";

// Plugins
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		rollupOptions: {
			input: "./src/main.ts",
		},
	},
	plugins: [
		vue(), 
	],
	resolve: {
		alias: {
			"@base": fileURLToPath(new URL("./", import.meta.url)),
			"@src": fileURLToPath(new URL("./src", import.meta.url)),
			"@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
			"@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
			"@themes": fileURLToPath(new URL("./src/themes", import.meta.url)),
			"@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
			"@stores": fileURLToPath(new URL("./src/stores", import.meta.url)),
			"@components": fileURLToPath(new URL("./src/components", import.meta.url)),
			"@declarations": fileURLToPath(new URL("./src/declarations", import.meta.url)),
			"@constants": fileURLToPath(new URL("./src/constants", import.meta.url)),
			"@enums": fileURLToPath(new URL("./src/enums", import.meta.url)),
			"@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
			"@plugins": fileURLToPath(new URL("./src/plugins", import.meta.url)),
		},
	},
});
