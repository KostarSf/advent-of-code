# My Advent of Code Solutions

A personal TypeScript-based solution repository for [Advent of Code](https://adventofcode.com) challenges, featuring an interactive TUI (Terminal User Interface) for easy day selection and execution.

## Features

- 🎯 **Interactive Day Selection**: Choose which day's solution to run through a beautiful terminal interface
- 🚀 **Fast Execution**: Built with [Bun](https://bun.com) for lightning-fast performance
- 📁 **Organized Structure**: Clean separation of solutions, inputs, and utilities
- 🔧 **Type Safety**: Full TypeScript support with Zod validation
- 📝 **Automatic Discovery**: Automatically finds and lists all available day solutions
- 📄 **Auto Input Loading**: Input files are automatically loaded and passed to your day functions

## Project Structure

```
src/
├── days/           # Day solution modules
├── inputs/         # Input files for each day
├── lib/            # Utility functions
│   ├── find-day-modules.ts  # Auto-discovery of day modules
│   └── read-input.ts        # Input file reader
└── index.tsx       # Main TUI application
```

## Getting Started

### Prerequisites

- [Bun](https://bun.com) runtime (v1.2.20 or later)

### Installation

```bash
bun install
```

### Running Solutions

**Interactive Mode:**
```bash
bun start
```
This will launch the interactive TUI where you can select which day's solution to run.

**Direct CLI Mode:**
```bash
bun run src/index.tsx --day 4 --part 2
```
Run a specific day and part directly without the interactive interface.

- `--day X`: Specify the day number (required)
- `--part Y`: Specify the part number (optional, defaults to 2 if omitted)

Examples:
```bash
bun run src/index.tsx --day 3 --part 1    # Run Day 3, Part 1
bun run src/index.tsx --day 4              # Run Day 4, Part 2 (default)
```

## Creating New Day Solutions

To add a new day solution:

1. Create a new file in `src/days/` following the naming pattern: `day-X-description.ts`
2. Export a `name` string and a `default` async function:

```typescript
export const name = "Day X: Your Description";

export default async (input: string) => {
    // Input content is automatically loaded from day-X.txt
    // and passed as the first parameter

    // Your solution logic here
    const result = solvePart(input);
    console.log(result);
};

// Export any helper functions for testing
export function solvePart(input: string) {
    // Implementation
}
```

3. Add the corresponding input file to `src/inputs/day-X.txt`

The TUI will automatically discover and include your new solution in the selection menu. The input file content will be automatically loaded and passed to your function as the first parameter.

**Input File Naming**: The system automatically looks for input files matching your day prefix (e.g., `day-4.txt` for `day-4-some-description.ts`). If no input file is found, an empty string is passed and a warning is displayed.

## Available Scripts

- `bun start` - Launch the interactive TUI
- `bun run src/index.tsx` - Direct execution (same as start)
- `bun run src/index.tsx --day X --part Y` - Run specific day and part directly

## Dependencies

- **@inquirer/prompts**: Interactive terminal prompts for the TUI
- **zod**: Runtime type validation and parsing
- **@types/bun**: TypeScript definitions for Bun

## Technology Stack

- **Runtime**: [Bun](https://bun.com) - Fast JavaScript runtime
- **Language**: TypeScript
- **Validation**: Zod for runtime type safety
- **TUI**: Inquirer.js for interactive prompts

## Personal Notes

This is my personal Advent of Code journey! The modular structure makes it easy to add new days and experiment with different approaches to solving the challenges.

## License

MIT License - This project is for educational purposes as part of Advent of Code participation.
