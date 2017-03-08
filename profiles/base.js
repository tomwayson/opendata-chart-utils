import buble from 'rollup-plugin-buble';
const pkg = require('../package.json');
const copyright = `/**
* ${pkg.name} - v${pkg.version} - ${new Date().toString()}
* Copyright (c) ${new Date().getFullYear()} Tom Wayson
* ${pkg.license}
*/`;

export default {
  entry: 'src/esri-utils.js',
  moduleName: 'esriUtils',
  format: 'umd',
  plugins: [buble()],
  banner: copyright
};
