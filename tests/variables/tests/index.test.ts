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

describe("variables test", (): void => {
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

        // bg: var(--xxx)
        expect(jsFileContent).toMatch(/\bbg:\s*'var\(--[a-zA-Z0-9_-]+\)'/);

        // font: var(--xxx)
        expect(jsFileContent).toMatch(/\bfont:\s*'var\(--[a-zA-Z0-9_-]+\)'/);

        // css test

        const pathCssFile: string = Path.join(PATH_DIST, "index.css");

        const isCssFileExists: boolean = Fs.existsSync(pathCssFile);

        expect(isCssFileExists).toBe(true);

        const cssFileContent: string = await Fsp.readFile(pathCssFile, "utf-8");

        // :root { --xxx: #000; }
        expect(cssFileContent).toMatch(
            /:root\s*\{[^}]*--([a-zA-Z0-9_-]+)\s*:\s*#000\s*;[^}]*\}/s,
        );

        // :root { --xxx: #fff; }
        expect(cssFileContent).toMatch(
            /:root\s*\{[^}]*--([a-zA-Z0-9_-]+)\s*:\s*#fff\s*;[^}]*\}/s,
        );

        // .page[data-theme="blue"] { --xxx: #007acc; }
        expect(cssFileContent).toMatch(
            /page\[data-theme="blue"\]\s*\{[^}]*--([a-zA-Z0-9_-]+)\s*:\s*#007acc\s*;[^}]*\}/s,
        );

        // .page[data-theme="blue"] { --xxx: #eee; }
        expect(cssFileContent).toMatch(
            /page\[data-theme="blue"\]\s*\{[^}]*--([a-zA-Z0-9_-]+)\s*:\s*#eee\s*;[^}]*\}/s,
        );
    });
});
