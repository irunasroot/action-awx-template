// See: https://rollupjs.org/introduction/

import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import license from 'rollup-plugin-license'
import path from 'path'

const config = {
  input: 'src/index.ts',
  output: {
    esModule: true,
    file: 'dist/index.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    typescript(),
    json(),
    nodeResolve({ preferBuiltins: true }),
    commonjs(),
    license({
      sourcemap: true,

      banner: {
        content: {
          file: path.join(__dirname, 'LICENSE'),
          encoding: 'utf-8'
        }
      },

      thirdParty: {
        output: path.join(__dirname, 'dist', 'license.txt'),
        includePrivate: true,
        includeSelf: true,
        multipleVersions: true
      }
    })
  ]
}

export default config
