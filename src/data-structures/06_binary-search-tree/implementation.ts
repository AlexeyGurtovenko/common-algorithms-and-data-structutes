export interface ITreeNode<T> {
    data: T;
    left: ITreeNode<T> | null;
    right: ITreeNode<T> | null;
}

export class TreeNode<T> implements ITreeNode<T> {
    data: T;
    left: ITreeNode<T> | null = null;
    right: ITreeNode<T> | null = null;

    constructor(data: T, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

export const enum TraversalOrder {
    PRE_ORDER,
    IN_ORDER,
    POST_ORDER
};

export interface IBinarySearchTree<T> {
    root: ITreeNode<T> | null;
    height: number;
    
    insert: (value: T) => ITreeNode<T>;
    remove: (value: T) => ITreeNode<T> | null;
    contains: (value: T) => boolean;
    traverse: (callback: (value: T) => void, order: TraversalOrder) => void; 
}

export class BinarySearchTree<T> implements IBinarySearchTree<T> {

    root: ITreeNode<T> | null = null;

    constructor(values?: Iterable<T>) {
        if (!values)
            return;

        [...values].forEach(value => this.insert(value));
    }

    get height(): number {
        if (this.root) {
            return this.getHeight(this.root);
        }

        return -1;
    }

    getHeight(node: ITreeNode<T> | null): number {
        if (node == null) {
            return -1;
        }

        const leftSubtreeHeight = this.getHeight(node.left);
        const rightSubtreeHeight = this.getHeight(node.right);

        return Math.max(leftSubtreeHeight, rightSubtreeHeight) + 1;
    }

    /**
     * Inserts the value into the tree.
     * @param value value to insert.
     * @returns root node of the tree.
     */
    insert(value: T): ITreeNode<T> {
        if (this.root) {
            this._insert(value, this.root);
        } else {
            this.root = new TreeNode(value, null, null);
        }

        return this.root;
    }

    private _insert(data: T, node: ITreeNode<T>) {
        if (data > node.data) {
            if (node.right) {
                this._insert(data, node.right);
            } else {
                node.right = new TreeNode(data, null, null);
            }
        } else if (data < node.data) {
            if (node.left) {
                this._insert(data, node.left);
            } else {
                node.left = new TreeNode(data, null, null);
            }
        };
    }

    /**
     * Determines whether the tree includes a certain element, returning `true` or `false` as appropriate.
     * @param value The element to search for.
     */
    contains(value: T): boolean {
        if (this.root) {
            return this._contains(value, this.root);
        } else {
            return false;
        }
    }

    private _contains(data: T, node: ITreeNode<T>): boolean {
        if (data === node.data) {
            return true;
        } else if (data > node.data && node.right) {
            return this._contains(data, node.right);
        } else if (data < node.data && node.left) {
            return this._contains(data, node.left);
        }
        return false;
    }

    /**
     * Performs the specified action for each element in the tree.
     * @param callback A function that accepts current node value as an argument. traverse calls the `callback` function one time for each element in the tree.
     * @param order Type of traversal order, `in order` by default.
     */
    traverse(callback: (value: T) => void, order: TraversalOrder) {
        if (!this.root) {
            return;
        }

        switch (order) {
            case TraversalOrder.PRE_ORDER:
                return this._preOrderTraversal(callback, this.root);
            case TraversalOrder.IN_ORDER:
                return this._inOrderTraversal(callback, this.root);
            case TraversalOrder.POST_ORDER:
                return this._postOrderTraversal(callback, this.root);
            default:
                return this._inOrderTraversal(callback, this.root);
        }
    };

    private _inOrderTraversal(callback: (value: T) => void, node: ITreeNode<T> | null) {
        if (node) {
            this._inOrderTraversal(callback, node.left);
            callback(node.data);
            this._inOrderTraversal(callback, node.right);
        }
    }

    private _preOrderTraversal(callback: (value: T) => void, node: ITreeNode<T> | null) {
        if (node) {
            callback(node.data);
            this._preOrderTraversal(callback, node.left);
            this._preOrderTraversal(callback, node.right);
        }
    }

    private _postOrderTraversal(callback: (value: T) => void, node: ITreeNode<T> | null) {
        if (node) {
            this._postOrderTraversal(callback, node.left);
            this._postOrderTraversal(callback, node.right);
            callback(node.data);
        }
    }

    /**
     * Removes specified value from the tree. Returns `true` if removal was successful, `false` otherwise.
     * @param value value to remove from the tree.
     * @returns root node of the tree. 
     */
    remove(value: T): ITreeNode<T> | null {
        if (this.root) {
            this.root = this._remove(value, this.root);
        }

        return this.root;
    }

    private _remove(data: T, node: ITreeNode<T>): ITreeNode<T> | null {
        if (data > node.data && node.right) {
            node.right = this._remove(data, node.right);
        } else if (data < node.data && node.left) {
            node.left = this._remove(data, node.left);
        } else {
            if (data === node.data) {
                if (node.left && node.right) {
                    const maxValue = this._findMaxValue(node.left);
                    node.data = maxValue;
                    node.left = this._remove(maxValue, node.left);
                } else if (node.left) {
                    return node.left;
                } else if (node.right) {
                    return node.right;
                } else {
                    return null;
                }
            }
        }
        return node;
    }

    private _findMaxValue(node: ITreeNode<T>): T {
        if (node?.right) {
            return this._findMaxValue(node.right);
        }
        return node.data;
    }
}