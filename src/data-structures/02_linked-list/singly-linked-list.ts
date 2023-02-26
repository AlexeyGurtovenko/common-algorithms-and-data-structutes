interface INode<T> {
    data: T | null;
    next: INode<T> | null;
}

class ListNode<T> implements INode<T> {

    public data: T | null = null;
    public next: INode<T> | null = null;

    constructor(data: T, nextNode: INode<T> | null) {
        this.data = data ?? null;
        this.next = nextNode ?? null;
    }
}

export interface ISinglyLinkedList<T> {
    length: number;
    isEmpty: boolean;
    
    clear: () => void;

    indexOf: (data: T) => number;
    contains: (data: T) => boolean;

    add: (data: T, index: number) => number;
    addFirst: (data: T) => number;
    addLast: (data: T) => number;

    peekFirst: () => T | null;
    peekLast: () => T | null;

    removeFirst: () => T | null;
    removeLast: () => T | null;
    removeAt: (index: number) => T | null;
}

export class SinglyLinkedList<T> implements ISinglyLinkedList<T>, Iterable<T> {
    private _length = 0;
    private _head: ListNode<T> | null = null;
    private _tail: ListNode<T> | null = null;

    constructor(items?: Iterable<T>) {
        if (!items) 
            return;
        
        for (const item of items) {
            this.addLast(item);                        
        }
    }

    get length(): number {
        return this._length;
    }

    get isEmpty(): boolean {
        return this._length === 0;
    }

    /**
     * Removes all elements from the list.
     */
    clear() {
        if (this.isEmpty) {
            return;
        }

        let prevNode = null;
        let currentNode = this._head;

        do {
            prevNode = currentNode;
            currentNode = currentNode?.next ?? null;
            prevNode!.next = null;
        } while (currentNode != null);

        this._head = null;
        this._tail = null;
        this._length = 0;
    };

    /**
     * Returns the index of the first occurrence of a value in a list, or -1 if it is not present.
     * @param data The value to locate in the list.
     */
    indexOf(searchElement: T): number {
        if (this.isEmpty) {
            return -1;
        }

        let index = 0;
        let currentNode = this._head;

        do {
            if (currentNode?.data === searchElement) {
                return index;
            }

            currentNode = currentNode?.next ?? null;
            index++;

        } while (currentNode != null);

        return -1;
    };

    /**
     * Determines whether a list includes a certain element, returning true or false as appropriate.
     * @param data The element to search for.
     */
    contains(searchElement: T): boolean {
        return this.indexOf(searchElement) > -1;
    }

    /**
     * Inserts an element at the specified position of a list, and returns the new length of the list.
     * @param data Element to insert at the specified position of the list.
     * @param index Position to insert the element at (zero based).
     */
    add(data: T, index: number): number {
        if (index <= 0) {
            return this.addFirst(data);
        }

        if (index > this.length - 1) {
            return this.addLast(data);
        }

        let idx = 0;
        let currentNode = this._head;

        while (idx < index - 1) {
            currentNode = currentNode?.next ?? null;
            idx++;
        }

        currentNode!.next = new ListNode(data, currentNode?.next ?? null);

        this._length++;
        return this.length;
    };

    /**
     * Inserts an element at the start of a list, and returns the new length of the list.
     * @param data Element to insert at the start of the list.
     */
    addFirst(data: T): number {
        if (this.isEmpty) {
            this._head = new ListNode(data, null);
            this._tail = this._head;
        } else {
            this._head = new ListNode(data, this._head);
        }

        this._length++;
        return this.length; 
    }

    /**
     * Appends an element to the end of a list, and returns the new length of the list.
     * @param data New element to add to the list.
     */
    addLast(data: T): number {
        if (this.isEmpty) {
            this._head = new ListNode(data, null);
            this._tail = this._head;
        } else {
            let currentNode = this._head;

            while (currentNode?.next != null) {
                currentNode = currentNode.next;
            }

            currentNode!.next = new ListNode(data, null);
            this._tail = currentNode!.next;
        }

        this._length++;
        return this.length; 
    }

    /**
     * Returns the first element of a list.
     */
    peekFirst(): T | null {
        return this._head?.data ?? null;
    };

    /**
     * Returns the last element of a list.
     */
    peekLast(): T | null {
        return this._tail?.data ?? null;
    };

    /**
     * Removes an element with the specified index from a list and returns it, `null` is returned if the list is not modified.
     * @param index Position to remove the element at (zero based).
     */
    removeAt(index: number): T | null {
        if (index < 0 || index >= this.length || this.isEmpty) {
            return null;
        }

        if (index === 0) {
            return this.removeFirst();
        }
        
        if (index === this.length - 1) {
            return this.removeLast();
        }

        let idx = 0;
        let prevNode = null; 
        let currentNode = this._head;

        while (idx < index) {
            prevNode = currentNode;
            currentNode = currentNode?.next ?? null;
            idx++;
        }

        prevNode!.next = currentNode?.next ?? null;

        this._length--;
        return currentNode?.data ?? null;
    }

    /**
     * Removes the first element from a list and returns it. 
     * If the list is empty, `null` is returned and the list is not modified.
     */
    removeFirst(): T | null {
        if (this.isEmpty) {
            return null;
        };

        const detachedHead = this._head;
        this._head = this._head?.next ?? null;
        detachedHead!.next = null;

        this._length = this._length > 0 ? --this._length : 0;

        return detachedHead?.data ?? null;
    }

    /**
     * Removes the last element from a list and returns it. 
     * If the list is empty, `null` is returned and the list is not modified.
     */
    removeLast(): T | null {
        if (this.isEmpty) {
            return null;
        };

        let currentNode = this._head;

        while (currentNode?.next?.next != null) {
            currentNode = currentNode.next;
        }

        const detachedTail = this._tail;
        currentNode!.next = null;
        this._tail = currentNode;
        this._length = this._length > 0 ? --this._length : 0;

        return detachedTail?.data ?? null;
    }

    // @ts-ignore
    [Symbol.iterator]() {
        return {
            current: this._head,

            next() {
                if (this.current == null) {
                    return { done: true };
                }

                const value = this.current.data;
                this.current = this.current.next;
                return { done: false, value };
            }
        }
    }
}
