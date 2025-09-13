interface CliArgs {
    day?: number;
    part?: number;
}

export const parseCliArgs = (): CliArgs => {
    const args = Bun.argv;
    const result: CliArgs = {};

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        if (arg === '--day' && i + 1 < args.length) {
            const dayValue = parseInt(args[i + 1] ?? "", 10);
            if (!isNaN(dayValue)) {
                result.day = dayValue;
            }
            i++; // Skip the next argument since we consumed it
        } else if (arg === '--part' && i + 1 < args.length) {
            const partValue = parseInt(args[i + 1] ?? "", 10);
            if (!isNaN(partValue)) {
                result.part = partValue;
            }
            i++; // Skip the next argument since we consumed it
        }
    }

    // Default part is 2 if not specified
    if (result.day && !result.part) {
        result.part = 2;
    }

    return result;
};

export const findModuleByDayAndPart = (
    modules: Array<{ fileName: string; name: string; execute: () => Promise<void> }>,
    day: number,
    part: number
) => {
    return modules.find(module => {
        // Extract day number from filename (e.g., "day-4-ceres-search-1.ts" -> 4)
        const dayMatch = module.fileName.match(/^day-(\d+)/);
        if (!dayMatch) return false;

        const moduleDay = parseInt(dayMatch[1] ?? "", 10);
        if (moduleDay !== day) return false;

        // Extract part number from end of filename (e.g., "day-4-ceres-search-1.ts" -> 1)
        const partMatch = module.fileName.match(/-(\d+)\.ts$/);
        if (!partMatch) return false;

        const modulePart = parseInt(partMatch[1] ?? "", 10);
        return modulePart === part;
    });
};
