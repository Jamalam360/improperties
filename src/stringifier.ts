interface StringifyOptions {
    /**
     * The indentation string. Defaults to "  ".
     */
    indent?: string;
    /**
     * The assignment string. Defaults to " : ".
     */
    assignment?: string;
    /**
     * Whether to add a newline after each key-value pair. Defaults to false.
     */
    space?: boolean;
}

/**
 * Stringifies an object into an Improperties string.
 *
 * @param obj - The object to stringify
 * @param opts - Options for stringifying the object
 * @returns A valid Improperties string representing the object
 */
export function stringify(
    obj: Record<string, unknown>,
    opts?: StringifyOptions,
): string {
    return stringifyWithIndent(obj, 0, opts);
}

function stringifyWithIndent(
    obj: Record<string, unknown>,
    indentLevel: number,
    opts?: StringifyOptions,
): string {
    const { indent = "  ", assignment = " : ", space = false } = opts || {};

    let output = "";
    let loops = 0;

    for (const key of Object.keys(obj)) {
        const value = obj[key];

        if (typeof value === "object") {
            output += `${indent.repeat(indentLevel)}${getKey(key)} ->\n`;
            indentLevel++;

            if (Array.isArray(value)) {
                for (const item of value) {
                    output += `${indent.repeat(indentLevel)}- `;

                    if (typeof item === "object") {
                        if (Object.keys(item).length > 0) {
                            output += `->\n${indent.repeat(indentLevel + 1)}${
                                stringifyWithIndent(
                                    item,
                                    indentLevel + 1,
                                    opts,
                                )
                            }\n${indent.repeat(indentLevel)}--`;
                        } else {
                            output += `->\n${indent.repeat(indentLevel)}--`;
                        }
                    } else {
                        output += getValue(item).replaceAll("-", "\\-");
                    }

                    output += "\n";
                }

                output = output.trimEnd();
            } else {
                if (Object.keys(value as Record<string, unknown>).length > 0) {
                    output += `${indent.repeat(indentLevel)}${
                        stringifyWithIndent(
                            value as Record<string, unknown>,
                            indentLevel,
                            {
                                indent,
                                assignment,
                            },
                        )
                    }`;
                } else {
                    output = output.trimEnd();
                }
            }

            indentLevel--;
            output += `\n${indent.repeat(indentLevel)}--\n`;
        } else {
            output += `${indent.repeat(indentLevel)}${
                getKey(key)
            }${assignment}${getValue(value as string)}\n`;
        }

        if (space) {
            output += "\n";
        }

        loops++;
    }

    return output.trim();
}

function getKey(key: string): string {
    return key.replaceAll("\\", "\\\\").replaceAll(" ", "\\ ").replaceAll(
        "=",
        "\\=",
    ).replaceAll(":", "\\:");
}

function getValue(value: string): string {
    return value.replaceAll("\\", "\\\\").replaceAll(" ", "\\ ").replaceAll(
        "=",
        "\\=",
    ).replaceAll(":", "\\:");
}
