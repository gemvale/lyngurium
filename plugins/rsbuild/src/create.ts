import type { Runtime } from "@ammolite/integration/runtime";
import type { CreatePluginOptions as CreateRsbuildPluginOptions } from "@ammolite/rsbuild/create";
import type { RsbuildPlugin, RsbuildPluginAPI } from "@rsbuild/core";

import type { PluginOptions } from "#/@types/options";

import { createRuntime } from "@ammolite/integration/runtime";
import { createPlugin as createRsbuildPlugin } from "@ammolite/rsbuild/create";
import { version } from "@rspack/core";

import { name as pkgName } from "../package.json";

type CreatePluginOptions = CreateRsbuildPluginOptions;

const createPlugin = (createOptions?: CreatePluginOptions) => {
    const name: string = createOptions?.name ?? pkgName;

    return (options?: PluginOptions): RsbuildPlugin => {
        const runtime: Runtime =
            createOptions?.runtime ??
            createRuntime({
                bundler: {
                    name: "rspack",
                    version,
                },
                packageName: "lyngurium",
                cwd: options?.cwd,
                include: options?.input?.include,
                exclude: options?.input?.exclude,
                tsconfigPath: options?.input?.tsconfigPath,
            });

        const basePlugin: RsbuildPlugin = createRsbuildPlugin({
            name,
            runtime,
        })({
            ...options,
            emit: false,
        });

        return {
            name,
            async setup(api: RsbuildPluginAPI): Promise<void> {
                await basePlugin.setup(api);
            },
        };
    };
};

type Plugin = ReturnType<typeof createPlugin>;

export type { CreatePluginOptions, Plugin };
export { createPlugin };
