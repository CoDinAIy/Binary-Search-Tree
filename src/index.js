const _ = require("lodash"); 

console.log('Wor king')



class Node {
    constructor (data, left = null, right = null) {
        this.data = data
        this.left = left
        this.right = right
    }
}

class Tree {
  constructor(array, root = null) {
    this.array = array
    this.root = root
  }
    
  buildTree(arr) {
    const duplicateRemovedArr = _.uniq(arr) //remove duplicates
    const sortedArr = duplicateRemovedArr.sort((a, b) => a - b) //sorts numerically
    
    this.root = this.formBinarySearchTree(sortedArr)
    return this.root  
  }

  formBinarySearchTree(array) {
    if (array.length === 0) {
        return null
    }
    
    const mid = Math.floor(array.length / 2)
    const node = new Node(array[mid])
    
    node.left = this.formBinarySearchTree(array.slice(0, mid))
    node.right = this.formBinarySearchTree(array.slice(mid + 1))
    
    return node
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  insert(value, currentItem = this.root) {
    if (currentItem === null) {
      return new Node (value)
    }        

    if (value < currentItem.data) {
      currentItem.left = this.insert(value, currentItem.left)
    } else {
      currentItem.right = this.insert(value, currentItem.right)
    }
    
    return currentItem

  }

  delete(value, currentItem = this.root) {
    if (currentItem === null) { //base case
      return currentItem
    }

    if (value < currentItem.data) { 
      currentItem.left = this.delete(value, currentItem.left) //traverse through left side of BST
    } else if (value > currentItem.data) {
      currentItem.right = this.delete(value, currentItem.right) //traverse through right side of BST
    }
    else {
      if (currentItem.left === null && currentItem.right === null) { //no parents
        currentItem = null
      } else if (currentItem.left !== null && currentItem.right === null) { //only left parents
        currentItem = currentItem.left
      } else if (currentItem.left === null && currentItem.right !== null) { //only right parents
        currentItem = currentItem.right
      }
      else { //finds next inorder successor

        const successor = this.findMin(currentItem.right)
        
        currentItem.data = successor.data
        
        this.delete(successor.data, nodeToReplace.right);
    
      }
    }
    return currentItem
  }

  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node
  }

  find(value, currentItem = this.root) {
    if (currentItem.data === value) {
      return currentItem
    } else {
      if (value < currentItem.data) {
        return this.find(value, currentItem.left)
      } else {
        return this.find(value, currentItem.right)
      }
    }
  }


  levelOrder(callback, currentItem = this.root, ) {
    if (!callback) return tree.levelOrder(data => console.log(data));

    if (currentItem === null) return

    const queue = [currentItem]

    while (queue.length > 0) {
      const current = queue.shift()

      callback(current.data)

      if (current.left !== null) {
        queue.push(current.left)
      }
      if (current.right !== null) {
        queue.push(current.right)
      }
    }
  }


  
  inOrder(callback = data => console.log(data), currentItem = this.root) {
    if (currentItem === null) { //base case
      return 
    }

    this.inOrder(callback, currentItem.left)
    callback(currentItem.data) 
    this.inOrder(callback, currentItem.right)
  }

  preOrder(callback = data => console.log(data), currentItem = this.root) {

    if (currentItem === null) { //base case
      return 
    }

    callback(currentItem.data) 

    this.preOrder(callback, currentItem.left)
    this.preOrder(callback, currentItem.right)

    return
  } 

  postOrder(callback = data => console.log(data), currentItem = this.root) {
    if (currentItem === null) { //base case
      return 
    }

    this.postOrder(callback, currentItem.right)
    callback(currentItem.data) 
    this.postOrder(callback, currentItem.left)
  }
  
  
  depth(node, currentItem = this.root, depth = 0) {
    if (currentItem === null) return -1
    
    if (currentItem.data === node) return depth
    
    const left = this.depth(node, currentItem.left, depth + 1)
    if (left !== -1) return left
    
    return this.depth(node, currentItem.right, depth + 1)
  }

  height(node = this.root) {
    if (node === null) return -1
  
    const left = this.height(node.left)
    const right = this.height(node.right)

    return Math.max(left, right) + 1
  }

  isBalanced(node = this.root) {

    if (node === null) {
      return true
    }
    
    const leftHeight = this.height(node.left)
    const rightHeight = this.height(node.right)

    const heightDifference = Math.abs(leftHeight - rightHeight)

    if (heightDifference > 1) {
      return false
    }

    return this.isBalanced(node.left) && this.isBalanced(node.right)
  }

  rebalance() {
    const array = [];
    this.inOrder(data => array.push(data)); // Collect tree values into array
    this.buildTree(array)
  }
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const tree = new Tree(arr);
tree.buildTree(arr);
tree.prettyPrint()
tree.insert(198)
tree.prettyPrint()
tree.preOrder()
tree.isBalanced()
tree.inOrder()
tree.insert(2098)
tree.insert(4897)
tree.insert(5998)
tree.rebalance()
tree.prettyPrint()






