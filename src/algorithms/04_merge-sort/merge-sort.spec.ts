import { mergeSort } from "./implementation";

const testCases = [
  {
    // #1
    input: [],
    expectedOutput: [],
  },
  {
    // #2
    input: [1],
    expectedOutput: [1],
  },
  {
    // #3
    input: [2, 1],
    expectedOutput: [1, 2],
  },
  {
    // #4
    input: [2, 1, 3],
    expectedOutput: [1, 2, 3],
  },
  {
    // #5
    input: [2, 1, 3, 5, 4],
    expectedOutput: [1, 2, 3, 4, 5],
  },
  {
    // #6
    input: [-2, 1, -3, -5, -4],
    expectedOutput: [-5, -4, -3, -2, 1],
  },
  {
    // #6
    input: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1],
    expectedOutput: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
];

describe("Merge sort test cases", () => {
  testCases.forEach((item, index) => {
    test(`test case #${index}`, () => {
      expect(mergeSort(item.input)).toStrictEqual(item.expectedOutput);
    });
  });
});
