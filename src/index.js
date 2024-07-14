const _ = require("lodash"); 

console.log('Working')



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
    
  buildTree(array) {
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

  } 

  postOrder(callback = data => console.log(data), currentItem = this.root) {
    if (currentItem === null) { //base case
      return 
    }

    this.postOrder(callback, currentItem.right)
    callback(currentItem.data) 
    this.postOrder(callback, currentItem.left)
  }
  
}

 




const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const tree = new Tree(arr);
tree.buildTree(arr);
tree.prettyPrint()
const rootNode = tree.buildTree()
console.log(rootNode)

tree.insert(198)
tree.prettyPrint()
tree.preOrder()



