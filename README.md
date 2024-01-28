# tree-sitter-raku

This is an attempt at making a tree-sitter module for [Raku](https://docs.raku.org/introduction)

## Getting started developing

To get started developing run: 

```bash 
npm i
```

### Generating the bindings

The bread and butter of this project is

```bash
npx tree-sitter generate
```

You'll have to run the above command every single time you make changes to the grammar.

## Any and all contributions are welcome!

You can find the grammar's DSL [here](https://tree-sitter.github.io/tree-sitter/creating-parsers#the-grammar-dsl).
