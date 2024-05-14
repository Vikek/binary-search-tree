class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.arr = this.mergeSort(this.removeDuplicates(arr));
        this.root = buildTree(this.arr);
    }

    insert(data, root = this.root) {
        if(root === null) {
            return root = new TreeNode(data);
        }

        if(data > root.data) {
            root.right = this.insert(data, root.right);
        } else if(data < root.data) {
            root.left = this.insert(data, root.left);
        }

        return root;
    }

    delete(data, root = this.root) {
        if(root === null) return root;

        if(data > root.data) {
            root.right = this.delete(data, root.right)
        } else if(data < root.data) {
            root.left = this.delete(data, root.left)
        }

        if(root.left === null) {
            return root.right;
        } else if (root.right === null) {
            return root.left;
        } else {
            let minParent = root;
            let min = root.right;

            while(min.left !== null) {
                minParent = min;
                min = min.left;
            }

            if(minParent !== root) {
                minParent.left = min.right;
            } else {
                minParent.right = min.right;
            }

            root.data = min.data;

            return root;
        }


    }

    find(data, root = this.root) {
        if(root === null || root.data === data) {
            return root;
        }

        if(data < root.data) {
            return this.find(data, root.left);
        } else if (data > root.data) {
            return this.find(data, root.right);
        }
    }

    levelOrder(callback = null, root = this.root) {
        if(root === null) {
            return;
        }

        const queue = [root];

        while(queue.length > 0) {
            const current = queue.shift()

            if(callback) {
                callback(current);
            }

            if(current.left) {
                queue.push(current.left);
            }

            if(current.right) {
                queue.push(current.right);
            }
        }
    }

    preOrder(callback = null, root = this.root, arrResult = []) {
        if(root === null) {
            return arrResult;
        }

        if(callback) {
            callback(root);
        } else {
            arrResult.push(root.data);
        }

        this.preOrder(callback, root.left, arrResult);
        this.preOrder(callback, root.right, arrResult);

        return arrResult;
    }

    inOrder(callback = null, root = this.root, arrResult = []) {
        if(root === null) {
            return arrResult;
        }

        this.inOrder(callback, root.left, arrResult);
        if(callback) {
            callback(root);
        } else {
            arrResult.push(root.data);
        }
        this.inOrder(callback, root.right, arrResult);

        return arrResult;
    }

    postOrder(callback = null, root = this.root, arrResult = []) {
        if(root === null) {
            return arrResult;
        }

        this.postOrder(callback, root.left, arrResult);
        this.postOrder(callback, root.right, arrResult);
        if(callback) {
            callback(root);
        } else {   
            arrResult.push(root.data);
        }

        return arrResult;
    }

    height(node) {
        if(node === null) {
            return -1;
        }

        const left = this.height(node.left);
        const right = this.height(node.right);

        return 1 + Math.max(left, right);
    }

    depth(targetNode, root = this.root) {
        if(root === null) {
            return -1;
        }

        let dist = -1;

        if(root === targetNode || (dist = this.depth(targetNode, root.left)) >= 0 || (dist = this.depth(targetNode, root.right)) >= 0) {
            return dist + 1;
        }

        return dist;
    }

    isBalanced(root = this.root) {
        if(root === null) {
            return -1;
        }

        const left = this.isBalanced(root.left);
        const right = this.isBalanced(root.right);

        const diff = left - right;
        if(diff <= 1 && diff >= -1) {
            return true;
        }
        return false;
    }

    rebalance() {
        this.root = buildTree(this.inOrder());
    }
    
    removeDuplicates(arr) {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
    }
    
    mergeSort(arr) {
        if(arr.length === 1) return arr;
    
        let firstHalf = arr.slice(0, arr.length/2);
        let secondHalf = arr.slice(arr.length/2, arr.length);
    
        return this.merge(this.mergeSort(firstHalf), this.mergeSort(secondHalf));
    }
    
    merge(firstHalf, secondHalf) {
        let arrResult = [];
        let indexFirstHalf = 0;
        let indexSecondHalf = 0;
    
        while(indexFirstHalf < firstHalf.length && indexSecondHalf < secondHalf.length) {
            if (firstHalf[indexFirstHalf] < secondHalf[indexSecondHalf]) {
                arrResult.push(firstHalf[indexFirstHalf]);
                indexFirstHalf++;
            } else {
                arrResult.push(secondHalf[indexSecondHalf]);
                indexSecondHalf++;
            }
        }
    
        return arrResult.concat(firstHalf.slice(indexFirstHalf)).concat(secondHalf.slice(indexSecondHalf));
    }
}

function buildTree(sortedArr, start = 0, end = sortedArr.length - 1) {
    if(start > end) return null;

    const mid = parseInt((start + end) / 2);
    const root = new TreeNode(sortedArr[mid]);

    root.left = buildTree(sortedArr, start, mid - 1);
    root.right = buildTree(sortedArr, mid + 1, end);

    return root;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

const main = (() => {
    let dataArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
    const tree = new Tree(dataArr);
    tree.insert(54);
    tree.delete(7);
    tree.delete(3);
    console.log(tree.find(67));
    const callbackFunction = (treeNode) => {
        console.log(treeNode.data);
    }
    console.log(tree.preOrder());
    console.log(tree.inOrder());
    console.log(tree.postOrder());
    console.log(tree.height(tree.find(23)));
    console.log(tree.depth(tree.find(3)));
    console.log(tree.isBalanced());
    tree.rebalance();
    console.log(tree.isBalanced());
    console.log(tree.preOrder());
    console.log(tree.inOrder());
    console.log(tree.postOrder());
    prettyPrint(tree.root);
})();