import type { Logger } from "@ammolite/integration/log";
import type { PluginOptions } from "@ammolite/postcss";
import type { CreatePluginOptions } from "@ammolite/postcss/create";
import type { PluginCreator } from "postcss";

import { createLogger } from "@ammolite/integration/log";
import { cachePlugin } from "@ammolite/postcss/plugins/cache";

import { name as pkgName } from "../package.json";

const createPlugin = (
    createOptions?: CreatePluginOptions,
): PluginCreator<PluginOptions> => {
    const name: string = createOptions?.name ?? pkgName;

    const plugin: PluginCreator<PluginOptions> = (options?: PluginOptions) => {
        const cwd: string = options?.cwd ?? process.cwd();

        const emit: boolean =
            typeof options?.emit === "boolean" ? options.emit : true;

        const logger: Logger = createLogger({
            cwd,
            fileName: name,
        });

        return {
            postcssPlugin: name,
            plugins: [
                ...cachePlugin({
                    logger,
                    name,
                    emit,
                    cwd,
                }),
            ],
        };
    };

    plugin.postcss = true;

    return plugin;
};

type Plugin = ReturnType<typeof createPlugin>;

export type { CreatePluginOptions, Plugin };
export { createPlugin };
