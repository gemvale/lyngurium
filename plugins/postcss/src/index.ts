import type { PluginOptions } from "@ammolite/postcss";

import type { Plugin } from "#/create";

import { createPlugin } from "#/create";

const plugin: Plugin = createPlugin();

export default plugin;
export type { PluginOptions };
