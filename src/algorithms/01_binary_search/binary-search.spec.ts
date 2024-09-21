import { binarySearch } from "./implementation";

describe('Binary search test cases', () => {

    test('an empty array is provided', () => {
        // Arrange
        const testValues: number[] = [];
        const targetValue = 4;

        // Act
        const searchResult = binarySearch(testValues, targetValue);

        // Assert
        expect(searchResult).toBeNull();
    });

    test('target element exists in array', () => {
        // Arrange
        const testValues = [1, 2, 3, 4, 5];
        const targetValue = 4;
        const targetValueIndex = testValues.indexOf(4);

        // Act
        const searchResult = binarySearch(testValues, targetValue);

        // Assert
        expect(searchResult).toBe(targetValueIndex);
    });

    test('target element does not exist in array', () => {
        // Arrange
        const testValues = [1, 2, 3, 4, 5];
        const targetValue = -1;

        // Act
        const searchResult = binarySearch(testValues, targetValue);

        // Assert
        expect(searchResult).toBeNull();
    });
});