import { MinBinaryHeap } from "./implementation";

const insertionTestCases = [
  {
    // #1
    insert: [5],
    expectedSize: 1,
    expectedArray: [5],
  },
  {
    // #2
    insert: [5, 6],
    expectedSize: 2,
    expectedArray: [5, 6],
  },
  {
    // #3
    insert: [5, 6, 7],
    expectedSize: 3,
    expectedArray: [5, 6, 7],
  },
  {
    // #4
    insert: [5, 4, 7],
    expectedSize: 3,
    expectedArray: [4, 5, 7],
  },
  {
    // #5
    insert: [5, 6, 3],
    expectedSize: 3,
    expectedArray: [3, 6, 5],
  },
  {
    // #6
    insert: [5, 6, 7, 9, 10],
    expectedSize: 5,
    expectedArray: [5, 6, 7, 9, 10],
  },
  {
    // #7
    insert: [5, 6, 7, 9, 10, 6],
    expectedSize: 6,
    expectedArray: [5, 6, 6, 9, 10, 7],
  },
  {
    // #7
    insert: [5, 6, 7, -1, 9, 10, 6, -2, 0, -2],
    expectedSize: 10,
    expectedArray: [-2, -2, 6, 0, -1, 10, 7, 6, 5, 9],
  },
  {
    // #8
    insert: [0, 0, -1, -2],
    expectedSize: 4,
    expectedArray: [-2, -1, 0, 0],
  },
];

const removalTestCases = [
  {
    // #1
    initialArray: [5],
    expectedSize: 0,
    minValue: 5,
    expectedArray: [],
  },
  {
    // #2
    initialArray: [5, 6],
    expectedSize: 1,
    minValue: 5,
    expectedArray: [6],
  },
  {
    // #3
    initialArray: [6, 5],
    expectedSize: 1,
    minValue: 5,
    expectedArray: [6],
  },
  {
    // #4
    initialArray: [5, 7, 5],
    expectedSize: 2,
    minValue: 5,
    expectedArray: [5, 7],
  },
  {
    // #5
    initialArray: [-2, -1, 6, 0, 9, 10, 7],
    expectedSize: 6,
    minValue: -2,
    expectedArray: [-1, 0, 6, 7, 9, 10],
  },
  {
    // #6
    initialArray: [-2, 6, -1, 0, 9, 10, 7],
    expectedSize: 6,
    minValue: -2,
    expectedArray: [-1, 0, 7, 6, 9, 10],
  },
  {
    // #7
    initialArray: [-1, 0, 7, 6, 9, 10],
    expectedSize: 5,
    minValue: -1,
    expectedArray: [0, 6, 7, 10, 9],
  },
  {
    // #8
    initialArray: [0, 6, 7, 10, 9],
    expectedSize: 4,
    minValue: 0,
    expectedArray: [6, 9, 7, 10],
  },
  {
    // #9
    initialArray: [6, 9, 7, 10],
    expectedSize: 3,
    minValue: 6,
    expectedArray: [7, 9, 10],
  },
  {
    // #10
    initialArray: [7, 9, 10],
    expectedSize: 2,
    minValue: 7,
    expectedArray: [9, 10],
  },
  {
    // #11
    initialArray: [9, 10],
    expectedSize: 1,
    minValue: 9,
    expectedArray: [10],
  },
  {
    // #12
    initialArray: [10],
    expectedSize: 0,
    minValue: 10,
    expectedArray: [],
  },
  {
    // #13
    initialArray: [],
    expectedSize: 0,
    minValue: null,
    expectedArray: [],
  },
];

describe("Binary heap test cases", () => {
  test("instantiates properly without any parameters", () => {
    // Arrange
    const heap = new MinBinaryHeap<number>();

    // Act
    // Assert
    expect(heap.size).toBe(0);
    expect(heap.isEmpty).toBeTruthy();
  });

  test("instantiates properly with parameters", () => {
    // Arrange
    const testValues = [1, 2, 3, 8, 9, 78, 5];

    // Act
    const heap = new MinBinaryHeap(testValues);

    // Assert
    expect(heap.size).toBe(testValues.length);
    expect(heap.isEmpty).toBeFalsy();
  });

  test("allows to use native javascript Iterator", () => {
    // Arrange
    const testValues = [1, 2, 3, 4, 5, 6, 7];

    // Act
    const heap = new MinBinaryHeap(testValues);

    // Assert
    expect([...heap]).toStrictEqual(testValues);
  });

  test("allows to remove all elements at once", () => {
    // Arrange
    const testItems = [1, 2, 3, 4];
    const heap = new MinBinaryHeap(testItems);

    // Act
    heap.clear();

    // Assert
    expect(heap.size).toBe(0);
    expect(heap.isEmpty).toBeTruthy();
    expect([...heap]).toStrictEqual([]);
  });

  describe("insertion test cases", () => {
    insertionTestCases.forEach((item, index) => {
      test(`test case #${index + 1}`, () => {
        // Arrange
        // Act
        const heap = new MinBinaryHeap(item.insert);

        // Assert
        expect(heap.size).toBe(item.expectedSize);
        expect(heap.isEmpty).toBeFalsy();
        expect([...heap]).toStrictEqual(item.expectedArray);
      });
    });
  });

  describe("removal test cases", () => {
    removalTestCases.forEach((item, index) => {
      test(`test case #${index + 1}`, () => {
        // Arrange
        const heap = new MinBinaryHeap(item.initialArray);
        
        // Act
        const minValue = heap.removeMin();

        // Assert
        expect(minValue).toBe(item.minValue);
        expect(heap.size).toBe(item.expectedSize);
        expect([...heap]).toStrictEqual(item.expectedArray);
      });
    });
  });
});
