#!/usr/bin/env node
'use strict';

let [,, src] = process.argv;
let transform = eval(src) || (line => line);
let env = new Set();

require('readline')
    .createInterface({
        input: process.stdin
    })
    .on('line', line => {
        let columns = line.match(/('(\\'|[^'])*'|"(\\"|[^"])*"|\/(\\\/|[^\/])*\/|(\\ |[^ ])+|[\w-]+)/g) || [];
        let value = transform(line, columns, env);
        if (value != null) {
            console.log(value);
        }
    });
