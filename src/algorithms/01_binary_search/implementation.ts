
export function binarySearch(items: number[], target: number): number | null {
    let startIdx = 0;
    let endIdx = items.length - 1;

    while (startIdx < endIdx) {
        let middleIdx = Math.floor((endIdx + startIdx) / 2);
        if (items[middleIdx] === target)
            return middleIdx;
        if (target > items[middleIdx])
            startIdx = middleIdx;
        else if (target < items[middleIdx])
            endIdx = middleIdx;
    }

    return null;
}
