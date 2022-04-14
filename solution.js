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
//  traverse our queue, until we hit the end.
  count(){
    let temp = this.first;
    let counter = 0;
    while (temp){
      counter++;
      temp = temp.next;
    }
    return counter;
  }
  // Can remove from queue using dequeue method
//  [1, 2, 3, 4]
  // guard clause - can't remove from an empty queue
  // what if there's only one element in the array?
  // nothing gets passed in, just remove - from beginning.
  dequeue(){
    if (this.first === null){
      return null;
    }
    let temp = this.first;
    
    if (this.first === this.last){
      this.first = null;
      this.last = null;
    } else {
      // shift first down to the next one
      this.first = this.first.next;
    }
    return temp.data;
  }
  // Can add to queue using enqueue method
    // we add it to the end, and remove it from the beginning.
    //  [1,2,3,  4]
  enqueue(val){
    // create a newNode with this value
    let newNode = new Node(val);
    // ask is it empty?
    if (this.first === null){
      this.first = newNode;
      this.last = newNode;
    } else {
      // establish association so 3 is linking to 4
      // we assign the last to be 4
      this.last.next = newNode
      this.last = newNode;
    }
  }
  // findMax data value
  // going to traverse;
  findMax(){
    let temp = this.first;
    let max = 0; // or set to this.first.data // or if there were negative numbers, you could set it to -Infinity

    while (temp){
      // if temp.data is bigger, make it our new max;
      if (temp.data > max){
        max = temp.data;
      }
      temp = temp.next;
    }
    return max;
  }

  // getLast node
  getLast(){
    return this.last;
  }

  // isEmpty check if list is empty
  isEmpty(){
    return this.first === null;
  }

  // peek the first node
  // whichever end you want to remove from, you look at.
  // return the node at the first position
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
    // console.log(stackArr);

    // create a new stack to push them back, using push. // erasing the top, and then pushing them back into the sorted order // empty the stack
    this.top = null;

    // reverse the array, to start at the end of the array and count downward.
    for (let val of stackArr){
      this.push(val);
    }
    // console.log(inspect(this.top, true, 9, true))
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
