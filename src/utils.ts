import { DataPoint } from "./types/dataTypes";

export function sortByTime(list: DataPoint[], direction: "asc" | "desc"): DataPoint[] {
    const dir = direction === "asc" ? -1 : 1;
    let sortable = Array.from(list)
    return sortable.sort(function (a: DataPoint, b: DataPoint) {
        const at = new Date(a.updated).getTime();
        const bt = new Date(b.updated).getTime()
        if (at < bt) {
            return 1 * dir
        } else if (at > bt) {
            return -1 * dir
        }
        return 0

    })
}

export function sortByKey(list: DataPoint[], key: string, direction: "asc" | "desc"): DataPoint[] {
    const dir = direction === "asc" ? -1 : 1;
    let sortable = Array.from(list)
    return sortable.sort(function (a: DataPoint, b: DataPoint) {
        const at = a[key];
        const bt = b[key]
        if (at < bt) {
            return 1 * dir
        } else if (at > bt) {
            return -1 * dir
        }
        return 0

    })
}

export function batteryLevel(voltage: number): string {
    return `${Math.round(((((voltage - 2) / (3.1 - 2)) * 100) + Number.EPSILON) * 100) / 100}%`
}