export const name = "Day 4: Ceres Search (pt. 1)";

export default async (input: string) => {
    const count = coundWordOccurances(input, "XMAS");
    console.log(count);
};

/**
 * Counts the total number of occurrences of a word in a 2D character matrix.
 * The word can be found in any of the 8 directions (horizontal, vertical, diagonal).
 *
 * @param input - The input string containing the character matrix (newline-separated rows)
 * @param word - The word to search for in the matrix
 * @returns The total count of valid word sequences found
 */
const coundWordOccurances = (input: string, word: string) => {
    const matrix = createWordMatrix(input);
    const sequencesCount = countPossibleSequences(matrix, word);
    return sequencesCount;
};

interface WordMatrix {
    cells: string[][];
    width: number;
    height: number;
}

/**
 * Converts a newline-separated string into a 2D character matrix.
 * Filters out empty lines and removes carriage return characters.
 *
 * @param input - The input string with newline-separated rows of characters
 * @returns A WordMatrix object containing the 2D character array and dimensions
 */
const createWordMatrix = (input: string) => {
    const rows = input
        .split("\n")
        .filter(Boolean)
        .map((row) => row.replace("\r", ""));

    return {
        cells: rows.map((row) => row.split("")),
        width: rows[0]?.length ?? 0,
        height: rows.length,
    } as WordMatrix;
};

/**
 * Counts all possible sequences of a word found in the matrix.
 * Iterates through every position in the matrix and checks for valid word sequences
 * starting from that position in all 8 directions.
 *
 * @param matrix - The 2D character matrix to search in
 * @param word - The word to search for
 * @returns The total number of valid word sequences found
 */
const countPossibleSequences = (matrix: WordMatrix, word: string) => {
    const allSequences: [number, number][][] = [];

    for (let y = 0; y < matrix.height; y++) {
        for (let x = 0; x < matrix.width; x++) {
            const sequences = findValidSequencesForPosition(matrix, word, [y, x]);
            allSequences.push(...sequences);
        }
    }

    return allSequences.length;
};

/**
 * Finds all valid word sequences starting from a specific position in the matrix.
 * First verifies that the position contains the first character of the word,
 * then generates all possible directional sequences and validates each one.
 *
 * @param matrix - The 2D character matrix to search in
 * @param word - The word to search for
 * @param y - The row index of the starting position
 * @param x - The column index of the starting position
 * @returns Array of valid coordinate sequences that spell the word
 */
const findValidSequencesForPosition = (
    matrix: WordMatrix,
    word: string,
    [y, x]: [y: number, x: number]
) => {
    if (matrix.cells[y]?.[x] !== word[0]) {
        return [];
    }

    const indexesSequences = getAvailableIndexesSequences(matrix, word.length, [
        y,
        x,
    ]);
    const validSequences: [y: number, x: number][][] = [];

    for (const indexes of indexesSequences) {
        if (checkSequence(matrix, word, indexes)) {
            validSequences.push(indexes);
        }
    }

    return validSequences;
};

/**
 * Generates all possible coordinate sequences of a given length starting from a position.
 * Checks all 8 directions (N, NE, E, SE, S, SW, W, NW) and only includes directions
 * where the sequence would fit within the matrix boundaries.
 *
 * @param matrix - The 2D character matrix containing boundary information
 * @param length - The length of the sequence to generate
 * @param y - The starting row index
 * @param x - The starting column index
 * @returns Array of coordinate sequences, each representing a valid directional path
 */
const getAvailableIndexesSequences = (
    matrix: WordMatrix,
    length: number,
    [y, x]: [y: number, x: number]
) => {
    // From top to top-left - clockwise
    const availableDirections = [
        y >= length - 1,
        y >= length - 1 && x + length <= matrix.width,
        x + length <= matrix.width,
        x + length <= matrix.width && y + length <= matrix.height,
        y + length <= matrix.height,
        y + length <= matrix.height && x >= length - 1,
        x >= length - 1,
        x >= length - 1 && y >= length - 1,
    ];

    const directionMoves = [
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1],
    ] as [y: number, x: number][];

    const sequences: [y: number, x: number][][] = [];

    availableDirections.forEach((direction, index) => {
        if (!direction || !directionMoves[index]) {
            return;
        }

        const [yVel, xVel] = directionMoves[index];
        const sequence: [y: number, x: number][] = [];

        for (let i = 0; i < length; i++) {
            sequence.push([y + i * yVel, x + i * xVel]);
        }

        sequences.push(sequence);
    });

    return sequences;
};

/**
 * Validates whether a sequence of coordinates spells out the target word.
 * Compares each character in the sequence with the corresponding character in the word.
 *
 * @param matrix - The 2D character matrix to read characters from
 * @param word - The target word to match against
 * @param indexes - Array of [y, x] coordinate pairs representing the sequence
 * @returns True if the sequence of characters matches the word, false otherwise
 */
const checkSequence = (
    matrix: WordMatrix,
    word: string,
    indexes: [y: number, x: number][]
) => {
    if (word.length !== indexes.length) {
        return false;
    }

    for (let i = 0; i < indexes.length; i++) {
        const [y, x] = indexes[i] ?? [-1, -1];
        const char = matrix.cells[y]?.[x];

        if (!char || char !== word[i]) {
            return false;
        }
    }

    return true;
};
