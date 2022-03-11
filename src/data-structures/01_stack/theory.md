## Theory

Stack is a data structure where you can only insert or delete items from the top of the stack. It is similar to a stack of books. If you want to look at a book in the middle of the stack you must take all of the books above it off first.

The stack is considered LIFO (Last In First Out) - meaning the last item you put in the stack is the first item that comes out of the stack.

There are a few operations that can be performed on a stack:

- **push()**: inserts an item at the top of the stack
  - if the stack is full, then it is said to be an Overflow condition
- **pop()**: deletes an item from the top of the stack (and returns it)
  - if the stack is empty, then it is said to be an Underflow condition
- **clear()**: removes all elements from the stack
- **pip()**: returns all elements of the stack
- **peek() or top()**: returns the top element of the stack without removing it (this could be done with a "pop" followed by a "push")
- **isEmpty**: returns true if the stack is empty, else false
- **contains(element)**: returns true if the element presents in the stack. Otherwise, returns false.

The push and pop operations occur only at one end of the structure, referred to as _top_ of the stack.

It is allowed to store duplicate elements in a Stack.

A Stack accepts null as a valid value.

### Time complexities of operations on stack

push(), pop(), isEmpty(), peek() all take O(1) time, so constant time. There are no loops to run in any of these operations.

contains() method takes O(n) time to check if the element exists in the stack.

### Implementation

There are 2 ways to implement a Stack (what defines the data structure as a stack, in either case, is not implementation but the interface):

- using array
- using linked list

## Common usecases of the Stack data structure

- [balancing of symbols](https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/)
- Redo-undo features in programms like editors, photoshop, browsers
- String reversal is also another application of stack. Here one by one each character gets inserted into the stack. So the first character of the string is on the bottom of the stack and the last element of a string is on the top of the stack. After Performing the pop operations on the stack we get a string in reverse order. **The application is not limited to strings, we can basicly reverse any collection of elements with the use of a stack**

## Usefull links

[1](https://www.freecodecamp.org/news/10-common-data-structures-explained-with-videos-exercises-aaff6c06fb2b) [2](https://www.geeksforgeeks.org/stack-data-structure/#:~:text=Stack%20is%20a%20linear%20data,which%20the%20operations%20are%20performed.&text=The%20plate%20which%20is%20at,the%20longest%20period%20of%20time.) [3](https://www.geeksforgeeks.org/c-sharp-stack-with-examples/) [4](https://www.geeksforgeeks.org/stack-data-structure-introduction-program/) [5](https://en.wikipedia.org/wiki/Stack_%28abstract_data_type%29#Problem_Description)
