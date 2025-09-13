import { select } from "@inquirer/prompts";
import { join } from "node:path";
import { findDayModules } from "./lib/find-day-modules";

const main = async () => {
  const modules = await findDayModules(join(import.meta.dir, "days"));

  if (modules.length === 0) {
    console.error("No modules found");
    return;
  }

  const selectedModule = await select({
    message: "Select day to run",
    choices: modules.map((module) => ({ name: module.name, value: module })),
  });

  await selectedModule.execute();
};

await main();
