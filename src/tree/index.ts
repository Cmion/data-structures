import util from 'util';

export class Node {
  value: any = null;
  parentNode: null | Node = null;
  children: Node[] = [];
  index: number = 0;
  constructor(value: any) {
    this.value = value;
  }

  /**
   * Inserts a node to the tree or sub-tree
   * @param node
   * @returns
   */
  insertChild(node: Node) {
    node.index = this.children.length;
    this.children.push(node);
    node.parent = this;
    return this;
  }

  /**
   * Checks if the node is a leaf node
   * @returns
   */
  isLeafNode() {
    return this.children.length <= 0;
  }

  /**
   * Checks if the node is a parent node
   * @returns
   */
  isParentNode() {
    return this.children.length >= 1;
  }

  /**
   * Gets the first child of the node
   * @returns
   */
  firstChild() {
    return this.children[0];
  }

  /**
   * Gets the last child of the node
   * @returns
   */
  lastChild() {
    return this.children[this.children.length - 1];
  }

  /**
   * Gets the next sibling of the node
   * @returns
   */
  nextSibling() {
    if (this.parentNode) {
      return this.parentNode.children[this.index + 1];
    }
    return undefined;
  }

  /**
   * Gets the previous sibling of the node
   * @returns
   */
  previousSibling() {
    if (this.parentNode) {
      return this.parentNode.children[this.index - 1];
    }
    return undefined;
  }

  /**
   * Insert a node adjacent to the this node
   * @param node Node to insert
   * @param position Node position ('before' | 'after' | undefined)
   * @returns
   */
  insertAdjacentNode(node: Node, position?: 'before' | 'after') {
    if (this.parentNode) {
      if (position === undefined) {
        this.parentNode.insertChild(node);
      }

      if (position === 'before' || position === 'after') {
        const front = this.parentNode.children.slice(
          0,
          this.index + (position === 'after' ? 1 : 0)
        );
        const back = [
          node,
          ...this.parentNode.children.slice(
            this.index + (position === 'after' ? 1 : 0)
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

  /**
   * Sets the parent of a node
   */
  set parent(node: Node) {
    this.parentNode = node;
  }
}

const log = (myObject: any, clear: boolean = true) => {
  if (clear) console.clear();
  console.log(util.inspect(myObject, false, null, true /* enable colors */));
};

const tree = new Node(45);
const firstChild = new Node(5).insertChild(new Node('Yayy'));
tree.insertChild(firstChild);
tree.insertChild(new Node('Hello Simeon')).insertChild(new Node('World'));

firstChild.insertAdjacentNode(new Node("I'm Adjacent 1"), 'after');
firstChild.insertAdjacentNode(new Node("I'm Adjacent 2"), 'before');

log(tree);
// log(firstChild, false);
// log(secondChild, false);
console.log(firstChild.lastChild(), firstChild.index);
