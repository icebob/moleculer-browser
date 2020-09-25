import path from 'path'

import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import alias from 'rollup-plugin-alias'
import inject from 'rollup-plugin-inject'
import analyze from 'rollup-plugin-analyzer'
import replace from '@rollup/plugin-replace'
import visualizer from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser'
// import builtins from 'rollup-plugin-node-builtins'

import { externalResolve } from './rollup-config/module-resolver'
import { aliasModules, builtInModules } from './rollup-config/moleculer'
import { normalizePath } from './src/utils'

import pkg from './package.json'

const isProduction = process.env.NODE_ENV === 'production'

const moleculerSrcPath = 'node_modules/moleculer/src/**'

const config = async () => {
  const external = await externalResolve(builtInModules)

  return {
    input: 'src/index.js',
    output: {
      name: 'Moleculer',
      file: pkg.main,
      format: 'umd',
      sourcemap: true
    },
    plugins: [
      // builtins(),

      replace({
        include: moleculerSrcPath,
        'os.cpus': 'require("cpus")',
        'os.loadavg': `require("${normalizePath(path.resolve('src/cpu-usage.js'))}").loadavg`,
        'os.totalmem': '(() => performance ? performance.memory.totalJSHeapSize : 0)',
        'os.freemem': '(() => performance ? performance.memory.totalJSHeapSize - performance.memory.usedJSHeapSize : 0)'
      }),
      replace({
        include: moleculerSrcPath,
        'nodejs': 'type: "browser"',
        delimiters: ['type: "', '"']
      }),
      replace({
        include: moleculerSrcPath,
        'v8': 'null',
        'gc-stats': 'null',
        'event-loop-stats': 'null',
        delimiters: ['require("', '")']
      }),
      // For some reason injecting `process` breaks the sourcemap so we have to replace the `process` keyword.
      replace({
        include: moleculerSrcPath,
        exclude: 'node_modules/moleculer/src/metrics/constants.js',
        'process': `require('${normalizePath(path.resolve('src/shims/process.js'))}').`,
        delimiters: ['', '.']
      }),
      alias(aliasModules),
      json(),
      resolve({
        preferBuiltins: true,
        only: ['moleculer']
      }),
      commonjs(),
      inject({
        include: moleculerSrcPath,
        modules: {
          setTimeout: normalizePath(path.resolve('src/shims/timeout.js')),
          setInterval: normalizePath(path.resolve('src/shims/interval.js'))
        }
      }),
      isProduction && terser(),
      !isProduction && visualizer({ template: 'treemap' }),
      analyze({ hideDeps: true, limit: 0 })
    ],
    external
  }
}

export default config()
