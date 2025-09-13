export const name = "Day 1: Historian Hysteria (pt. 2)";

export default async (input: string) => {
    const [firstList, secondList] = getListsFromInput(input);

    const similarityScore = firstList.reduce((acc, item) => {
		const count = secondList.filter((listItem) => listItem === item).length;
		return acc + item * count;
	}, 0);

	console.log(similarityScore);
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
