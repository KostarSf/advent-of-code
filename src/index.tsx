import { join } from "node:path";

import { select } from "@inquirer/prompts";

import { findDayModules } from "./lib/find-day-modules";
import { parseCliArgs, findModuleByDayAndPart } from "./lib/cli";

const main = async () => {
    try {
        const modules = await findDayModules(join(import.meta.dir, "days"));

        if (modules.length === 0) {
            console.error("No modules found");
            return;
        }

        // Check for CLI arguments
        const cliArgs = parseCliArgs();

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
