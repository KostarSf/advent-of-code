import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";

const dayModuleSchema = z.object({
  name: z.string().optional(),
  default: z.function(),
});

type RawDayModule = z.infer<typeof dayModuleSchema>;

interface DayModule {
  fileName: string;
  name: string;
  execute: RawDayModule["default"];
}

export async function findDayModules(path: string) {
  const files = await readdir(path);

  const modules: DayModule[] = [];
  
  for (const file of files) {
    try {
      const module = await import(join(path, file));
      const parsedModule = dayModuleSchema.parse(module);

      modules.push({
        fileName: file,
        name: parsedModule.name ?? file,
        execute: parsedModule.default,
      });
    } catch (error) {
      console.error(`Error importing module ${file}: ${error}`);
    }
  }

  return modules;
}
