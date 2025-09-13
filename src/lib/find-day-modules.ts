import { readdir } from "node:fs/promises";
import { join } from "node:path";

import { z } from "zod";

const dayModuleSchema = z.object({
    name: z.string().optional(),
    default: z.function({
        input: [z.string().optional()],
        output: z.unknown(),
    }),
});

interface DayModule {
    fileName: string;
    name: string;
    execute: () => Promise<void>;
}

const loadInputFile = async (
    dayFileName: string,
    inputsPath: string
): Promise<string> => {
    // Extract day number from filename (e.g., "day-3-mull-it-over-1.ts" -> "day-3")
    const dayMatch = dayFileName.match(/^day-\d+/);
    if (!dayMatch) {
        console.warn(
            `Warning: ${dayFileName} doesn't follow day-X naming pattern`
        );
        return "";
    }

    const dayPrefix = dayMatch[0];

    // Try both with and without .txt extension
    const possibleInputFiles = [`${dayPrefix}.txt`, dayPrefix];

    for (const inputFile of possibleInputFiles) {
        try {
            const inputPath = join(inputsPath, inputFile);
            const content = await Bun.file(inputPath).text();
            return content;
        } catch {
            // Continue to next possible filename
        }
    }

    console.warn(
        `Warning: No input file found for ${dayFileName}. Expected: ${dayPrefix}.txt or ${dayPrefix} in inputs folder`
    );
    return "";
};

export const findDayModules = async (path: string) => {
    const files = await readdir(path);
    const inputsPath = join(path, "..", "inputs");

    const modules: DayModule[] = [];

    for (const file of files) {
        try {
            const module = await import(join(path, file));
            const parsedModule = dayModuleSchema.parse(module);

            // Load input file content
            const inputContent = await loadInputFile(file, inputsPath);

            modules.push({
                fileName: file,
                name: parsedModule.name ?? file,
                execute: async () => {
                    await parsedModule.default(inputContent);
                },
            });
        } catch (error) {
            console.error(`Error importing module ${file}: ${error}`);
        }
    }

    return modules;
};
