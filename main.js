class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(value) {
    const node = new Node(value);
    if (this.size === 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.next = null;
      this.tail = node;
    }
    this.size += 1;
  }

  prepend(value) {
    if (this.size === 0) {
      this.append(value);
      return;
    }
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
    this.size += 1;
  }

  at(index) {
    let temp = this.head;
    let counter = 0;
    while (temp !== null) {
      if (counter === index) return temp.value;
      temp = temp.next;
      counter += 1;
    }
    throw new RangeError('Index Out of Bound');
  }

  pop() {
    const popped = this.tail?.value;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      let temp = this.head;
      while (temp.next !== this.tail) {
        temp = temp.next;
      }
      temp.next = null;
      this.tail = temp;
    }
    this.size -= 1;

    return popped;
  }

  contains(value) {
    let temp = this.head;
    while (temp !== null) {
      if (temp.value === value) return true;
      temp = temp.next;
    }
    return false;
  }

  find(value) {
    let temp = this.head;
    let counter = 0;
    while (temp !== null) {
      if (temp.value === value) return counter;
      temp = temp.next;
      counter += 1;
    }
    return null;
  }

  insertAt(value, index) {
    if (index >= this.size) throw new RangeError('Index out of bound');

    if (index === 0) {
      this.prepend(value);
      return;
    }

    let counter = 0;
    let temp = this.head;
    while (temp !== null) {
      if (counter === index - 1) {
        const node = new Node(value);
        node.next = temp.next;
        temp.next = node;
      }
      temp = temp.next;
      counter += 1;
    }
    this.size += 1;
  }

  removeAt(index) {
    if (index >= this.size) throw new RangeError('Index out of bound');

    if (index === this.size - 1) return this.pop();

    let removed = null;
    if (index === 0) {
      removed = this.head.value;
      this.head = this.head.next;
      this.size -= 1;
      return removed;
    }

    let temp = this.head;
    let counter = 0;
    while (temp !== null) {
      if (counter === index - 1) {
        temp.next = temp.next.next;
        removed = temp.next.value;
      }
      temp = temp.next;
      counter += 1;
    }
    this.size -= 1;
    return removed;
  }

  getHead() {
    return this.head?.value;
  }

  getTail() {
    return this.tail?.value;
  }

  toString() {
    let temp = this.head;
    let string = '';
    while (temp !== null) {
      string += `( ${temp.value} ) -> `;
      temp = temp.next;
    }
    string += 'null';
    return string;
  }
}

// testing
const list = new LinkedList();

for (let i = 0; i < 10; i += 1) {
  list.append(i);
}

for (let i = 0; i < 10; i += 1) {
  list.pop();
}

list.prepend('hello');
list.prepend('Ahahaha');
list.insertAt(0, 1);
list.insertAt(1, list.size - 1);
list.insertAt(2, list.size - 1);
list.insertAt(-1, 0);
list.removeAt(1);
list.removeAt(0);
list.removeAt(0);
list.removeAt(list.size - 1);
list.append(3);

console.log(list.toString());
console.log('head: ', list.getHead());
console.log('tail: ', list.getTail());
console.log('size: ', list.size);
console.log(list.find('Ahahaha'));
// console.log(list.at(6)); // should throw error
