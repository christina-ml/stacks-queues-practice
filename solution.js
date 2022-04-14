const { nums, words } = require("./data/data.js");
const { inspect } = require("util");
const { threadId } = require("worker_threads");

class Node {
  constructor(data){
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor(){
    this.first = null;
    this.last = null;
    this.size = 0;
    this.max = 0
  }

  // methods
  // Count size of queue
  /*
    1. Node is set to the first item
    2. While there are nodes...
    3. the size is already being tracked, so size increases by 1, each time in the while loop.
    4. the pointer for the first item is moved to node.next
    5. Returning the size, which has increased one time every time there has been a node..
  */
  count(){
    let node = this.first;
    while (node){
      this.size++;
      node = node.next;
    }
    return this.size;
  }
  // Can remove from queue using dequeue method
  /*
    1. Guard clause - If there is no first, the queue is empty.
    2. If the first and last are the same, there's just one node.
    3. Set the one node to null.
    4. Let node be the first.
    5. Move the pointer to first to be the next.
    6. Return the node data.
  */
  dequeue(){
    if (!this.first){
      throw new Error("Can't remove from empty queue");
    }
    if (this.first === this.last){
      this.last = null;
    }
    let node = this.first;
    this.first = this.first.next;
    return node.data;
  }
  // Can add to queue using enqueue method
  /*
    1. Create a new instance of a Node with the data passed in.
    2. If there is no `first item`...
    3. Set the `first item` and `last item` to the `new node`.
    4. else, set the pointer of the last item to be the `new node`
    5. the last item is set to the new node.
  */
  enqueue(data){
    let newNode = new Node(data);
    if (!this.first){
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
  }
  // findMax data value
  findMax(){
    let node = this.first;
    let max = this.first.data;
    while (node){
      if (max < node.data){
        max = node.data;
      }
      node = node.next;
    }
    return max;
  }

  // getLast node
  /*
    1. Let node equal the first item
    2. While there is a node... the pointer for node points to node.next
    3. if the next node is null, that is the last one in the list. So return the node.
  */
  getLast(){
    let node = this.first;
    while (node){
      node = node.next;
      if (node.next === null){
        return node;
      }
    }
  }

  // isEmpty check if list is empty
  isEmpty(){
    return this.first === null;
    // if (this.first === null){
    //   return null;
    // }
  }

  // peek the first node
  peek(){
    return this.first;
  }
}

class Stack {
  constructor(top = null){
    this.top = top;
  }
  // Methods
// create a new node
// set next property to the top of the stack;
//  replace the top with our new node
  push(value){
    const newNode = new Node(value);
    newNode.next = this.top;
    this.top = newNode;
  }

  // What's the Big O notation of this? Linear - O(n)
  size(){
    let temp = this.top;
    let counter = 0;
    // keep incrementing by 1, and traverse the entire stack until there's nothing left.
    while (temp){
      // increment counter every time it finds a node.
      // keep shifting pointer down one in the stack, until it hits the end of the stack.
      counter++;
      temp = temp.next;
    }
    return counter;
  }

  pop(){
    // what if it's an empty stack?
    // guard clause - if this.top is empty, return null
    if (this.top === null){
      return null;
    }
    // keep track of current top, and shift the current top down one
    let temp = this.top;
    this.top = temp.next;
    return temp;
  }
  // check if list is empty
  isEmpty(){
    // this.top has a value? Not empty
    // this.top is null? Is empty
    return this.top === null;
  }
  // findMin data value
  findMin(){
      // if this.isEmpty(), return null. If it's an empty stack, return null.
      if (this.isEmpty()){
        return null;
      }
      // set the first minimum to this.top.data // min is a number, not a node.
      let temp = this.top;
      let min = temp.data;
      
      // we're traversing
      while(temp){
        if (temp.data < min){
          min = temp.data;
        }
        temp = temp.next;
      }
      return min;
  }
  // peek top node
  peek(){
    return this.top;
  }
  // sort - sort the stack into ascending order. CHALLENGE only use stacks to achieve this (no arrays or objects etc.)
  /*
    The     brown
    quick   dog
    brown   fox
    fox     jumps
    jumps   lazy
    over    over
    the     quick
    lazy    The        
    dog     the

    1. Take first word, and iterate through the `next nodes`, until...
    2. the first word is greater than >= or equal to the next node.
    3. If it is, put that node there.
    4. If there are no nodes greater than the first node, set this node to null.
    Set this node to be the `first node` in the `newStack`.

  */
  //convert this data to an array
  convertToArr(){
    let temp = this.top;
    let arr = [];
    // this will traverse our entire stack
    while (temp){
      // insert at the beginning of the array
      arr.push(temp.data.toLowerCase())
      temp = temp.next;
    }
    return arr;
  }
  // create a sort method where we're going to use this `convertToArr`
  sort(){
    // now we have an array of all the values, and going to sort it.
    let stackArr = this.convertToArr();
    stackArr.sort((a,b)=>{
      if (a < b){
        return 1
      } else {
        return -1;
      }
    });
    console.log(stackArr);

    // create a new stack to push them back, using push. // erasing the top, and then pushing them back into the sorted order // empty the stack
    this.top = null;

    // reverse the array, to start at the end of the array and count downward.
    for (let val of stackArr){
      this.push(val);
    }
    console.log(inspect(this.top, true, 9, true))
  }
}

// let myStack = new Stack();
// myStack.push("Oh my...");
// myStack.push("Bears");
// myStack.push("Tigers");
// myStack.push("Lions");
// myStack.sort();
// console.log("end:", myStack);

module.exports = {
  Node,
  Queue,
  Stack,
};
