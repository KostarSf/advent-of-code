export const name = "Day 2: Red-Nosed Reports (pt. 1)";

export default async (input: string) => {
    const reports = getReportsFromInput(input);
    const safeReportsCount = reports.reduce((acc, report) => {
        const isSafe = isReportSafe(report);
        return acc + (isSafe ? 1 : 0);
    }, 0);

    console.log(safeReportsCount);
};

export const getReportsFromInput = (input: string) => {
    const reports: number[][] = [];

    for (const line of input.split("\n")) {
        const report = line
            .split(" ")
            .filter(Boolean)
            .map(Number)
            .filter((item) => !Number.isNaN(item));
        if (report.length > 0) {
            reports.push(report);
        }
    }

    return reports;
};

const isReportSafe = (report: number[]) => {
    let isAsc = false;
    let isDesc = false;

    for (let i = 0; i < report.length - 1; i++) {
        const [current, next] = [report[i], report[i + 1]];
        if (current === undefined || next === undefined) {
            return false;
        }

        if (current === next) {
            return false;
        }

        if (current > next) {
            isDesc = true;
        }

        if (current < next) {
            isAsc = true;
        }

        if (Math.abs(current - next) > 3) {
            return false;
        }
    }

    return isAsc !== isDesc;
};
