import { SinglyLinkedList } from "../data-structures/02_linked-list";

describe('Singly-linked list test cases', () => {

    test('is empty when initialized without any values', () => {
        // Arrange
        const initializedWithoutParams = new SinglyLinkedList();
        const initializedWithArray = new SinglyLinkedList([]);
        const initializedWithSet = new SinglyLinkedList(new Set([]));
        const initializedWithMap = new SinglyLinkedList(new Map());

        // Act
        // Assert
        expect(initializedWithoutParams.length).toBe(0);
        expect(initializedWithArray.length).toBe(0);
        expect(initializedWithSet.length).toBe(0);
        expect(initializedWithMap.length).toBe(0);

        expect(initializedWithoutParams.isEmpty).toBeTruthy();
        expect(initializedWithArray.isEmpty).toBeTruthy();
        expect(initializedWithSet.isEmpty).toBeTruthy();
        expect(initializedWithMap.isEmpty).toBeTruthy();

        expect([...initializedWithoutParams]).toStrictEqual([]);
        expect([...initializedWithArray]).toStrictEqual([]);
        expect([...initializedWithSet]).toStrictEqual([]);
        expect([...initializedWithMap]).toStrictEqual([]);
    });

    test('has correct length when initialized with parameters', () => {
        // Arrange
        const items = [0, 1, 2];
        
        // Act
        const list = new SinglyLinkedList(items);      

        // Assert
        expect(list.length).toBe(items.length);
    });

    test('allows to use native javascript Iterator', () => {
        // Arrange
        const items = [0, 1, 2];
        
        // Act
        const list1 = new SinglyLinkedList(items);           
        const list2 = new SinglyLinkedList([]);           

        // Assert
        expect([...list1]).toStrictEqual(items);
        expect([...list2]).toStrictEqual([]);
    });

    test('allows to remove all elements at once', () => {
        // Arrange
        const items = [0, 1, 2];
        const list1 = new SinglyLinkedList(items);           
        const list2 = new SinglyLinkedList([]);           
        
        // Act
        list1.clear();
        list2.clear();

        // Assert
        expect(list1.length).toEqual(0);
        expect(list1.isEmpty).toBeTruthy();
        expect(list1.peekFirst()).toBeNull();
        expect(list1.peekLast()).toBeNull();
        expect([...list1]).toEqual([]);
        
        expect(list2.length).toEqual(0);
        expect(list2.isEmpty).toBeTruthy();
        expect(list2.peekFirst()).toBeNull();
        expect(list2.peekLast()).toBeNull();
        expect([...list2]).toEqual([]);
    });

    test('returns the index of the first occurrence of a value in a list, or -1 if it is not present', () => {
        // Arrange
        const items = [0, 1, 2];
        
        // Act
        const list = new SinglyLinkedList(items); 

        // Assert
        expect(list.indexOf(1)).toEqual(1);
        expect(list.indexOf(4)).toEqual(-1);
    });

    test('determines whether a list includes a certain element, returning true or false as appropriate', () => {
        // Arrange
        const items = ['a', 'b', 'c'];
        
        // Act
        const list = new SinglyLinkedList(items); 

        // Assert
        expect(list.contains('a')).toBeTruthy();
        expect(list.contains('e')).toBeFalsy();
    });

    test('inserts an element at the start of a list, and returns the new length of the list', () => {
        // Arrange
        const items = ['a', 'b', 'c'];
        const list1 = new SinglyLinkedList(items); 
        const list2 = new SinglyLinkedList(); 
        
        // Act
        list1.addFirst('d');
        list2.addFirst('aabbcc');

        // Assert
        expect(list1.contains('d')).toBeTruthy();
        expect(list1.length).toBe(items.length + 1);
        expect([...list1]).toStrictEqual(['d', ...items]);

        expect(list2.contains('aabbcc')).toBeTruthy();
        expect(list2.length).toBe(1);
        expect([...list2]).toStrictEqual(['aabbcc']);
    });

    test('appends an element to the end of a list, and returns the new length of the list', () => {
        // Arrange
        const items = ['a', 'b', 'c'];
        const list1 = new SinglyLinkedList(items); 
        const list2 = new SinglyLinkedList(); 
        
        // Act
        list1.addLast('d');
        list2.addLast('aabbcc');

        // Assert
        expect(list1.contains('d')).toBeTruthy();
        expect(list1.length).toBe(items.length + 1);
        expect([...list1]).toStrictEqual([...items, 'd']);

        expect(list2.contains('aabbcc')).toBeTruthy();
        expect(list2.length).toBe(1);
        expect([...list2]).toStrictEqual(['aabbcc']);
    });

    test('returns the first element of a list', () => {
        // Arrange
        const items = ['a', 'b', 'c'];
        const list1 = new SinglyLinkedList(items); 
        const list2 = new SinglyLinkedList(); 
        
        // Act
        // Assert
        expect(list1.peekFirst()).toBe('a');
        expect(list2.peekFirst()).toBeNull();
    });

    test('returns the last element of a list', () => {
        // Arrange
        const items = ['a', 'b', 'c'];
        const list1 = new SinglyLinkedList(items); 
        const list2 = new SinglyLinkedList(); 
        
        // Act
        // Assert
        expect(list1.peekLast()).toBe('c');
        expect(list2.peekLast()).toBeNull();
    });

    test('removes the first element from a list and returns it, if the list is empty, null is returned', () => {
        // Arrange
        const items = ['a', 'b', 'c'];
        const list1 = new SinglyLinkedList(items); 
        const list2 = new SinglyLinkedList(); 
        
        // Act
        // Assert
        expect(list1.removeFirst()).toBe('a');
        expect(list1.length).toBe(items.length - 1);
        expect([...list1]).toStrictEqual(['b', 'c']);
        
        expect(list2.removeFirst()).toBeNull();
        expect(list2.length).toBe(0);
        expect([...list2]).toStrictEqual([]);
    });

    test('removes the last element from a list and returns it, if the list is empty, null is returned', () => {
        // Arrange
        const items = ['a', 'b', 'c'];
        const list1 = new SinglyLinkedList(items); 
        const list2 = new SinglyLinkedList(); 
        
        // Act
        // Assert
        expect(list1.removeLast()).toBe('c');
        expect(list1.length).toBe(items.length - 1);
        expect([...list1]).toStrictEqual(['a', 'b']);

        expect(list2.removeLast()).toBeNull();
        expect(list2.length).toBe(0);
        expect([...list2]).toStrictEqual([]);
    });
    
    describe('add method test cases', () => {
        test('inserts an element to an empty list with out of bounds index value, and returns the new length of the list', () => {
            // Arrange
            const list1 = new SinglyLinkedList(); 
            const list2 = new SinglyLinkedList(); 
            
            // Act
            // Assert
            expect(list1.add('1', -8)).toBe(1);
            expect(list1.length).toBe(1);
            expect(list1.peekFirst()).toBe('1');
            expect(list1.peekLast()).toBe('1');
            
            expect(list2.add('2', 2)).toBe(1);
            expect(list2.length).toBe(1);
            expect(list2.peekFirst()).toBe('2');
            expect(list2.peekLast()).toBe('2');
        });

        test('inserts an element to the end of a list, and returns the new length of the list', () => {
            // Arrange
            const list1 = new SinglyLinkedList(['a', 'b', 'c']); 
            const list2 = new SinglyLinkedList(); 
            
            // Act
            list1.add('d', 3);
            list2.add('zero', 0);

            // Assert
            expect(list1.length).toBe(4);
            expect(list1.peekLast()).toBe('d');
            expect([...list1]).toStrictEqual(['a', 'b', 'c', 'd']);
            
            expect(list2.length).toBe(1);
            expect(list2.peekLast()).toBe('zero');
        });

        test('inserts an element at the specified position of a list, and returns the new length of the list', () => {
            // Arrange
            const list1 = new SinglyLinkedList(['a', 'b', 'd']); 
            const list2 = new SinglyLinkedList([0, 1, 2, 3, 4, 5]); 
            
            // Act
            list1.add('c', 2);
            list2.add(3.5, 4);

            // Assert
            expect(list1.length).toBe(4);
            expect([...list1]).toStrictEqual(['a', 'b', 'c', 'd']);
            
            expect(list2.length).toBe(7);
            expect([...list2]).toStrictEqual([0, 1, 2, 3, 3.5, 4, 5]);
        });
    });

    describe('removeAt method test cases', () => {
        test('returns null when index value is invalid', () => {
            // Arrange
            const list1 = new SinglyLinkedList([]); 
            
            // Act
            // Assert
            expect(list1.removeAt(-5)).toBeNull();
            expect(list1.removeAt(5)).toBeNull();
            expect(list1.removeAt(0)).toBeNull();
        });

        test('removes first element from the list', () => {
            // Arrange
            const list1 = new SinglyLinkedList([0, 1, 2]); 
            
            // Act
            // Assert
            expect(list1.removeAt(0)).toBe(0);
            expect(list1.length).toBe(2);
            expect([...list1]).toStrictEqual([1, 2]);
        });

        test('removes last element from the list', () => {
            // Arrange
            const list1 = new SinglyLinkedList([0, 1, 2]); 
            
            // Act
            // Assert
            expect(list1.removeAt(2)).toBe(2);
            expect(list1.length).toBe(2);
            expect([...list1]).toStrictEqual([0, 1]);
        });

        test('removes an element from the list', () => {
            // Arrange
            const list1 = new SinglyLinkedList([0, 1, 2, 4]); 
            
            // Act
            // Assert
            expect(list1.removeAt(2)).toBe(2);
            expect(list1.length).toBe(3);
            expect([...list1]).toStrictEqual([0, 1, 4]);
        });
    });
});