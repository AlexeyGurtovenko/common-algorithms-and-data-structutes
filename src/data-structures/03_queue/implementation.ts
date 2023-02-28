import { SinglyLinkedList } from "../02_singly-linked-list/implementation";

export interface IQueue<T> {
    size: number;
    isEmpty: boolean;
    enqueue: (item: T) => number;
    dequeue: () => T;
    clear: () => void;
}

export class Queue<T> implements IQueue<T>, Iterable<T> {

    private _data = new SinglyLinkedList<T>();
    private _maxSize = 0;

    get size(): number {
        return this._data.length;
    }

    get isEmpty(): boolean {
        return this.size === 0;
    }

    constructor(items?: Iterable<T>, maxSize = 13) {
        this._maxSize = maxSize;

        if (!items)
            return;

        [...items]
            .slice(0, this._maxSize)
            .forEach(item => this.enqueue(item));
    }

    /**
     * Inserts an element at the end of a queue.
     * @param item Item to place in a queue.
     * @returns new size of a queue.
     */
    enqueue(item: T): number {
        if (this._data.length >= this._maxSize) {
            throw new QueueFullException<T>();
        }

        return this._data?.addLast(item);
    }

    /**
     * Removes an element from the start of a queue.
     * @returns an element removed from a queue.
     */
    dequeue(): T {
        if (this._data.length === 0) {
            throw new QueueEmptyException<T>();
        }

        return this._data.removeFirst() as T;
    }

    /**
     * Removes all elements from a queue.
     */
    clear() {
        this._data.clear();
    };

    // @ts-ignore
    [Symbol.iterator]() {
        return this._data[Symbol.iterator]();
    }
}


export interface IQueueException<T> extends Error {
    value: T | null;
    message: string;
    toString: () => string;
}

export class QueueException<T> implements IQueueException<T> {

    value: T | null;
    name = '';
    message = '';

    constructor(message = 'Queue exception', value = null) {
        this.value = value;
        this.message = message;
    }

    toString() {
        return this.message;
    };
}

export class QueueEmptyException<T> extends QueueException<T> {
    constructor() {
        super();
        this.message = 'Empty. Can not dequeue from an empty queue!';
    }
}

export class QueueFullException<T> extends QueueException<T> {
    constructor() {
        super();
        this.message = 'Busy. Can not enqueue to a full queue!';
    }
}