import {
    checkSequence,
    createWordMatrix,
    DIRECTIONS,
    getAvailableIndexesSequences,
    type WordMatrix,
} from "./day-4-ceres-search-1";

export const name = "Day 4: Ceres Search (pt. 2)";

export default async (input: string) => {
    const count = countXShapeWordOccurances(input, "MAS");
    console.log(count);
};

/**
 * Counts the total number of X-shaped word occurrences in a 2D character matrix.
 * An X-shape consists of two diagonal sequences that intersect at the center,
 * forming an X pattern with the target word.
 *
 * @param input - The input string containing the character matrix (newline-separated rows)
 * @param word - The word to search for in X-shaped patterns
 * @returns The total count of valid X-shaped word sequences found
 */
const countXShapeWordOccurances = (input: string, word: string) => {
    const matrix = createWordMatrix(input);
    const xShapesCount = countPossibleXShapes(matrix, word);
    return xShapesCount;
};

/**
 * Counts all possible X-shaped word sequences in the matrix.
 * Iterates through all valid starting positions where an X-shape of the given word length
 * could fit within the matrix boundaries.
 *
 * @param matrix - The 2D character matrix to search in
 * @param word - The word to search for in X-shaped patterns
 * @returns The total number of valid X-shaped word sequences found
 */
const countPossibleXShapes = (matrix: WordMatrix, word: string) => {
    let counter = 0;

    for (let y = 0; y <= matrix.height - word.length; y++) {
        for (let x = 0; x <= matrix.width - word.length; x++) {
            if (checkXShapeSequence(matrix, word, [y, x])) {
                counter += 1;
            }
        }
    }

    return counter;
};

/**
 * Checks if a valid X-shaped word sequence exists starting from a specific position.
 * An X-shape consists of two diagonal sequences that intersect:
 * - First diagonal: from top-left to bottom-right (SE direction) and from bottom-right to top-left (NW direction)
 * - Second diagonal: from bottom-left to top-right (NE direction) and from top-right to bottom-left (SW direction)
 * Both diagonals must contain valid sequences of the target word.
 *
 * @param matrix - The 2D character matrix to search in
 * @param word - The word to search for in X-shaped patterns
 * @param y - The row index of the top-left corner of the X-shape
 * @param x - The column index of the top-left corner of the X-shape
 * @returns True if a valid X-shaped word sequence exists at this position, false otherwise
 */
const checkXShapeSequence = (
    matrix: WordMatrix,
    word: string,
    [y, x]: [y: number, x: number]
) => {
    const firstSequences = [
        ...getAvailableIndexesSequences(
            matrix,
            word.length,
            [y, x],
            [DIRECTIONS.SE]
        ),
        ...getAvailableIndexesSequences(
            matrix,
            word.length,
            [y + word.length - 1, x + word.length - 1],
            [DIRECTIONS.NW]
        ),
    ];

    const secondSequences = [
        ...getAvailableIndexesSequences(
            matrix,
            word.length,
            [y + word.length - 1, x],
            [DIRECTIONS.NE]
        ),
        ...getAvailableIndexesSequences(
            matrix,
            word.length,
            [y, x + word.length - 1],
            [DIRECTIONS.SW]
        ),
    ];

    if (!firstSequences.length || !secondSequences.length) {
        return false;
    }

    return (
        firstSequences.some((sequence) =>
            checkSequence(matrix, word, sequence)
        ) &&
        secondSequences.some((sequence) =>
            checkSequence(matrix, word, sequence)
        )
    );
};
