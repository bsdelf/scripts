#!/usr/bin/env node
'use strict';

let [,, src] = process.argv;
let transform = eval(src) || (line => line);
let env = Object.create(null);

require('readline')
    .createInterface({
        input: process.stdin
    })
    .on('line', line => {
        let ret = transform(line, env);
        if (ret != null) {
            console.log(ret);
        }
    });
