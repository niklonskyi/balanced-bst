function Node(data, left = null, right = null) {
    return {
        data,
        left,
        right,
    }
}

function Tree(array) {
    let root = buildTree(array);
    return {
        root,
        insertNode,
        deleteNode,
        findNode,
        levelOrder,
        postorder,
        inorder,
        preorder,
    }

    function deleteNode(value, root = this.root) {
        if (root == null) {
            return root;
        }

        if (value < root.data) {
            root.left = deleteNode(value, root.left);
        }

        else if (value > root.data) {
            root.right = deleteNode(value, root.right);
        }

        else {
            if (root.left == null)
                return root.right;
            else if (root.right == null)
                return root.left;

            // node with two children: Get the inorder
            // successor (smallest in the right subtree)
            root.data = minValue(root.right);

            // Delete the inorder successor
            root.right = deleteNode(root.data, root.right);
        }

        return root;
    }

    function minValue(root)
    {
        let minv = root.data;
        while (root.left != null)
        {
            minv = root.left.data;
            root = root.left;
        }
        return minv;
    }

    function insertNode(value, root = this.root) {
        if (root == null) {
            root = Node(value);
            return root;
        }

        if (value < root.data) {
            root.left = insertNode(value, root.left);
        }
        else if (value > root.data) {
            root.right = insertNode(value, root.right);
        }

        return root;
    }

    function findNode(value, root = this.root) {
        if (root == null) {
            return root;
        }

        if (value < root.data) {
            findNode(value, root.left);
        }
        else if (value > root.data) {
            findNode(value, root.right);
        }
        else {
            console.log(root);
        }
    }

    function levelOrder(callback) {
        const queue = [];
        const levelOrderList = []

        if (root == null) {
            return root;
        }

        queue.push(root);

        while (queue.length !== 0) {
            const node = queue.shift();

            callback ? callback(node) : levelOrderList.push(node.data);

            if (node.left !== null) {
                queue.push(node.left);
            }

            if (node.right !== null) {
                queue.push(node.right);
            }
        }

        return levelOrderList;
    }

    function postorder(callback, root = this.root, postOrderList = []) {
        if (root == null) {
            return root;
        }

        postorder(callback, root.left, postOrderList);
        postorder(callback, root.right, postOrderList);

        callback ? callback(root.data) : postOrderList.push(root.data)
        return postOrderList;
    }

    function inorder(callback, root = this.root, inOrderList = []) {
        if (root == null) {
            return root;
        }

        inorder(callback, root.left, inOrderList);
        callback ? callback(root.data) : inOrderList.push(root.data)
        inorder(callback, root.right, inOrderList);

        return inOrderList;
    }

    function preorder(callback, root = this.root, preOrderList = []) {
        if (root == null) {
            return root;
        }

        callback ? callback(root.data) : preOrderList.push(root.data)
        preorder(callback, root.left, preOrderList);
        preorder(callback, root.right, preOrderList);

        return preOrderList;
    }

}

function buildTree(array) {
    if (array.length <= 0 ) {
        return null;
    }

    if (array.length === 1) {
        return Node(array[0]);
    }

        const base = Math.floor(array.length / 2);
        const left = buildTree(array.slice(0, base));
        const right = buildTree(array.slice(base+1));

        return Node(array[base], left, right)
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

const array = [10, 11, 17, 19, 30, 31, 37, 38, 101, 103];
const tree = Tree(array);
prettyPrint(tree.root)
console.log(tree.levelOrder());
console.log(tree.postorder())
console.log(tree.inorder())
console.log(tree.preorder())


// let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// array.sort();
// let uniq = [...new Set(array)];