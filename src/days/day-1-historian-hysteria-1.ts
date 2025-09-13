export const name = "Day 1: Historian Hysteria (pt. 1)";

export default async (input: string) => {
    const [firstList, secondList] = getListsFromInput(input);

    firstList.sort((a, b) => a - b);
    secondList.sort((a, b) => a - b);

    const differences: number[] = [];

    secondList.forEach((item, index) => {
        differences.push(Math.abs(item - (firstList[index] ?? 0)));
    });

	const result = differences.reduce((acc, item) => acc + item, 0);

    console.log(result);
};

export const getListsFromInput = (input: string) => {
	const firstList: number[] = [];
	const secondList: number[] = [];

	for (const line of input.split("\n")) {
		const [left, right] = line.split(" ").filter(Boolean);

		if (left !== undefined) {
			firstList.push(Number(left));
		}

		if (right !== undefined) {
			secondList.push(Number(right));
		}
	}

	return [firstList, secondList] as const;
}
