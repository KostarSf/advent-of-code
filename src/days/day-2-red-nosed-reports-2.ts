import { getReportsFromInput } from "./day-2-red-nosed-reports-1";

export const name = "Day 2: Red-Nosed Reports (pt. 2)";

export default async (input: string) => {
    const reports = getReportsFromInput(input);
    const safeReportsCount = reports.reduce((acc, report) => {
        const isSafe = isReportSafe(report);
        return acc + (isSafe ? 1 : 0);
    }, 0);

    console.log(safeReportsCount);
};

const isReportSafe = (report: number[], skipIsUsed?: boolean): boolean => {
    let isAsc = false;
    let isDesc = false;

    for (let i = 0; i < report.length - 1; i++) {
        const [current, next] = [report[i], report[i + 1]];
        if (current === undefined || next === undefined) {
            return false;
        }

        if (current === next) {
            if (!skipIsUsed) {
                return report
                    .map((_, index) =>
                        isReportSafe(report.toSpliced(index, 1), true)
                    )
                    .some(Boolean);
            }

            return false;
        }

        if (current > next) {
            if (isAsc && !skipIsUsed) {
                return report
                    .map((_, index) =>
                        isReportSafe(report.toSpliced(index, 1), true)
                    )
                    .some(Boolean);
            }

            if (isAsc && skipIsUsed) {
                return false;
            }

            isDesc = true;
        }

        if (current < next) {
            if (isDesc && !skipIsUsed) {
                return report
                    .map((_, index) =>
                        isReportSafe(report.toSpliced(index, 1), true)
                    )
                    .some(Boolean);
            }

            if (isDesc && skipIsUsed) {
                return false;
            }

            isAsc = true;
        }

        if (Math.abs(current - next) > 3) {
            if (!skipIsUsed) {
                return report
                    .map((_, index) =>
                        isReportSafe(report.toSpliced(index, 1), true)
                    )
                    .some(Boolean);
            }

            return false;
        }
    }

    return true;
};
