# Improperties

A Deno implementation of the
[Improperties](https://github.com/FoundationGames/Improperties-Specification)
file format. It is capable of both serializing and deserializing Improperties.

## Example

This example can also be found in `example/example.ts`, along with the
Improperties file it reads.

```ts
import { parse, stringify } from "https://deno.land/x/improperties/mod.ts";

// Parsing
const output = parse(await Deno.readTextFile("./example/example.improperties"));
console.log(JSON.stringify(output, null, 2));

// Stringifying. Some style options are available here.
const stringified = stringify(output, { space: true });
console.log(stringified);
```
