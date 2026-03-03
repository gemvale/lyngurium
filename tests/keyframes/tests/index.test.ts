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

describe("keyframes test", (): void => {
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

        // const fadeIn = 'kxxx';
        expect(jsFileContent).toMatch(
            /\bconst\s+fadeIn\s*=\s*['"]k[a-zA-Z0-9_-]+['"]\s*;/,
        );

        // const spin = 'kxxx';
        expect(jsFileContent).toMatch(
            /\bconst\s+spin\s*=\s*['"]k[a-zA-Z0-9_-]+['"]\s*;/,
        );

        // css test

        const pathCssFile: string = Path.join(PATH_DIST, "index.css");

        const isCssFileExists: boolean = Fs.existsSync(pathCssFile);

        expect(isCssFileExists).toBe(true);

        const cssFileContent: string = await Fsp.readFile(pathCssFile, "utf-8");

        // @keyframes kxxx { ... }
        expect(cssFileContent).toMatch(/@keyframes\s+k[a-zA-Z0-9_-]+/);

        // from { opacity: 0 }
        expect(cssFileContent).toMatch(/opacity:\s*0/);

        // to { opacity: 1 }
        expect(cssFileContent).toMatch(/opacity:\s*1/);

        // from { transform: rotate(0deg) }
        expect(cssFileContent).toMatch(/transform:\s*rotate\(0(?:deg)?\)/);

        // to { transform: rotate(360deg) }
        expect(cssFileContent).toMatch(/transform:\s*rotate\(360(?:deg)?\)/);
    });
});
