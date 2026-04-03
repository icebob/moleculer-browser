import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import inject from '@rollup/plugin-inject'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import { visualizer } from 'rollup-plugin-visualizer'

import { externalResolve } from './rollup-config/module-resolver.mjs'
import { aliasModules, builtInModules } from './rollup-config/moleculer.mjs'
import { normalizePath } from './src/utils.js'

const require = createRequire(import.meta.url)
const pkg = require('./package.json')

const isProduction = process.env.NODE_ENV === 'production'

const moleculerSrcPath = [
  'node_modules/moleculer/src/**',
  normalizePath(path.resolve('node_modules/moleculer/src')) + '/**'
]

const config = async () => {
  const external = await externalResolve(builtInModules)

  return {
    input: 'src/index.js',
    output: {
      name: 'Moleculer',
      file: pkg.main,
      format: 'umd',
      sourcemap: true,
      interop: 'auto',
      externalLiveBindings: false
    },
    plugins: [
      // Note: os.* replacements handled by the os shim module (src/shims/os.js) via alias
      replace({
        include: moleculerSrcPath,
        preventAssignment: true,
        nodejs: 'type: "browser"',
        delimiters: ['type: "', '"']
      }),
      replace({
        include: moleculerSrcPath,
        preventAssignment: true,
        v8: 'null',
        'gc-stats': 'null',
        'event-loop-stats': 'null',
        kleur: `require("${normalizePath(path.resolve('src/kleur.js'))}")`,
        delimiters: ['require("', '")']
      }),
      alias({ entries: aliasModules }),
      json(),
      resolve({
        preferBuiltins: false
      }),
      commonjs({
        requireReturnsDefault: 'auto'
      }),
      inject({
        include: moleculerSrcPath,
        modules: {
          process: normalizePath(path.resolve('src/shims/process.js')),
          setTimeout: normalizePath(path.resolve('src/shims/timeout.js')),
          setInterval: normalizePath(path.resolve('src/shims/interval.js'))
        }
      }),
      isProduction && terser(),
      !isProduction && visualizer({ template: 'treemap' })
    ],
    external
  }
}

export default config()
