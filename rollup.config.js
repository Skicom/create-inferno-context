import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import noderesolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const config = {
  input: 'src/index.js',
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    noderesolve({ browser: true, extensions: ['.js', '.jsx', '.json'] }),
    commonjs({
      include: ['node_modules/**']
    }),
    babel({
      babelrc: true
    }),
    terser()
  ]
};

export default [
  {
    output: [
      {
        file: pkg.main,
        format: 'cjs'
      }
    ],
    ...config
  },
  {
    output: [
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    ...config
  }
];
