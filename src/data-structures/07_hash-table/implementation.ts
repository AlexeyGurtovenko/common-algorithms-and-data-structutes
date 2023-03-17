import { SinglyLinkedList } from "../02_singly-linked-list/implementation";

class ListNodeData<K, V> {
    key: K;
    value: V;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }
}

export interface IHashTable<K extends string, V> {
    size: number;
    get: (key: K) => V | undefined;
    has: (key: K) => boolean;
    set: (key: K, value: V) => HashTable<K, V>;
    delete: (key: K) => boolean;
    clear: () => void;
}

export class HashTable<K extends string, V> implements IHashTable<K, V> {

    private _size = 0;
    private _store: SinglyLinkedList<ListNodeData<K, V>>[] = [];
    private readonly _maxCap: number | null = null;

    get size(): number {
        return this._size;
    }

    private set size(value: number) {
        if (value < 0) 
            this._size =  0;
        
        this._size = value;
    }

    /**
     * Primitive hash function that transforms `key` parameter to a number.
     * @param key value to hash.
     */
    hash(key: K): number {
        let hash = 0;

        for (let i = 0; i < key.length; i++) {
            hash = ((hash << 5) - hash) + key.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }

        return this._maxCap ? hash % this._maxCap : hash;
    }

    constructor(maxCap: number | null = null) {
        this._maxCap = maxCap;
    }

    /**
     * Returns an element with the specified key from the hash table.
     * @returns an element associated with the specified key. If no element is associated with the specified key, `undefined` is returned.
     */
    get(key: K): V | undefined {
        const hash = this.hash(key);

        return this._store[hash]?.find((data) => data.key === key)?.value;
    }

    /**
     * @returns boolean indicating whether an element with the specified key exists.
     */
    has(key: K): boolean {
        const hash = this.hash(key);
        const existingElement = this._store[hash]?.find((data) => data.key === key);
        
        return existingElement != null;
    }

    /**
     * Adds a new element with a specified key and value to the hash table. If an element with the same key already exists, the element will be updated. 
     */
    set(key: K, value: V): HashTable<K, V> {
        const hash = this.hash(key);

        if (this._store[hash] == null) {
            this._store[hash] = new SinglyLinkedList([new ListNodeData(key, value)]);
            this.size = this.size + 1;
        } else {
            const valueExists = this._store[hash].find((data) => data.key === key);
    
            if (!valueExists) {
                this._store[hash].addLast(new ListNodeData(key, value)); 
                this.size = this.size + 1;
            } else {
                // TODO: update
            }

        }

        return this;
    }

    /**
     * Removes an new element with a specified key.
     * @returns `true` if removal was successful, `false` otherwise.
     */
    delete(key: K): boolean {
        const hash = this.hash(key);

        const elementIndex = this._store[hash]?.findIndex((data) => data.key === key);

        if (!!(elementIndex > -1 && this._store[hash].removeAt(elementIndex))) {
            this.size = this.size - 1;
            return true;
        }

        return false;
    }   

    /**
     * Removes all elements from the hash table at once.
     */
    clear() {
        this._store = [];
        this.size = 0;
    };
}

