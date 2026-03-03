set shell := ["bash", "-cu"]
set windows-shell := ["pwsh", "-Command"]

tsc := "pnpm exec tsgo"
biome := "pnpm exec biome"
tsdown := "pnpm exec tsdown"
vitest := "pnpm exec vitest"
typedoc := "pnpm exec typedoc"

lsl_cfg := "-config ../../../.ls-lint.yaml"

lynx := "packages/lynx"

rsbuild := "plugins/rsbuild"
postcss := "plugins/postcss"

tmpl_lynx := "templates/lynx"
tmpl_lynx_web := "templates/lynx-web"

tst_var := "tests/variables"
tst_kfs := "tests/keyframes"
tst_sty := "tests/style"

# Default action
_:
    just build
    just lint
    just fmt
    just test

# Install
i:
    pnpm install

# Install with frozen-lockfile
if:
    pnpm install --frozen-lockfile

# Lint with ls-lint
lslint:
    cd ./{{lynx}}/src && ls-lint {{lsl_cfg}}

    cd ./{{rsbuild}}/src && ls-lint {{lsl_cfg}}
    cd ./{{postcss}}/src && ls-lint {{lsl_cfg}}

    cd ./{{tmpl_lynx}}/src && ls-lint {{lsl_cfg}}
    cd ./{{tmpl_lynx_web}}/src && ls-lint {{lsl_cfg}}

# Lint with TypeScript Compiler
tsc:
    cd ./{{lynx}} && {{tsc}} --noEmit

    cd ./{{rsbuild}} && {{tsc}} --noEmit
    cd ./{{postcss}} && {{tsc}} --noEmit

# Lint code
lint:
    just lslint
    typos
    just tsc

# Lint code with Biome
lint-biome:
    {{biome}} lint .

# Format code
fmt:
    {{biome}} check --write .

# Build packages
build:
    cd ./{{lynx}} && {{tsdown}} -c tsdown.config.ts

    cd ./{{rsbuild}} && {{tsdown}} -c tsdown.config.ts
    cd ./{{postcss}} && {{tsdown}} -c tsdown.config.ts

# Run tests
test:
    cd ./{{tst_var}} && {{vitest}} run
    cd ./{{tst_kfs}} && {{vitest}} run
    cd ./{{tst_sty}} && {{vitest}} run

# Clean builds (Linux)
clean-linux:
    rm -rf ./templates/*/dist
    rm -rf ./tests/*/dist
    rm -rf ./plugins/*/dist
    rm -rf ./packages/*/dist

# Clean builds (macOS)
clean-macos:
    just clean-linux

# Clean builds (Windows)
clean-windows:
    Remove-Item -Recurse -Force ./templates/*/dist
    Remove-Item -Recurse -Force ./tests/*/dist
    Remove-Item -Recurse -Force ./plugins/*/dist
    Remove-Item -Recurse -Force ./packages/*/dist

# Clean
clean:
    just clean-{{os()}}

# Clean everything (Linux)
clean-all-linux:
    just clean

    rm -rf ./templates/*/node_modules
    rm -rf ./tests/*/node_modules
    rm -rf ./plugins/*/node_modules
    rm -rf ./packages/*/node_modules

    rm -rf ./node_modules

# Clean everything (macOS)
clean-all-macos:
    just clean-all-linux

# Clean everything (Windows)
clean-all-windows:
    just clean

    Remove-Item -Recurse -Force ./templates/*/node_modules
    Remove-Item -Recurse -Force ./tests/*/node_modules
    Remove-Item -Recurse -Force ./plugins/*/node_modules
    Remove-Item -Recurse -Force ./packages/*/node_modules

    Remove-Item -Recurse -Force ./node_modules

# Clean everything
clean-all:
    just clean-all-{{os()}}
