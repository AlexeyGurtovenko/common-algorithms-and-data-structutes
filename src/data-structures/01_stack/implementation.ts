interface IStack<T> {
    isEmpty: boolean;
    push: (value: T) => void;
    pop: () => T;
    clear: () => void;
    top: () => T;
}

interface IStackException {
    value: any;
    message: string;
    toString: () => string;
}

export class Stack<T> implements IStack<T> {

    private _data: T[] = [];
    private _size: number;

    get isEmpty () {
        return this._data.length === 0;
    }

    constructor(size = 13) {
        this._size = size;
    }

    push(value: T) {
        if (value == null)
            throw new StackNullableException(value);

        if (this._data.length >= this._size && !this.isEmpty)
            throw new StackOverflowException();

        this._data.push(value);
    };

    pop() {
        if (this._size === 0) 
            throw new StackUnderflowException();

        return this._data.pop() as T;
    };

    top() {
        return this._data[this._size - 1];
    };

    clear() {
        this._data = [];
    }
}

class StackException implements IStackException {

    value: any;
    message: string;

    constructor(message: string = 'Stack exception', value: any = null) {
        this.value = value;
        this.message = message;
    }

    toString() {
        return this.message;
    };
}

class StackNullableException extends StackException {
    constructor(value: any) {
        super();
        this.message = `Stack nullable exception. Can not push ${this.value} to the stack.`;
    }
}

class StackOverflowException extends StackException {
    constructor() {
        super();
        this.message = `Stack overflow exception. Can not push ${this.value} on top of the stack.`;
    }
}

class StackUnderflowException extends StackException {
    constructor() {
        super();
        this.message = `Stack underflow exception. Can not pop value from the empty stack.`;
    }
}