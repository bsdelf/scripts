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
        let ret = transform(line, columns, env);
        if (ret != null) {
            console.log(ret);
        }
    });
