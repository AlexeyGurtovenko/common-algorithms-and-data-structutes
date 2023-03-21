import { selectionSort } from "./implementation";

describe('Selection sort test cases', () => {
    test('return an empty array when an empty array is passed for sorting', () => {
        // Arrange
        // Act
        // Assert
        expect(selectionSort([])).toStrictEqual([]);
    });

    test('sorts in ascending order', () => {
        // Arrange
        const values = [5, 3, 1, 4, 2];
        const expectedResult = [1, 2, 3, 4, 5];

        // Act
        // Assert
        expect(selectionSort(values, 'asc')).toStrictEqual(expectedResult);
    });

    test('sorts in ascending order if order parameter is not set', () => {
        // Arrange
        const values = [5, 3, 1, 4, 2];
        const expectedResult = [1, 2, 3, 4, 5];

        // Act
        // Assert
        expect(selectionSort(values)).toStrictEqual(expectedResult);
    });

    test('sorts in descending order', () => {
        // Arrange
        const values = [5, 3, 1, 4, 2];
        const expectedResult = [5, 4, 3, 2, 1];

        // Act
        // Assert
        expect(selectionSort(values, 'dsc')).toStrictEqual(expectedResult);
    });
});