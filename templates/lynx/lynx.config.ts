import { pluginLyngurium } from "@lyngurium/rsbuild";
import { pluginQRCode } from "@lynx-js/qrcode-rsbuild-plugin";
import { pluginReactLynx } from "@lynx-js/react-rsbuild-plugin";
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginTypeCheck } from "@rsbuild/plugin-type-check";

export default defineConfig({
    plugins: [
        pluginQRCode({
            schema: (url: string): string => `${url}?fullscreen=true`,
        }),
        pluginLyngurium(),
        pluginReactLynx(),
        pluginTypeCheck(),
    ],
    environments: {
        web: {},
        lynx: {},
    },
});
