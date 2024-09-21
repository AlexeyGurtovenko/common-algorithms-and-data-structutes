/**
 * Performs binary search of an element in a provided array.
 * 
 * @param items array of items to search in
 * @param target target value to search for
 * @returns index of target element or `null` if element was not found
 */
export function binarySearch<T>(items: T[], target: T): number | null {
    if (items.length === 0) {
        return null;
    }

    let startIdx = 0;
    let endIdx = items.length - 1;

    while (startIdx <= endIdx) {
        let middleIdx = Math.floor((endIdx + startIdx) / 2);

        if (items[middleIdx] === target)
            return middleIdx;
        if (target > items[middleIdx])
            startIdx = middleIdx + 1;
        else if (target < items[middleIdx])
            endIdx = middleIdx - 1;
    }

    return null;
}
