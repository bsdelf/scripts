# scripts
Scripts, might be helpful.

## online.js

Strip leading "./" for the output of `find` command:

```
find . | online.js "line => line.replace(/^.\//, '')"
```

Get the third column for the output of `wc` command:

```
wc README.md | online.js "(line, cols) => cols[2]"
```

Count word frequency:

```
echo 'a\nb b\nc c c\nd d d d' | online.js "(_, cols, env) => cols.forEach(word => env[word] = (env[word] >>> 0) + 1)" "env => env"
```
