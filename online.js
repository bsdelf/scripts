#!/usr/bin/env node
'use strict';

let [,, onLineSrc, onCloseSrc ] = process.argv;
let onLine = eval(onLineSrc) || (line => line);
let onClose = eval(onCloseSrc) || (() => undefined);
let env = new Set();

require('readline')
    .createInterface({
        input: process.stdin
    })
    .on('line', line => {
        let columns = line.match(/('(\\'|[^'])*'|"(\\"|[^"])*"|\/(\\\/|[^\/])*\/|(\\ |[^ ])+|[\w-]+)/g) || [];
        let value = onLine(line, columns, env);
        if (value != null) {
            console.log(value);
        }
    })
    .on('close', () => {
        let value = onClose(env);
        if (value != null) {
            console.log(value);
        }
    });
