import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';
import sizes from 'rollup-plugin-sizes';

const pkg = require('../package.json');
const copyright = `/**
* ${pkg.name} - v${pkg.version} - ${new Date().toString()}
* Copyright (c) ${new Date().getFullYear()} Tom Wayson
* ${pkg.license}
*/`;

export default {
  entry: 'src/index.js',
  moduleName: 'opendataChartUtils',
  format: 'umd',
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/date-fns/**'
    }),
    buble(),
    sizes()
  ],
  banner: copyright
};
