import { parse } from "../mod.ts";

const output = parse(await Deno.readTextFile("./example/example.improperties"));
console.log(JSON.stringify(output, null, 2));
