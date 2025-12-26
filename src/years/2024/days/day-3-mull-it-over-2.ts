import { findMultiplier } from "./day-3-mull-it-over-1";

export const name = "Day 3: Mull It Over (pt. 2)";

export default async (input: string) => {
    const clearedInput = applyConditionals(input);
    const total = findMultiplier(clearedInput);
    console.log(total);
};

const applyConditionals = (input: string) => {
    const doRegex = /do\(\)/g;
    const dontRegex = /don\'t\(\)/g;

    const conditionals = new Map<number, boolean>([[0, true]]);

    let match: RegExpExecArray | null;

    while ((match = doRegex.exec(input)) !== null) {
        conditionals.set(match.index, true);
    }

    while ((match = dontRegex.exec(input)) !== null) {
        conditionals.set(match.index, false);
    }

    const resultStringChars = input.split("");
    let currentlyDo = true;
    for (let i = 0; i < resultStringChars.length; i++) {
        const currentConditional = conditionals.get(i);
        currentlyDo =
            currentConditional !== undefined ? currentConditional : currentlyDo;

        if (!currentlyDo) {
            resultStringChars[i] = "-";
        }
    }

    return resultStringChars.join("");
}
