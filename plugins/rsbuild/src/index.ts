import type { Runtime } from "@ammolite/integration/runtime";
import type { RsbuildPlugin, RsbuildPluginAPI } from "@rsbuild/core";

import type { InputOptions, PluginOptions } from "#/@types/options";

import { createRuntime } from "@ammolite/integration/runtime";
import { createPlugin } from "@ammolite/rsbuild/create";

import { name } from "../package.json";

const plugin = (options?: PluginOptions): RsbuildPlugin => {
    const runtime: Runtime = createRuntime({
        packageName: "lyngurium",
        cwd: options?.cwd,
        include: options?.input?.include,
        exclude: options?.input?.exclude,
    });

    const basePlugin: RsbuildPlugin = createPlugin({
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

export type { InputOptions, PluginOptions };
export { plugin as pluginLyngurium };
