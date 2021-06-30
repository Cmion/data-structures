/**
 * Queue is a collection of entities that are maintained in a sequence
 * and can be modified by the addition of entities at one end of the sequence
 * and the removal of entities from the other end of the sequence.
 */
export class Queue {
  private structure: any[] = [];

  /**
   * Returns the length of the queue
   */
  get size() {
    return this.structure.length;
  }

  /**
   * Adds values to the queue front of the queue
   * @param value
   * @returns
   */
  enqueue(...value: any[]) {
    this.structure.push(...value);
    return this.structure;
  }

  /**
   * Removes the rear item in the queue and returns it
   * @returns
   */
  dequeue() {
    return this.structure.shift();
  }

  /**
   * Returns the first value of the queue without dequeuing it
   * @returns
   */
  peek() {
    return this.structure[0];
  }

  /**
   * Returns all the value in the queue
   * @returns
   */
  values() {
    return this.structure;
  }

  /**
   * Removes every item from the queue
   */
  clear() {
    this.structure.length = 0;
    return this.structure;
  }

  /**
   * Checks if the queue is empty
   */
  isEmpty(): boolean {
    return this.structure.length > 0;
  }

  /**
   * Returns a find operation on the queue
   * @param predicate
   */
  find<T = any>(
    predicate: (
      current?: T,
      index?: number,
      queue?: this
    ) => boolean | undefined
  ): T | undefined {
    let value = undefined;
    for (let index = 0; index < this.structure.length; index++) {
      if (predicate(this.structure[index], index, this)) {
        value = this.structure[index];
        break;
      }
    }

    return value;
  }

  /**
   * Determines whether an queue includes a certain element, returning true or false as appropriate.
   * @param searchElement The element to search for.
   * @param fromIndex The position in this array at which to begin searching for searchElement.
   */
  includes<T = undefined>(searchElement: T, fromIndex: number = 0): boolean {
    let value = false;
    for (let index = fromIndex; index < this.structure.length; index++) {
      if (this.structure[index] === searchElement) {
        value = true;
        break;
      }
    }
    return value;
  }
}
