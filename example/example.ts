import { parse, stringify } from "../mod.ts";

// Parsing
const output = parse(await Deno.readTextFile("./example/example.improperties"));
console.log(JSON.stringify(output, null, 2));

// Stringifying. Some style options are available here.
const stringified = stringify(output, { space: true });
console.log(stringified);
