#!/usr/bin/env node
const args = require('mri');

const Nautilus = require('../');
const { version } = require('../package');

const flags = args(process.argv.slice(2), {
  default: {
    host: '::',
    port: 3000,
  },
  alias: {
    p: 'port',
    H: 'host',
    v: 'version',
  },
  unknown(flag) {
    console.log(`Unknown option "${flag}"`);
    process.exit(1);
  },
});

if (flags.version) {
  console.log(version);
  process.exit();
}

let nautilus = new Nautilus({ appPath: process.cwd() });

nautilus.start(() => {
  process.on('SIGTERM', () => {
    console.log('\nShut down requested. Please wait...');
    nautilus.close(process.exit);
  });
});