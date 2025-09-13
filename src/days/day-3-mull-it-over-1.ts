import z from "zod";

import { readInput } from "../lib/read-input";

export const name = "Day 3: Mull It Over (pt. 1)";

export default async () => {
    const input = await readInput("day-3.txt");
    const total = findMultiplier(input);
    console.log(total);
};

export function findMultiplier(input: string) {
    const mulRegex = /mul\((\d+),(\d+)\)/g;
    const matches: [number, number][] = [];

    const int = z.coerce.number().pipe(z.int());

    let match: RegExpExecArray | null;
    while ((match = mulRegex.exec(input)) !== null) {
        matches.push([int.parse(match[1]), int.parse(match[2])]);
    }

    return matches.reduce((acc, [a, b]) => acc + a * b, 0);
}
