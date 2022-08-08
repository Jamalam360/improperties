export function parse<T>(input: string): T {
    const obj: { [key: string]: unknown } = {};

    const lines = input.split("\n");

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        const { key, value, startsObject, continuesMultilineString } =
            parseLine(
                line,
            );

        if (
            key != undefined && value != undefined && !continuesMultilineString
        ) {
            obj[String.raw`${key}`] = value;
        } else if (startsObject && key != undefined) {
            // Find the end of the object
            let end = i;
            let depth = 1;

            for (let j = i + 1; j < lines.length; j++) {
                if (lines[j].trim() == "--") {
                    if (depth == 1) {
                        end = j;
                        break;
                    } else {
                        depth--;
                    }
                }

                const { startsObject } = parseLine(lines[j]);

                if (startsObject) {
                    depth++;
                }
            }

            if (
                lines[i + 1].trim().startsWith("-") &&
                lines[i + 1].trim() != "--"
            ) {
                // This is a list
                obj[key] = parseList(
                    lines.slice(i + 1, end).join("\n"),
                );
            } else {
                const object = parse(
                    lines.slice(i + 1, end).join("\n"),
                );

                obj[key] = object;
            }

            i = end;
        } else if (key != undefined && continuesMultilineString) {
            // Find the end of the multiline string
            let end = i;

            for (let j = i; j < lines.length; j++) {
                if (!lines[j].trim().endsWith("\\") || j == lines.length - 1) {
                    if (j == lines.length - 1) {
                        end = j + 1;
                    } else {
                        end = j;
                    }

                    break;
                }
            }

            let string = "";

            for (let j = i + 1; j < end; j++) {
                string += lines[j].trim().replace(/\\$/, "");
            }

            obj[key] = value + string;

            i = end;
        }
    }

    return obj as unknown as T;
}

function parseList(
    input: string,
): unknown[] {
    const lines = input.split("\n");

    const list: unknown[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.includes("->") && line[line.indexOf("->") - 1] != "\\") {
            const objLines = lines.slice(i);

            // Find the end of the object
            let end = i;
            let depth = 1;

            for (let j = 0; j < objLines.length; j++) {
                if (objLines[j].trim() == "--") {
                    if (depth == 1) {
                        end = j;
                        break;
                    } else {
                        depth--;
                    }
                }
            }

            if (
                lines[i + 1].trim().startsWith("-") &&
                lines[i + 1].trim() != "--"
            ) {
                // This is a list
                list.push(parseList(objLines.slice(1, end).join("\n")));
            } else {
                const object = parse(
                    objLines.slice(1, end).join("\n"),
                );

                list.push(object);
            }

            i += end;
        } else {
            if (line != "") {
                let value = line;
                value = value.slice(value.indexOf("-") + 1, value.length);
                value = trim(value);

                let final = "";

                for (let j = 0; j < value.length; j++) {
                    // remove backslash escapes for -
                    if (value[j] == "\\" && value[j + 1] == "-") {
                        continue;
                    } else {
                        final += value[j];
                    }
                }

                list.push(final);
            }
        }
    }

    return list;
}

function parseLine(
    line: string,
): {
    key: string | undefined;
    value: string | undefined;
    startsObject: boolean;
    continuesMultilineString: boolean;
} {
    let key = "";
    let value = "";
    let keyDone = false;

    if (line.includes("->")) {
        const pos = line.lastIndexOf("->");

        if (line[pos - 1] != "\\") {
            key = trim(line.substring(0, pos));

            if (key != "") {
                return {
                    key,
                    value: undefined,
                    startsObject: true,
                    continuesMultilineString: false,
                };
            }
        }
    }

    const chars = line.split("");

    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];

        if (isComment(char) && chars[i - 1] != "\\") {
            break;
        }

        if (char == " " && chars[i - 1] != "\\") {
            continue;
        }

        if (
            !keyDone &&
            ((isAssignment(char) && chars[i - 1] != "\\") ||
                (char == " " &&
                    isAssignment(chars[i + 1]) && chars[i - 1] != "\\"))
        ) {
            keyDone = true;

            if (char == " ") {
                i++;
            }

            continue;
        } else if (isAssignment(chars[i + 1]) && char == "\\") {
            continue;
        } else if (
            keyDone &&
            (char == " " && isAssignment(chars[i - 1]))
        ) {
            continue;
        } else if (!keyDone) {
            if (char == "\\" && chars[i + 1] == " ") {
                continue;
            }

            key += char;
        } else {
            if (i == chars.length - 1 && char == "\\") {
                return {
                    key,
                    value,
                    startsObject: false,
                    continuesMultilineString: true,
                };
            }

            if (char == "\\" && chars[i + 1] == " ") {
                continue;
            }

            value += char;
        }
    }

    return {
        key: key == "" ? undefined : key,
        value: value == "" ? undefined : value,
        startsObject: false,
        continuesMultilineString: false,
    };
}

function isAssignment(char: string): boolean {
    return char == ":" || char == "=";
}

function isComment(char: string): boolean {
    return char == "#" || char == "!";
}

function trim(str: string): string {
    let trimmed = "";

    for (let i = 0; i < str.length; i++) {
        if (!(str[i] == " " && str[i - 1] != "\\")) {
            trimmed += str[i];
        }
    }

    return trimmed;
}
