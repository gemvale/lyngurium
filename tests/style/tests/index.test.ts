import type { BuildResult, RslibInstance } from "@rslib/core";

import * as Fs from "node:fs";
import * as Fsp from "node:fs/promises";
import * as Path from "node:path";

import pluginLynguriumPostCSS from "@lyngurium/postcss";
import { pluginLyngurium } from "@lyngurium/rsbuild";
import { createRslib } from "@rslib/core";
import { afterEach, describe, expect, it } from "vitest";

const CWD: string = process.cwd();

const PATH_DIST: string = Path.join(CWD, "dist");

afterEach(async (): Promise<void> => {
    await Fsp.rm(PATH_DIST, {
        recursive: true,
        force: true,
    });
});

describe("style test", (): void => {
    it("should builds via Rslib + PostCSS", async (): Promise<void> => {
        const rslib: RslibInstance = await createRslib({
            cwd: CWD,
            config: {
                lib: [
                    {
                        format: "esm",
                        bundle: false,
                        output: {
                            target: "web",
                        },
                    },
                ],
                plugins: [
                    pluginLyngurium(),
                ],
                tools: {
                    rspack: {
                        cache: false,
                    },
                    postcss: (options): void => {
                        const opts = options.postcssOptions;
                        if (typeof opts === "function") return void 0;

                        const lynguriumPostCSS = pluginLynguriumPostCSS();

                        opts?.plugins?.push(lynguriumPostCSS);
                    },
                },
                logLevel: "warn",
            },
        });

        const buildResult: BuildResult = await rslib.build();

        await buildResult.close();

        // js test

        const pathJsFile: string = Path.join(PATH_DIST, "index.js");

        const isJsFileExists: boolean = Fs.existsSync(pathJsFile);

        expect(isJsFileExists).toBe(true);

        const jsFileContent: string = await Fsp.readFile(pathJsFile, "utf-8");

        // const container = 'xxx xxx xxx';
        expect(jsFileContent).toMatch(
            /\bconst\s+container\s*=\s*['"][a-zA-Z0-9_-]+(?:\s+[a-zA-Z0-9_-]+)*['"]\s*;/,
        );

        // css test

        const pathCssFile: string = Path.join(PATH_DIST, "index.css");

        const isCssFileExists: boolean = Fs.existsSync(pathCssFile);

        expect(isCssFileExists).toBe(true);

        const cssFileContent: string = await Fsp.readFile(pathCssFile, "utf-8");

        // background-color: #ff0 (inside @supports)
        expect(cssFileContent).toMatch(
            /@supports\s*\(hover:\s*hover\)[\s\S]*background-color:\s*#ff0/,
        );

        // background-color: red;
        expect(cssFileContent).toMatch(/background-color:\s*red/);

        // background-color: #0ff (inside media query)
        expect(cssFileContent).toMatch(
            /@media\s+screen\s+and\s+\(width\s*<=\s*768px\)[\s\S]*background-color:\s*#0ff/,
        );

        // &:active { background-color: red; }
        expect(cssFileContent).toMatch(
            /&:active[\s\S]*background-color:\s*red/,
        );

        // & #child { color: #fff; }
        expect(cssFileContent).toMatch(/&\s+#child[\s\S]*color:\s*#fff/);

        // & .child { color: #fff; }
        expect(cssFileContent).toMatch(/&\s+\.child[\s\S]*color:\s*#fff/);
    });
});
