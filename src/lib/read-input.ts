import { join } from "node:path";

export const readInput = async (fileName: string) => {
    const path = join(import.meta.dir, "..", "inputs", fileName);

    try {
        const input = await Bun.file(path).text()
    return input;
    } catch (error) {
        throw new Error(`You should have a file named ${fileName} in the inputs folder`);
    }
}
