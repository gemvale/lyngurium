import type { InputOptions, PluginOptions } from "@ammolite/postcss";
import type { Plugin, Processor } from "postcss";

import { createPlugin } from "@ammolite/postcss/create";

import { name } from "../package.json";

const plugin = (options?: PluginOptions): Plugin | Processor => {
    return createPlugin({
        name,
    })(options);
};

export default plugin;
export type { InputOptions, PluginOptions };
