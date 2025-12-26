export const name = "Day 1: Secret Entrance (pt. 2)";

export default async (input: string) => {
    const sequence = parseSequence(input);
    const password = decodePassword(sequence);
    console.log("password: ", password);
};

const parseSequence = (input: string) =>
    input
        .split("\n")
        .filter(Boolean)
        .map((line) => (line.startsWith("L") ? -1 : 1) * Number(line.slice(1)));

const decodePassword = (sequence: number[]) => {
    let value = 50;
    let zeroesCount = 0;
    for (const step of sequence) {
        const oldValue = value;
        const { newValue, rotationsCount } = rotateValue(value, step);
        value = newValue;
        zeroesCount += rotationsCount;

        const displayStep = step > 0 ? `+${step}` : step.toString();
        const displayZeroesCount =
            rotationsCount > 0
                ? `\t <-- ${zeroesCount} total (+${rotationsCount})`
                : "";

        console.log(
            `${oldValue.toString().padStart(3, " ")} ${displayStep.padEnd(4, " ")} =`,
            value,
            "\t ",
            displayZeroesCount
        );
    }
    return zeroesCount;
};

const rotateValue = (value: number, step: number) => {
    const sign = Math.sign(step);
    const absoluteStep = Math.abs(step) % 100;
    const newValue = (value + sign * absoluteStep + 100) % 100;

    let rotationsCount = 0;
    for (let i = value; i !== (value + step); i += sign) {
        if (i % 100 === 0) rotationsCount++;
    }

    return { newValue, rotationsCount };
};
