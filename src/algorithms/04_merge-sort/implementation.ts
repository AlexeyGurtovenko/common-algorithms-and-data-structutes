/**
 * Performs sort via merge sort algorithm with O(n*log(n)) time complexity.
 *
 * @param items array of items to sort
 * @returns new array with values sorted in ascending order
 */
export function mergeSort(items: number[]): number[] {
  if (items.length <= 1) {
    return items;
  }

  const middleIndex = Math.floor(items.length / 2);
  const firstHalf = items.slice(0, middleIndex);
  const secondHalf = items.slice(middleIndex);

  return mergeArrays(mergeSort(firstHalf), mergeSort(secondHalf));
}

function mergeArrays(arr1: number[], arr2: number[]): number[] {
  let idx1 = 0;
  let idx2 = 0;
  const result = [];

  while (idx1 < arr1.length || idx2 < arr2.length) {
    if (idx1 < arr1.length && idx2 < arr2.length) {
      const value1 = arr1[idx1];
      const value2 = arr2[idx2];

      if (value1 < value2) {
        result.push(value1);
        idx1++;
      } else {
        result.push(value2);
        idx2++;
      }
    } else if (idx1 < arr1.length) {
      result.push(arr1[idx1]);
      idx1++;
    } else {
      result.push(arr2[idx2]);
      idx2++;
    }
  }

  return result;
}
