import config from './base';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';

config.dest = 'dist/opendata-chart-utils.min.js';
config.sourceMapFile = 'dist/opendata-chart-utils.js';
config.sourceMap = 'dist/opendata-chart-utils.min.js.map';

// use a Regex to preserve copyright text
config.plugins.push(uglify(), filesize());

export default config;
