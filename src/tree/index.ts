import { print } from '../utils';
import { Traversal } from './traversal';

enum TreeType {
  root = '@@ROOT',
  node = '@@NODE',
}

export class Tree {
  value: any = null;
  parentNode: null | Tree = null;
  children: Tree[] = [];
  index: number = 0;
  type: TreeType = TreeType.root;
  constructor(value: any) {
    this.value = value;
  }

  /**
   * Inserts a node to the tree or sub-tree
   * @param node
   * @returns
   */
  insertChild(node: Tree) {
    node.index = this.children.length;
    this.children.push(node);
    node.parentNode = this;
    node.type = TreeType.node;
    return this;
  }

  /**
   * Inserts multiple nodes to the tree or sub-tree
   * @param node
   * @returns
   */
  insertChildren(...nodes: Tree[]) {
    if (Array.isArray(nodes)) {
      for (const node of nodes) {
        this.insertChild(node);
      }
    }

    return this;
  }

  /**
   * Checks if the node is a leaf node
   * @returns
   */
  isLeaf() {
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
    return this.children[0] ?? null;
  }

  /**
   * Gets the last child of the node
   * @returns
   */
  lastChild() {
    return this.children[this.children.length - 1] ?? null;
  }

  /**
   * Gets the next sibling of the node
   * @returns
   */
  nextSibling() {
    if (this.parentNode) {
      return this.parentNode.children[this.index + 1] ?? null;
    }
    return null;
  }

  /**
   * Gets the previous sibling of the node
   * @returns
   */
  previousSibling() {
    if (this.parentNode) {
      return this.parentNode.children[this.index - 1] ?? null;
    }
    return null;
  }

  /**
   * Insert a node adjacent to the this node
   * @param node Node to insert
   * @param position Node position ('before' | 'after' | undefined)
   * @returns
   */
  insertAdjacentNode(node: Tree, position?: 'before' | 'after') {
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
        node.parent = this.parentNode;
        node.type = TreeType.node;
      }
    }
    return this;
  }

  /**
   * Removes the last node of a tree and returns it
   *
   */
  removeNext(): Tree {
    const lastNode = this.lastChild();
    this.children.length = this.children.length - 1;
    return lastNode;
  }

  /**
   * Removes the first node of a tree and returns the deleted node
   */
  removeFirst(): Tree {
    const firstNode = this.firstChild();
    this.children.shift();
    return firstNode;
  }

  /**
   * Sets the parent of a node
   */
  set parent(node: Tree) {
    this.parentNode = node;
  }

  /**
   * Sets the parent of a node
   */
  set updateValue(value: any) {
    this.value = value;
  }

  findNode(
    predicate: (
      current: Tree,
      index?: number,
      queue?: this
    ) => boolean | undefined
  ): Tree | undefined {
    let value: Tree | undefined = undefined;
    for (let index = 0; index < this.children.length; index++) {
      if (predicate(this.children[index], index, this)) {
        value = this.children[index];
        break;
      }
    }

    return value;
  }

  /**
   * Returns the distance of a node to the root of the tree
   */
  findDistanceToRoot() {
    let distance = 0;
    const findDistance = (node: Tree) => {
      if (node.parentNode !== null) {
        distance++;
        findDistance(node.parentNode);
      }
    };

    findDistance(this);
    return distance;
  }

  /**
   * Returns the path of a node to the root of the tree
   */
  getPathToRoot(): Tree[] {
    const path: Tree[] = [];
    const traverse = (node: Tree) => {
      path.push(node);
      if (node.parentNode !== null) {
        traverse(node.parentNode);
      }
    };
    traverse(this);

    return path;
  }

  isAncestor(callback: (node: Tree) => boolean) {
    let callbackResult = callback(this);

    const traverse = (node: Tree, callback: (node: Tree) => boolean) => {
      callbackResult = callback(node);
      if (!callbackResult && node.parentNode !== null) {
        traverse(node.parentNode, callback);
      }
    };

    if (this.parentNode !== null) {
      traverse(this, callback);
      return callbackResult;
    }

    return false;
  }
}

class Person {
  hello = 'Yes';
}
const tree = new Tree('root');
// const firstChild = new Tree('Original First Child').insertChild(
//   new Tree(new Person())
// );
// tree.insertChild(firstChild);
// tree.insertChild(new Tree('Other child')).insertChild(new Tree('World'));

// firstChild.insertAdjacentNode(new Tree('After'), 'after');
// firstChild.insertAdjacentNode(new Tree('Before'), 'before');
const E = new Tree('E');
const C = new Tree('C').insertChild(E);
const D = new Tree('D');
const A = new Tree('A').insertChildren(C, D);

tree.insertChildren(A, new Tree('B'));

// const traverse = new Traversal();

// const traversalCB = (tree: Tree) => {
//   if (tree.value instanceof Person) {
//     console.log('Tree:  ', tree);
//   }
// };
// traverse.postorder(tree, traversalCB);
print(E.getPathToRoot().map((o) => o.value));
print(E.isAncestor((node: Tree) => node.value === A.value));
