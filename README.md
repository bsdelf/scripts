# scripts
Scripts, might be helpful.

## online.js

Strip leading "./" for the output of `find` command:

```sh
find . | online.js "({line}) => line.replace(/^.\//, '')"
```

Get the third column for the output of `wc` command:

```sh
wc README.md | online.js "({columns}) => columns[2]"
```

Count word frequency:

```sh
echo 'a\nb b\nc c c\nd d d d' | online.js "({columns, context}) => columns.forEach(word => context[word] = (context[word] >>> 0) + 1)" "context => context"
```
