import { defineConfig } from "vite";

export default defineConfig({
    server: {
        proxy: {
            "/reservoirs.json": "https://reservoirs.ijmacd.com/"
        }
    }
});