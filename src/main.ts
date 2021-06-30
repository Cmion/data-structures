import { Queue } from "./queue";

const queue = new Queue();

queue.enqueue({ x: 10, hello: true }, 5, { x: 10 });
queue.enqueue(4);
queue.enqueue(3);
queue.enqueue(13);
queue.enqueue(31);
queue.enqueue("Hello World");

// queue.dequeue();

// console.log("Dequeued::", queue.dequeue(),queue.size);

console.log("Queue", queue.values());
console.log("Queue Peek", queue.peek());
console.log("Queue Includes", queue.includes({ x: 10 }));
console.log(
  "Queue find",
  queue.find<Record<string, any>>((current) => {
    if (current?.x === 10) {
      return true;
    }
  })
);
queue.dequeue();
// console.log(queue.clear());
console.log("Queue after dequeue", queue.values());
