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