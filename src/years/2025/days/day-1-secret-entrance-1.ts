export const name = "Day 1: Secret Entrance";

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
    console.log(value);
    for (const step of sequence) {
        value = rotateValue(value, step);
        const displayStep = step > 0 ? `+${step}` : step.toString();
        if (value === 0) {
            zeroesCount++;
            console.log("0", "\t ", displayStep, "\t <-- ", zeroesCount, "total");
        } else {
            console.log(value, "\t ", displayStep)
        }
    }
    return zeroesCount;
}

const rotateValue = (value: number, step: number) => {
    const sign = Math.sign(step);
    const absoluteStep = Math.abs(step) % 100;
    return (value + sign * absoluteStep) % 100;
}
