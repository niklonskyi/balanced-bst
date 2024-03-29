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
        height,
        depth,
        isBalancedView,
        rebalance,
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
            return null;
        }

        if (value < root.data) {
            return findNode(value, root.left);
        }
        else if (value > root.data) {
            return findNode(value, root.right);
        }
        else {
            return root;
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

    function height(node) {
        if (!(typeof node === 'object')){
            node = findNode(node, tree.root);
            if (!node) {
                return null;
            }
        }

        if (node === null) return 0;

        const leftHeight = height(node.left);
        const rightHeight = height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    function depth(value, root = this.root, depth = 0) {
        if (root == null) {
            return null;
        }

        if (value < root.data) {
            depth += 1;
            return this.depth(value, root.left, depth);
        }
        else if (value > root.data) {
            depth += 1;
            return this.depth(value, root.right, depth);
        }
        else {
            return depth;
        }
    }

    function isBalancedView() {
        if(isBalanced(this.root) > 0)
            return 'Balanced';
        else
            return 'Not balanced';
    }

    function isBalanced(root = this.root) {
        if (root == null) {
            return 0;
        }
        let lh = isBalanced(root.left);
        if (lh === -1) {
            return -1;
        }
        let rh = isBalanced(root.right);
        if (rh === -1) {
            return -1;
        }
        if (Math.abs(lh - rh) > 1) {
            return -1;
        }
        else return Math.max(lh, rh) + 1;
    }

    function rebalance() {
        const inorderList = this.inorder();
        this.root = buildTree(inorderList);
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
