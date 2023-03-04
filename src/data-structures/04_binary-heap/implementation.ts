export interface IMinBinaryHeap<T> {
    size: number;
    isEmpty: boolean;

    insert: (data: T) => number;
    removeMin: () => T | null;
    clear: () => void;
}

export class MinBinaryHeap<T> implements IMinBinaryHeap<T>, Iterable<T> {

    private _data: T[] = [];

    constructor(values?: Iterable<T>) {
        if (!values)
            return;

        [...values].forEach(value => this.insert(value));
    }

    get size(): number {
        return this._data.length;
    }

    get isEmpty(): boolean {
        return this.size === 0;
    }

    /**
     * Inserts the provided value to the heap.
     * @param value value to insert into the heap.
     */
    insert(value: T): number {
        if (this.isEmpty) {
            return this._data.push(value);
        }

        this._data.push(value);
        this._heapifyUp();

        return this.size;
    };
    
    /**
     * Removes the smallest value from the heap and returns it.
     */
    removeMin(): T | null {
        if (this.isEmpty) {
            return null;
        }

        if (this.size === 1) {
            return this._data.pop() as T;
        }

        this._swap(0, this.size - 1);
        const value = this._data.pop();
        this._heapifyDown();

        return value as T;
    };

    /**
     * Removes all elements from the heap at once.
     */
    clear() {
        this._data = [];
    };

    private _getParentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }

    private _hasParent(childIndex: number): boolean {
        return this._getParentIndex(childIndex) >= 0;
    }

    private _gelLeftChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 1;
    }

    private _hasLeftChild(parentIndex: number): boolean {
        return this._gelLeftChildIndex(parentIndex) <= this._data.length - 1;
    }

    private _hasRightChild(parentIndex: number): boolean {
        return this._gelRightChildIndex(parentIndex) <= this._data.length - 1;
    }

    private _gelRightChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 2;
    }

    private _swap(lhsNodeIndex: number, rhsNodeIndex: number) {
        const temp = this._data[lhsNodeIndex];
        this._data[lhsNodeIndex] = this._data[rhsNodeIndex];
        this._data[rhsNodeIndex] = temp;
    }

    private _heapifyUp() {
        let index = this._data.length - 1;

        while (
            this._hasParent(index) 
            && this._data[index] < this._data[this._getParentIndex(index)]
        ) {
            const parentIndex = this._getParentIndex(index);
            this._swap(index, parentIndex);
            index = parentIndex;
        }
    }

    private _heapifyDown() {
        let index = 0;

        while (this._hasLeftChild(index)) {
            let swapChildIndex = 0;
            const leftChildIndex = this._gelLeftChildIndex(index);
            const rightChildIndex = this._gelRightChildIndex(index);
            
            if (this._hasRightChild(index)) {
                swapChildIndex = this._data[leftChildIndex] < this._data[rightChildIndex] 
                                    ? leftChildIndex 
                                    : rightChildIndex;
            } else {
                swapChildIndex = leftChildIndex;
            }

            if (this._data[index] < this._data[swapChildIndex]) {
                break;
            }
            
            this._swap(index, swapChildIndex);
            index = swapChildIndex;
        }
    }

    [Symbol.iterator]() {
        return this._data.values();
    }
}