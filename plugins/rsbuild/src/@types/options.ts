import type {
    InputOptions,
    PluginOptions as RawPluginOptions,
} from "@ammolite/rsbuild";
import type { Format, Omit } from "ts-vista";

type PluginOptions = Format<Omit<RawPluginOptions, "emit" | "output">>;

export type { InputOptions, PluginOptions };
