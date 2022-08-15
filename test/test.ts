/**
 * Standard Improperties unit tests.
 */

// deno-lint-ignore-file no-explicit-any
import { parse, stringify } from "../mod.ts";
import { assert } from "https://deno.land/std@v0.150.0/testing/asserts.ts";

function test(result: { [key: string]: any }) {
    Deno.test({
        name: "comment_hashtag",
        fn: () => {
            assert(
                result["# comment1"] == undefined,
                "Key `# comment1` should be undefined",
            );
        },
    });

    Deno.test({
        name: "comment_exclamation",
        fn: () => {
            assert(
                result["! comment2"] == undefined,
                "Key `! comment2` should be undefined",
            );
        },
    });

    Deno.test({
        name: "key_value",
        fn: () => {
            assert(result["key"] == "value", "Key `key` should be `value`");
        },
    });

    Deno.test({
        name: "eq1",
        fn: () => {
            assert(
                result["eq1"] == "eqvalue1",
                "Key `eq1` should be `eqvalue1`",
            );
        },
    });

    Deno.test({
        name: "eq2",
        fn: () => {
            assert(
                result["eq2"] == "eqvalue2",
                "Key `eq2` should be `eqvalue2`",
            );
        },
    });

    Deno.test({
        name: "eq3",
        fn: () => {
            assert(
                result["eq3"] == "eqvalue3",
                "Key `eq3` should be `eqvalue3`",
            );
        },
    });

    Deno.test({
        name: "eq4",
        fn: () => {
            assert(
                result["eq4"] == "eqvalue4",
                "Key `eq4` should be `eqvalue4`",
            );
        },
    });

    Deno.test({
        name: "col1",
        fn: () => {
            assert(
                result["col1"] == "colvalue1",
                "Key `col1` should be `colvalue1`",
            );
        },
    });

    Deno.test({
        name: "col2",
        fn: () => {
            assert(
                result["col2"] == "colvalue2",
                "Key `col2` should be `colvalue2`",
            );
        },
    });

    Deno.test({
        name: "col3",
        fn: () => {
            assert(
                result["col3"] == "colvalue3",
                "Key `col3` should be `colvalue3`",
            );
        },
    });

    Deno.test({
        name: "col4",
        fn: () => {
            assert(
                result["col4"] == "colvalue4",
                "Key `col4` should be `colvalue4`",
            );
        },
    });

    Deno.test({
        name: "ml",
        fn: () => {
            assert(
                result["mlalpha"] == "abcd",
                "Key `mlalpha` should be `abcd`",
            );
        },
    });

    Deno.test({
        name: "wsp1",
        fn: () => {
            assert(
                result["wsp1 "] == "wspvalue1",
                "Key `wsp1 ` should be `wspvalue1`",
            );
        },
    });

    Deno.test({
        name: "wsp2",
        fn: () => {
            assert(
                result["wsp2 "] == "wspvalue2",
                "Key `wsp2 ` should be `wspvalue2`",
            );
        },
    });

    Deno.test({
        name: "wsp3",
        fn: () => {
            assert(
                result["wsp 3"] == "wspvalue3",
                "Key `wsp 3` should be `wspvalue3`",
            );
        },
    });

    Deno.test({
        name: "wsp4",
        fn: () => {
            assert(
                result["wsp4"] == "wsp value 4",
                "Key `wsp4` should be `wsp value 4`",
            );
        },
    });

    Deno.test({
        name: "bseq",
        fn: () => {
            assert(
                result["=bseq1="] == "bseqvalue1",
                "Key `=bseq1=` should be `bseqvalue1`",
            );
        },
    });

    Deno.test({
        name: "bseq2",
        fn: () => {
            assert(
                result["=bseq2="] == "bseqvalue2",
                "Key `=bseq2=` should be `bseqvalue2`",
            );
        },
    });

    Deno.test({
        name: "bscol1",
        fn: () => {
            assert(
                result[":bscol1:"] == "bscolvalue1",
                "Key `:bscol1:` should be `bscolvalue1`",
            );
        },
    });

    Deno.test({
        name: "bscol2",
        fn: () => {
            assert(
                result[":bscol2:"] == "bscolvalue2",
                "Key `:bscol2:` should be `bscolvalue2`",
            );
        },
    });

    Deno.test({
        name: "hyp1",
        fn: () => {
            assert(
                result["-hyp1"] == "hypvalue1",
                "Key `-hyp1` should be `hypvalue1`",
            );
        },
    });

    Deno.test({
        name: "hyp2",
        fn: () => {
            assert(
                result["--hyp2"] == "hypvalue2",
                "Key `--hyp2` should be `hypvalue2`",
            );
        },
    });

    Deno.test({
        name: "obj_key",
        fn: () => {
            assert(
                result["->"] == "arrvalue",
                "Key `->` should be `arrvalue`",
            );
        },
    });

    Deno.test({
        name: "obj_1",
        fn: () => {
            assert(
                result["object1"].key == "value",
                "Key `object1.key` should be `value`",
            );
        },
    });

    Deno.test({
        name: "obj_2",
        fn: () => {
            assert(
                result["object2"].key == "value",
                "Key `object2.key` should be `value`",
            );
        },
    });

    Deno.test({
        name: "obj_empty",
        fn: () => {
            assert(
                Object.keys(result["objempty"]).length == 0 ||
                    result["objectempty"] == [],
                "Key `objectempty` should be an empty object or array",
            );
        },
    });

    Deno.test({
        name: "nestobj",
        fn: () => {
            assert(
                result["nestobj"].nested.key == "value",
                "Key `nestobj.nested.key` should be `value`",
            );
        },
    });

    Deno.test({
        name: "nestobj2",
        fn: () => {
            assert(
                result["nestobj"].nested2[0] == "elem0",
                "Key `nestobj2.nested2[0]` should be `elem0`",
            );

            assert(
                result["nestobj"].nested2[1] == "elem1",
                "Key `nestobj2.nested2[1]` should be `elem1`",
            );

            assert(
                result["nestobj"].nested2[2] == "elem2",
                "Key `nestobj2.nested2[2]` should be `elem2`",
            );
        },
    });

    Deno.test({
        name: "list1",
        fn: () => {
            assert(
                result["list1"][0] == "a",
                "Key `list1[0]` should be `a`",
            );

            assert(
                result["list1"][1] == "b",
                "Key `list1[1]` should be `b`",
            );
        },
    });

    Deno.test({
        name: "list2",
        fn: () => {
            assert(
                result["list2"][0] == "elem0",
                "Key `list2[0]` should be `elem0`",
            );

            assert(
                result["list2"][1] == "elem1",
                "Key `list2[1]` should be `elem1`",
            );

            assert(
                result["list2"][2] == "-_-",
                "Key `list2[2]` should be `-_-`",
            );

            assert(
                result["list2"][3] == "-O-",
                "Key `list2[3]` should be `-O-`",
            );

            assert(
                Object.keys(result["list2"][4]).length == 0 ||
                    result["list2"][4] == [],
                "Key `list2[4]` should be an empty object or array",
            );

            assert(
                Object.keys(result["list2"][5]).length == 0 ||
                    result["list2"][5] == [],
                "Key `list2[5]` should be an empty object or array",
            );

            assert(
                result["list2"][6] == "->",
                "Key `list2[6]` should be `->`",
            );
        },
    });

    Deno.test({
        name: "nestlist",
        fn: () => {
            assert(
                result["nestlist"][0].key == "value",
                "Key `nestlist[0].key` should be `value`",
            );

            assert(
                result["nestlist"][1].key == "value2",
                "Key `nestlist[1].key` should be `value2`",
            );

            assert(
                result["nestlist"][2][0] == "elem0",
                "Key `nestlist[2][0]` should be `elem0`",
            );

            assert(
                result["nestlist"][2][1] == "elem1",
                "Key `nestlist[2][1]` should be `elem1`",
            );

            assert(
                result["nestlist"][2][2] == "elem2",
                "Key `nestlist[2][2]` should be `elem2`",
            );
        },
    });

    Deno.test({
        name: "objwith->arr",
        fn: () => {
            assert(
                Object.keys(result["objwith->arr"]).length == 0 ||
                    result["objwith->arr"] == [],
                "Key `objwith->arr.key` should be an empty object or array",
            );
        },
    });

    Deno.test({
        name: "objwith->",
        fn: () => {
            assert(
                Object.keys(result["objwith->"]).length == 0 ||
                    result["objwith->"] == [],
                "Key `objwith->.key` should be an empty object or array",
            );
        },
    });
}

const file = await Deno.readTextFile("./test/unit_test.improperties");
const result: { [key: string]: any } = parse(file);
test(result);

const stringified = stringify(result);
const reparsed: { [key: string]: any } = parse(stringified);
test(reparsed);
