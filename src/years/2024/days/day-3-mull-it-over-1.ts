import z from "zod";

export const name = "Day 3: Mull It Over (pt. 1)";

export default async (input: string) => {
    const total = findMultiplier(input);
    console.log(total);
};

export const findMultiplier = (input: string) => {
    const mulRegex = /mul\((\d+),(\d+)\)/g;
    const matches: [number, number][] = [];

    const int = z.coerce.number().pipe(z.int());

    let match: RegExpExecArray | null;
    while ((match = mulRegex.exec(input)) !== null) {
        matches.push([int.parse(match[1]), int.parse(match[2])]);
    }

    return matches.reduce((acc, [a, b]) => acc + a * b, 0);
}
