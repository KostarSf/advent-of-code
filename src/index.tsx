import { join } from "node:path";

import { select } from "@inquirer/prompts";

import { findDayModules } from "./lib/find-day-modules";

const main = async () => {
    try {
        const modules = await findDayModules(join(import.meta.dir, "days"));

        if (modules.length === 0) {
            console.error("No modules found");
            return;
        }

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
