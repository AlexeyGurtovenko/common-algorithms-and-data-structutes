import { Queue, QueueFullException } from "./implementation";

describe('Queue test cases', () => {
    test('instantiates properly without any parameters', () => {
        // Arrange
        const queue = new Queue<number>();

        // Act
        // Assert
        expect(queue.size).toBe(0);
        expect(queue.isEmpty).toBeTruthy();
    });

    test('instantiates properly with parameters', () => {
        // Arrange
        const testItems = Array(10).fill('o');
        const maxSize = 7;

        // Act
        const queue = new Queue(testItems, maxSize);

        // Assert
        expect(queue.size).toBe(maxSize);
        expect(queue.isEmpty).toBeFalsy();
    });

    test('allows to use native javascript Iterator', () => {
        // Arrange
        const testItems = [1, 2, 3, 4];

        // Act
        const queue = new Queue(testItems);

        // Assert
        expect([...queue]).toStrictEqual(testItems);
    });

    test('allows to remove all elements at once', () => {
        // Arrange
        const testItems = [1, 2, 3, 4];
        const queue = new Queue(testItems);

        // Act
        queue.clear();

        // Assert
        expect(queue.size).toBe(0);
        expect(queue.isEmpty).toBeTruthy();
        expect([...queue]).toStrictEqual([]);
    });

    test('allows to put items at the end', () => {
        // Arrange
        const testItems = [1, 2, 3, 4];
        const queue = new Queue(testItems);

        // Act
        queue.enqueue(5);

        // Assert
        expect(queue.size).toBe(testItems.length + 1);
        expect([...queue]).toStrictEqual([...testItems, 5]);
    });

    test('throws an exception when enqueuing to a full queue', () => {
        // Arrange
        const testItems = [1, 2, 3, 4];
        const queue = new Queue(testItems, testItems.length);

        // Act
        const enqueueToFull = () => queue.enqueue(5);

        // Assert
        expect(enqueueToFull).toThrow(new QueueFullException())
    });

    test('allows to remove items from the start', () => {
        // Arrange
        const testItems = [1, 2, 3, 4];
        const queue = new Queue(testItems);

        // Act
        queue.dequeue();

        // Assert
        expect(queue.size).toBe(testItems.length - 1);
        expect([...queue]).toStrictEqual([2, 3, 4]);
    });

    test('throws an exception when dequeuing from an empty queue', () => {
        // Arrange
        const testItems = [1, 2, 3, 4];
        const queue = new Queue(testItems, testItems.length);

        // Act
        const dequeueToFull = () => queue.enqueue(5);

        // Assert
        expect(dequeueToFull).toThrow(new QueueFullException())
    });

});