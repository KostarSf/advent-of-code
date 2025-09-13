# Advent of Code Solutions

A TypeScript-based solution repository for [Advent of Code](https://adventofcode.com) challenges, featuring an interactive TUI (Terminal User Interface) for easy day selection and execution.

## Features

- 🎯 **Interactive Day Selection**: Choose which day's solution to run through a beautiful terminal interface
- 🚀 **Fast Execution**: Built with [Bun](https://bun.com) for lightning-fast performance
- 📁 **Organized Structure**: Clean separation of solutions, inputs, and utilities
- 🔧 **Type Safety**: Full TypeScript support with Zod validation
- 📝 **Automatic Discovery**: Automatically finds and lists all available day solutions

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

```bash
bun start
```

This will launch the interactive TUI where you can select which day's solution to run.

## Creating New Day Solutions

To add a new day solution:

1. Create a new file in `src/days/` following the naming pattern: `day-X-description.ts`
2. Export a `name` string and a `default` async function:

```typescript
import { readInput } from "../lib/read-input";

export const name = "Day X: Your Description";

export default async () => {
    const input = await readInput("day-X.txt");
    
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

The TUI will automatically discover and include your new solution in the selection menu.

## Available Scripts

- `bun start` - Launch the interactive TUI
- `bun run src/index.tsx` - Direct execution (same as start)

## Dependencies

- **@inquirer/prompts**: Interactive terminal prompts for the TUI
- **zod**: Runtime type validation and parsing
- **@types/bun**: TypeScript definitions for Bun

## Technology Stack

- **Runtime**: [Bun](https://bun.com) - Fast JavaScript runtime
- **Language**: TypeScript
- **Validation**: Zod for runtime type safety
- **TUI**: Inquirer.js for interactive prompts

## Contributing

Feel free to add new solutions, improve existing ones, or enhance the tooling. The modular structure makes it easy to add new days without affecting existing code.

## License

This project is for educational purposes as part of Advent of Code participation.
