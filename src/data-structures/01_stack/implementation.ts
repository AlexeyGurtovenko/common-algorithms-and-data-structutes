export interface IStack<T> {
    isEmpty: boolean;
    push: (value: T) => void;
    pop: () => T;
    clear: () => void;
    top: () => T;
}

export interface IStackException extends Error {
    value: any;
    message: string;
    toString: () => string;
}

export class Stack<T> implements IStack<T> {

    private _data: T[] = [];
    private _maxSize: number;

    get isEmpty () {
        return this._data.length === 0;
    }

    constructor(size = 13) {
        this._maxSize = size;
    }

    push(value: T) {
        if (value == null)
            throw new StackNullableException();

        if (this._data.length >= this._maxSize && !this.isEmpty)
            throw new StackOverflowException();

        this._data.push(value);
    };

    pop() {
        if (this._data.length === 0) 
            throw new StackUnderflowException();

        return this._data.pop() as T;
    };

    top() {
        return this._data[this._data.length - 1];
    };

    clear() {
        this._data = [];
    }
}

export class StackException implements IStackException {

    value: any;
    name: string = '';
    message: string;

    constructor(message: string = 'Stack exception', value: any = null) {
        this.value = value;
        this.message = message;
    }

    toString() {
        return this.message;
    };
}

export class StackNullableException extends StackException {
    constructor() {
        super();
        this.message = `Stack nullable exception. Can not push ${this.value} to the stack.`;
    }
}

export class StackOverflowException extends StackException {
    constructor() {
        super();
        this.message = `Stack overflow exception. Can not push ${this.value} on top of the stack.`;
    }
}

export class StackUnderflowException extends StackException {
    constructor() {
        super();
        this.message = `Stack underflow exception. Can not pop value from the empty stack.`;
    }
}