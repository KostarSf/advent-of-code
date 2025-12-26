import { readdir } from "node:fs/promises";
import { join } from "node:path";

import { select } from "@inquirer/prompts";

import { findDayModules } from "./lib/find-day-modules";
import { parseCliArgs, findModuleByDayAndPart } from "./lib/cli";

const findAvailableYears = async (yearsPath: string): Promise<number[]> => {
    try {
        const entries = await readdir(yearsPath, { withFileTypes: true });
        const years = entries
            .filter(entry => entry.isDirectory())
            .map(entry => parseInt(entry.name, 10))
            .filter(year => !isNaN(year) && year >= 2000 && year <= 3000) // Valid 4-digit years
            .sort((a, b) => b - a); // Sort descending (newest first)
        return years;
    } catch (error) {
        console.error(`Error reading years directory: ${error}`);
        return [];
    }
};

const selectYear = async (availableYears: number[], cliYear?: number): Promise<number> => {
    if (cliYear) {
        if (availableYears.includes(cliYear)) {
            return cliYear;
        } else {
            console.error(`Year ${cliYear} not found. Available years: ${availableYears.join(", ")}`);
            process.exit(1);
        }
    }

    if (availableYears.length === 0) {
        console.error("No years found in src/years/");
        process.exit(1);
    }

    const selectedYear = await select({
        message: "Select year",
        choices: availableYears.map((year) => ({
            name: year.toString(),
            value: year,
        })),
    });

    return selectedYear;
};

const main = async () => {
    try {
        const yearsPath = join(import.meta.dir, "years");
        const availableYears = await findAvailableYears(yearsPath);

        // Check for CLI arguments
        const cliArgs = parseCliArgs();

        // Select year (interactive or from CLI)
        const selectedYear = await selectYear(availableYears, cliArgs.year);

        // Find modules for the selected year
        const daysPath = join(yearsPath, selectedYear.toString(), "days");
        const modules = await findDayModules(daysPath);

        if (modules.length === 0) {
            console.error(`No modules found for year ${selectedYear}`);
            return;
        }

        if (cliArgs.day && cliArgs.part) {
            // Run specific day and part
            const targetModule = findModuleByDayAndPart(modules, cliArgs.day, cliArgs.part);

            if (!targetModule) {
                console.error(`No module found for Day ${cliArgs.day}, Part ${cliArgs.part}`);
                console.log("Available modules:");
                modules.forEach(module => {
                    const dayMatch = module.fileName.match(/^day-(\d+)/);
                    const partMatch = module.fileName.match(/-(\d+)\.ts$/);
                    if (dayMatch && partMatch) {
                        console.log(`  Day ${dayMatch[1]}, Part ${partMatch[1]}: ${module.name}`);
                    }
                });
                return;
            }

            console.log(`Running: ${targetModule.name}`);
            await targetModule.execute();
            return;
        }

        // Fall back to interactive selection
        const selectedModule = await select({
            message: "Select day to run",
            choices: modules.map((module) => ({
                name: module.name,
                value: module,
            })),
        });

        await selectedModule.execute();
    } catch (error) {
        if (error instanceof Error && error.name === "ExitPromptError") {
            return;
        }

        throw error;
    }
};

await main();
