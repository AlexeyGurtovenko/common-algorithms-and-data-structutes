import { IQueue, QueueEmptyException, QueueFullException } from "../03_queue/implementation";
import { MinBinaryHeap } from "../04_binary-heap/implementation";

export class PriorityQueue<T> implements IQueue<T>, Iterable<T> {
    private _data = new MinBinaryHeap<T>();
    private _maxSize = 0;

    get size(): number {
        return this._data.size;
    }

    get isEmpty(): boolean {
        return this.size === 0;
    }

    constructor(items?: Iterable<T>, maxSize = 32) {
        this._maxSize = maxSize;

        if (!items)
            return;

        [...items]
            .slice(0, this._maxSize)
            .forEach(item => this.enqueue(item));
    }

    /**
     * Inserts an element at the end of the queue.
     * @param item Item to place in the queue.
     * @returns new size of the queue.
     */
    enqueue(item: T): number {
        if (this.size >= this._maxSize) {
            throw new QueueFullException<T>();
        }

        return this._data.insert(item);
    }

    /**
     * Removes an element with the highest priority (i.e. the smallest value) from the queue.
     * @returns an element removed from the queue.
     */
    dequeue(): T {
        if (this.size === 0) {
            throw new QueueEmptyException<T>();
        }

        return this._data.removeMin() as T;
    }

    /**
     * Removes all elements from the queue at once.
     */
    clear() {
        this._data.clear();
    };

    // @ts-ignore
    [Symbol.iterator]() {
        return this._data[Symbol.iterator]();
    }
}