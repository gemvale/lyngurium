import type { InputOptions, PluginOptions } from "#/@types/options";
import type { Plugin } from "#/create";

import { createPlugin } from "#/create";

const plugin: Plugin = createPlugin();

export type { InputOptions, PluginOptions };
export { plugin as pluginLyngurium };
