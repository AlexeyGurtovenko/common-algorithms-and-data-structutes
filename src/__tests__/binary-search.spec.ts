import { binarySearch } from "../algorithms"

describe('Binary search test cases', () => {

    test('target elemement exists in array', () => {
        // Arrange
        const testValues = [1, 2, 3, 4, 5];
        const targetValue = 4;
        const targetValueIndex = testValues.indexOf(4);

        // Act
        const searchResult = binarySearch(testValues, targetValue);

        // Assert
        expect(searchResult).toBe(targetValueIndex);
    });

    test('target elemement does not exist in array', () => {
        // Arrange
        const testValues = [1, 2, 3, 4, 5];
        const targetValue = -1;

        // Act
        const searchResult = binarySearch(testValues, targetValue);

        // Assert
        expect(searchResult).toBeNull();
    });
});