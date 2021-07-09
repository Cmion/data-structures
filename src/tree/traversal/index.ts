import { Tree } from '..';

export class Traversal {
  preorder(root: Tree, callback: (tree: Tree) => void) {
    callback(root);

    if (!root.isLeaf()) {
      let subtree: Tree | null = root.firstChild();
      while (subtree !== null) {
        this.preorder(subtree, callback);
        subtree = subtree.nextSibling();
      }
    }
  }

  postorder(root: Tree, callback: (tree: Tree) => void) {
    if (!root.isLeaf()) {
      let subtree: Tree | null = root.lastChild();
      while (subtree !== null) {
        this.postorder(subtree, callback);
        subtree = subtree.previousSibling();
      }
    }
    callback(root);
  }
}
