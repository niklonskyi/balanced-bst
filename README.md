# balanced-bst
This code implements a Binary Search Tree (BST) in JavaScript. 
A BST is a type of binary tree in which the left subtree of a node contains only nodes with keys lesser than the node's 
key, and the right subtree of a node contains only nodes with keys greater than the node's key. 

### Node Class
The Node class represents a single node in a binary search tree. 
It has three properties: `data`, `left`, and `right`.

### Tree Class
The Tree class represents the binary search tree data structure. 
It has the following methods:

* `insertNode`: inserts a new node with the given value into the tree.
* `deleteNode`: deletes the node with the given value from the tree.
* `findNode`: finds the node with the given value in the tree.
* `levelOrder`: performs a level-order traversal of the tree.
* `postorder`: performs a post-order traversal of the tree.
* `inorder`: performs an in-order traversal of the tree.
* `preorder`: performs a pre-order traversal of the tree.
* `height`: returns the height of the tree or of the specified node.
* `depth`: returns the depth of the node with the specified value in the tree.
* `isBalancedView`: returns whether the tree is balanced or not.
* `rebalance`: rebalances the tree.

### buildTree Function
The `buildTree` function builds a binary search tree from an array of values.

## How to use
To use this code, create a new instance of the `Tree` class and call its methods to perform various operations on the binary search tree.

```javascript
const values = [3, 5, 2, 6, 8, 4, 1];
const tree = new Tree(values);

console.log(tree.inorder()); // [1, 2, 3, 4, 5, 6, 8]
console.log(tree.findNode(5)); // { data: 5, left: { data: 4, ...}, right: { data: 6, ...} }
console.log(tree.height()); // 3
```