import * as Path from "node:path";
import * as Url from "node:url";

import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

const __filename: string = Url.fileURLToPath(import.meta.url);
const __dirname: string = Path.dirname(__filename);

export default defineConfig({
    plugins: [
        pluginReact(),
    ],
    server: {
        publicDir: [
            {
                name: Path.join(__dirname, "..", "lynx", "dist"),
            },
        ],
    },
});
