#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

//============
//=== args ===
//============

let args = process.argv.slice(2);

let exts = [];
let dirs = [];

args.forEach(arg => {
    try {
        if (fs.statSync(arg).isDirectory()) {
            dirs.push(arg);
        }
    } catch (error) {
        exts.push(arg[0] === '.' ? arg : ('.' + arg));
    }
});

if (dirs.length === 0) {
    dirs.push('.');
}

//=============
//=== match ===
//=============

let files = [];

dirs.forEach(dir => {
    files = files.concat(readdirRecursiveSync(dir, {
        file: name => {
            let ext = path.extname(name);
            return exts.indexOf(ext) !== -1;
        }
    }));
});

files.sort();

console.log(files.join('\n'));

//===============
//=== helpers ===
//===============

function readdirRecursiveSync(root, filter) {
    // fix filter
    if (typeof filter !== 'object') {
        filter = Object.create(null);
    }
    ['any', 'directory', 'file'].forEach(prop => {
        if (typeof filter[prop] !== 'function') {
            filter[prop] = () => true;
        }
    });

    // walk dir
    const files = [ ];
    const paths = [ root ];
    while (paths.length > 0) {
        const item = paths.pop();
        if (!filter.any(item)) {
            continue;
        }
        const stat = fs.statSync(item);
        if (stat.isFile()) {
            if (!filter.file(item)) {
                continue;
            }
            files.push(item);
        } else if (stat.isDirectory()) {
            if (!filter.directory(item)) {
                continue;
            }
            const children = fs.readdirSync(item);
            paths.push(...children.map(child => path.join(item, child)))
        }
    }
    return files;
}

function callMethod(object, property, ...args) {
    if (object && object[property]) {
        let method = object[property];
        if (typeof method === 'function') {
            return method.apply(null, args);
        }
    }
}
