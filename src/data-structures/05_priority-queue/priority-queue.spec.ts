import { QueueEmptyException, QueueFullException } from "../03_queue/implementation";
import { PriorityQueue } from "./implementation";

const dequeueLowestTestCases = [
  {
    initialValues: [5, 4, -1, 7, 0, 9],
    expectedSize: 5,
    expectedValue: -1,
  },
  {
    initialValues: [5, 4, 7, 0, 9],
    expectedSize: 4,
    expectedValue: 0,
  },
  {
    initialValues: [5, 4, 7, 9],
    expectedSize: 3,
    expectedValue: 4,
  },
  {
    initialValues: [5, 7, 9],
    expectedSize: 2,
    expectedValue: 5,
  },
  {
    initialValues: [7, 9],
    expectedSize: 1,
    expectedValue: 7,
  },
  {
    initialValues: [9],
    expectedSize: 0,
    expectedValue: 9,
  },
];

describe("Priority queue test cases", () => {
  test("instantiates properly without any parameters", () => {
    // Arrange
    const queue = new PriorityQueue<number>();

    // Act
    // Assert
    expect(queue.size).toBe(0);
    expect(queue.isEmpty).toBeTruthy();
  });

  test("instantiates properly with parameters", () => {
    // Arrange
    const testItems = Array(10).fill(0);
    const maxSize = 7;

    // Act
    const queue = new PriorityQueue(testItems, maxSize);

    // Assert
    expect(queue.size).toBe(maxSize);
    expect(queue.isEmpty).toBeFalsy();
  });

  test("allows to use native javascript Iterator", () => {
    // Arrange
    const testItems = [1, 2, 3, 4];

    // Act
    const queue = new PriorityQueue(testItems);

    // Assert
    expect([...queue]).toStrictEqual(testItems);
  });

  test("allows to remove all elements at once", () => {
    // Arrange
    const testItems = [1, 2, 3, 4];
    const queue = new PriorityQueue(testItems);

    // Act
    queue.clear();

    // Assert
    expect(queue.size).toBe(0);
    expect(queue.isEmpty).toBeTruthy();
    expect([...queue]).toStrictEqual([]);
  });

  test("throws an exception when enqueuing to a full queue", () => {
    // Arrange
    const testItems = [1, 2, 3, 4];
    const queue = new PriorityQueue(testItems, testItems.length);

    // Act
    const enqueueToFull = () => queue.enqueue(5);

    // Assert
    expect(enqueueToFull).toThrow(new QueueFullException());
  });

  test("throws an exception when dequeuing from an empty queue", () => {
    // Arrange
    const queue = new PriorityQueue();

    // Act
    const dequeueFromEmpty = () => queue.dequeue();

    // Assert
    expect(dequeueFromEmpty).toThrow(new QueueEmptyException());
  });

  describe('dequeues the lowest value', () => {
    dequeueLowestTestCases.forEach((item, index) => {
      test(`test case #${index}`, () => {
        // Arrange
        const queue = new PriorityQueue(item.initialValues);

        // Act
        const value = queue.dequeue();

        // Assert
        expect(queue.size).toBe(item.expectedSize);
        expect(value).toBe(item.expectedValue);
      });
    });
  });
});
