
type SortOrder = 'asc' | 'dsc';

/**
 * Performs sort via selection sort algorithm with O(n^2) time complexity.
 * 
 * @param items array of items to sort
 * @param order sorting order, ascending by default
 * @returns new array with values sorted by the specified `order`
 */
export function selectionSort(items: number[], order: SortOrder = 'asc'): number[] {
    const result: number[] = [];
    const initialArray = [...items];

    while (initialArray.length > 0) {
        const idx = getIndexOfValue(order === 'asc' ? 'min' : 'max', initialArray); 
        const value = initialArray.splice(idx, 1)[0];
        result.push(value);
    }

    return result;
}

function getIndexOfValue(valueType: 'min' | 'max', items: number[]): number {
    let searchValue = items[0];
    let searchValueIndex = 0;

    const compareFn = (value: number) => {
        switch (valueType) {
            case 'max': return value > searchValue;
            case 'min': default: return value < searchValue;
        }
    };

    for (let index = 0; index < items.length; index++) {
        const value = items[index];

        if (compareFn(value)) {
            searchValue = value;
            searchValueIndex = index;
        }
    }

    return searchValueIndex;
}