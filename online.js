#!/usr/bin/env node
'use strict';

const notEmpty = (value) => value !== null && value !== undefined;
const [, , onLineSrc, onCloseSrc] = process.argv;
const onLine = eval(onLineSrc) || (({ line }) => line);
const onClose = eval(onCloseSrc) || (() => undefined);
const context = new Set();

require('readline')
  .createInterface({
    input: process.stdin,
  })
  .on('line', (line) => {
    const columns =
      line.match(
        /('(\\'|[^'])*'|"(\\"|[^"])*"|\/(\\\/|[^\/])*\/|(\\ |[^ ])+|[\w-]+)/g
      ) || [];
    const value = onLine({ line, columns, context });
    if (notEmpty(value)) {
      console.log(value);
    }
  })
  .on('close', () => {
    const value = onClose({ context });
    if (notEmpty(value)) {
      console.log(value);
    }
  });
