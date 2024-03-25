import { dirname, resolve } from 'path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'url'
import json from '@rollup/plugin-json'
import vue from '@vitejs/plugin-vue'
import alias from '@rollup/plugin-alias'
import VueMacros from 'unplugin-vue-macros/rollup'
import esbuild from 'rollup-plugin-esbuild'
import polyfillNode from 'rollup-plugin-polyfill-node'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'

const require = createRequire(import.meta.url)
const __dirname = fileURLToPath(new URL('.', import.meta.url))
const packagesDir = resolve(__dirname, 'packages')
const target = process.env.TARGET
const packageDir = resolve(packagesDir, target)
const resolvePackage = p => resolve(packageDir, p)

const pkg = require(resolvePackage('package.json'))
const pkgOptions = pkg.buildOptions || {}
const name = pkgOptions.name || dirname(packageDir)

const outputConfig = {
    "esm-bundler": {
        file: resolvePackage(`dist/${target}.esm-bundler.js`),
        format: 'es'
    },
    cjs: {
        file: resolvePackage(`dist/${target}.cjs.js`),
        format: 'cjs'
    },
    global: {
        file: resolvePackage(`dist/${target}.global.js`),
        format: 'iife'
    }
}

const packageFormats = pkgOptions.formats
const packageConfigs = packageFormats.map(format => createConfig(format, outputConfig[format]))

export default packageConfigs

function createConfig(format, output) {
    const isNodeBuild = format === 'cjs'
    const isGlobalBuild = format === 'global'
    const isBundlerESMBuild = /esm-bundler/.test(format)

    function resolveDefine() {
        return {
            __VERSION__: `"${pkg.version}"`,
            __GLOBAL__: String(isGlobalBuild),
            __ESM_BUNDLER__: String(isBundlerESMBuild)
        }
    }

    output.exports = 'named'

    if (isNodeBuild) {
        output.esModule = true
    }
    output.externalLiveBindings = false
    if (isGlobalBuild) {
        output.name = name
        output.globals = {
            "vue": "vue"
        }
    }

    return {
        input: resolvePackage('src/index.ts'),
        external: [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.peerDependencies || {})
        ],
        plugins: [
            VueMacros({
                setupComponent: true,
                setupSFC: true,
                plugins: {
                    vue: vue({
                        isProduction: true
                    })
                }
            }),
            alias({
                entries: {
                    '@double_ming/screen-fit': resolve(__dirname, 'packages/screen-fit/src/index.ts'),
                }
            }),
            json({ namedExports: false }),
            esbuild({
                tsconfig: resolve(__dirname, 'tsconfig.json'),
                sourceMap: false,
                minify: false,
                target: isNodeBuild ? 'es2019' : 'es2015',
                define: resolveDefine(),
                loaders: {
                    ".vue": 'ts'
                }
            }),
            commonjs({
                sourceMap: false
            }),
            ...(format === 'cjs' ? [] : [polyfillNode()]),
            nodeResolve(),
        ],
        treeshake: true,
        output
    }
}