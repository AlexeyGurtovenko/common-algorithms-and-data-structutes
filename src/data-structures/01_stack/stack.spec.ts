import { Stack, StackNullableException, StackOverflowException, StackUnderflowException } from "./implementation";

describe('Stack test cases', () => {

    let stack: Stack<number>;

    beforeEach(() => {
        stack = new Stack<number>();
    });

    test('check if stack is empty upon creation', () => {
        expect(stack.isEmpty).toBe(true);
    });

    test('check if push inserts an item at the top of the stack', () => {
        // Arrange
        const testValues = [1, 2, 3, 4, 5];
        const testValuesLength = testValues.length - 1;

        // Act
        testValues.map(num => stack.push(num));

        // Assert
        expect(stack.isEmpty).toBe(false);
        expect(stack.top()).toBe(testValues[testValuesLength]);
    });

    test('check if stack throws Nullable exception when nullable value is pushed', () => {
        // Arrange

        // Act
        const pushNull = () => stack.push(null as any as number);
        const pushUndefined = () => stack.push(undefined as any as number);

        // Assert
        expect(pushNull).toThrow(new StackNullableException());
        expect(pushUndefined).toThrow(new StackNullableException());
    });

    test('check if the stack is full, then it throws an Overflow exception on push', () => {
        // Arrange
        new Array(13).fill(1).map(num => stack.push(num));

        // Act
        const pushOverTheTop = () => stack.push(1);

        // Assert
        expect(pushOverTheTop).toThrow(new StackOverflowException())
    });

    test('check if pop deletes an item from the top of the stack and returns it', () => {
        // Arrange
        const testValues = [1, 2, 3, 4, 5];
        const testValuesLength = testValues.length - 1;
        testValues.map(num => stack.push(num));

        // Act
        const poppedItem = stack.pop();

        // Assert
        expect(stack.top()).toBe(testValues[testValuesLength - 1]);
        expect(poppedItem).toBe(testValues[testValuesLength]);
    });

    test('check if the stack is empty, then it throws an Underflow exception on pop', () => {
        // Arrange

        // Act
        const popFromEmptyStack = () => stack.pop();

        // Assert
        expect(popFromEmptyStack).toThrow(new StackUnderflowException())
    });

    test('check if clear removes all elements from stack', () => {
        // Arrange
        const testValues = [1, 2, 3, 4, 5];
        testValues.map(num => stack.push(num));

        // Act
        stack.clear();

        // Assert
        expect(stack.isEmpty).toBe(true);
    });

    test('check if top returns the top element of the stack without removing it', () => {
        // Arrange
        const testValues = [1, 2, 3, 4, 5];
        const testValuesLength = testValues.length - 1;
        testValues.map(num => stack.push(num));

        // Act

        // Assert
        expect(stack.top()).toBe(testValues[testValuesLength]);
    });

    test('allows to use native javascript Iterator', () => {
        // Arrange
        const testValues = [1, 2, 3, 4, 5];
        const stack1 = new Stack(testValues);         

        // Act
        // Assert
        expect([...stack1]).toStrictEqual(testValues);
    });

    test('holds no more than allowed number of elements', () => {
        // Arrange
        const testValues = Array(20).fill('20');
        const stack1 = new Stack(testValues, 15);         

        // Act
        // Assert
        expect([...stack1].length).toEqual(15);
        expect([...stack1]).toStrictEqual(Array(15).fill('20'));
    });
});
