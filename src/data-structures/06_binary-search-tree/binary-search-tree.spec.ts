import { BinarySearchTree, TraversalOrder } from "./implementation";

const removalTestsCases = [
    {   // #1
        valueToRemove: 21,
        result: [-1, 2, 3, 4, 5, 7, 10],
    },
    {   // #2
        valueToRemove: 2,
        result: [-1, 3, 4, 5, 7, 10],
    },
    {   // #3
        valueToRemove: 4,
        result: [-1, 3, 5, 7, 10],
    },
    {   // #4
        valueToRemove: 5,
        result: [-1, 3, 7, 10],
    },
    {   // #5
        valueToRemove: -1,
        result: [3, 7, 10],
    },
    {   // #6
        valueToRemove: 10,
        result: [3, 7],
    },
    {   // #7
        valueToRemove: 3,
        result: [7],
    },
    {   // #8
        valueToRemove: 7,
        result: [],
    },
] 

describe('Binary search tree test cases', () => {
    test("instantiates properly without any parameters", () => {
        // Arrange
        const BST = new BinarySearchTree<number>();
        const result: number[] = [];
        const callback = (value: number) => result.push(value);
        
        // Act
        BST.traverse(callback, 0);

        // Assert
        expect(BST.root).toBeFalsy();
        expect(BST.contains(4)).toBeFalsy();
        expect(result).toStrictEqual([]);
    });

    test("allows for pre-order traversal", () => {
        // Arrange
        const testValues = [5, 4, 10, 2, 7, 21, -1, 3];
        const BST = new BinarySearchTree(testValues);
        const result: number[] = [];
        const callback = (value: number) => result.push(value);
    
        // Act
        BST.traverse(callback, TraversalOrder.PRE_ORDER);
    
        // Assert
        expect(BST.root).toBeTruthy();
        expect(result).toStrictEqual([5, 4, 2, -1, 3, 10, 7, 21]);
    });

    test("allows for in-order traversal", () => {
        // Arrange
        const testValues = [5, 4, 10, 2, 7, 21, -1, 3];
        const BST = new BinarySearchTree(testValues);
        const result: number[] = [];
        const callback = (value: number) => result.push(value);
    
        // Act
        BST.traverse(callback, TraversalOrder.IN_ORDER);
    
        // Assert
        expect(BST.root).toBeTruthy();
        expect(result).toStrictEqual([-1, 2, 3, 4, 5, 7, 10, 21]);
    });

    test("allows for post-order traversal", () => {
        // Arrange
        const testValues = [5, 4, 10, 2, 7, 21, -1, 3];
        const BST = new BinarySearchTree(testValues);
        const result: number[] = [];
        const callback = (value: number) => result.push(value);
    
        // Act
        BST.traverse(callback, TraversalOrder.POST_ORDER);
    
        // Assert
        expect(BST.root).toBeTruthy();
        expect(result).toStrictEqual([-1, 3, 2, 4, 7, 21, 10, 5]);
    });

    test("allows to check if a value is in the tree", () => {
        // Arrange
        const testValues = [5, 4, 10, 2, 7, 21, -1, 3];
        const BST = new BinarySearchTree(testValues);
        const BST1 = new BinarySearchTree();
    
        // Act
        // Assert
        expect(BST.contains(5)).toBeTruthy();
        expect(BST.contains(-1)).toBeTruthy();
        expect(BST.contains(17)).toBeFalsy();

        expect(BST1.contains(5)).toBeFalsy();
        expect(BST1.contains(17)).toBeFalsy();
    });

    describe('remove test cases', () => {
        const BST = new BinarySearchTree<number>([5, 4, 10, 2, 7, 21, -1, 3]);
        
        removalTestsCases.forEach((item, index) => {

            test(`test case #${index}`, () => {
                // Arrange
                const result: number[] = [];
                const callback = (value: number) => result.push(value);
            
                // Act
                BST.remove(item.valueToRemove);
                BST.traverse(callback, TraversalOrder.IN_ORDER);

                // Assert
                expect(result).toStrictEqual(item.result);
            });
        });

        test('returns null when removing from an empty tree', () => {
            // Arrange
            const BST = new BinarySearchTree<number>([]);

            // Act
            const result = BST.remove(17);

            // Assert
            expect(result).toBe(null);
        });
    });
});