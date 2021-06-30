import util from "util";

export class Node {
  value: any = null;
  parentNode: null | Node = null;
  children: Node[] = [];
  index: number = 0;
  constructor(value: any) {
    this.value = value;
  }

  insertChild(node: Node) {
    node.index = this.children.length;
    this.children.push(node);
    node.parent = this;
    return this;
  }

  isLeafNode() {
    return this.children.length <= 0;
  }

  isParentNode() {
    return this.children.length >= 1;
  }

  firstChild() {
    return this.children[0];
  }

  lastChild() {
    return this.children[this.children.length - 1];
  }

  nextSibling() {
    if (this.parentNode) {
      return this.parentNode.children[this.index + 1];
    }
    return undefined;
  }

  previousSibling() {
    if (this.parentNode) {
      return this.parentNode.children[this.index - 1];
    }
    return undefined;
  }

  insertAdjacentNode(node: Node, position?: "before" | "after") {
    if (this.parentNode) {
      if (position === undefined) {
        this.parentNode.insertChild(node);
      }

      if (position === "before" || position === "after") {
        const front = this.parentNode.children.slice(
          0,
          this.index + (position === "after" ? 1 : 0)
        );
        const back = [
          node,
          ...this.parentNode.children.slice(
            this.index + (position === "after" ? 1 : 0)
          ),
        ];
        back.forEach(
          (node, index: number) => (node.index = front.length + index)
        );
        front.push(...back);
        this.parentNode.children = front;
      }
    }
    return this;
  }

  set parent(node: Node) {
    this.parentNode = node;
  }
}

export class Tree {
  root: null | Node = null;

  insertChild(node: Node) {
    if (this.root === null) {
      this.root = node;
    }
  }
}

const log = (myObject: any, clear: boolean = true) => {
  if (clear) console.clear();
  console.log(util.inspect(myObject, false, null, true /* enable colors */));
};
const tree = new Node(45);
const firstChild = new Node(5).insertChild(new Node("Yayy"));
tree.insertChild(firstChild);
tree.insertChild(new Node('Hello Simeon'))
//   .insertChild(new Node("World"));

firstChild.insertAdjacentNode(new Node("I'm Adjacent 1"), "after");
firstChild.insertAdjacentNode(new Node("I'm Adjacent 2"), "before");
// const secondChild = new Node(23)
//   .insertChild(new Node(12).insertChild(new Node(399)))
//   .insertChild(new Node(400));

// tree.insertChild(firstChild).insertChild(secondChild).insertChild(new Node(30));

log(tree);
// log(firstChild, false);
// log(secondChild, false);
console.log(firstChild.lastChild(), firstChild.index);
