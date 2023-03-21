
/**
 * Performs sort via quick sort algorithm with O(n*log(n)) time complexity.
 * 
 * @param items array of items to sort
 * @returns new array with values sorted in ascending order
 */
 export function quickSort(items: number[]): number[] {
    if (items.length < 2) {
        return items;
    }

    const referenceElementIndex = Math.floor(Math.random() * items.length);
    const referenceElement = items[referenceElementIndex];
    const smallerElements = items.filter(item => item < referenceElement);
    const greaterElements = items.filter(item => item > referenceElement);

    return [...quickSort(smallerElements), referenceElement , ...quickSort(greaterElements)];
}