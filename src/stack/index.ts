export class Stack {
    length: number = 0;
    value: any[] = [];

    push(value: any) {
        this.value.push(value);
        this.length++;
        return this.length;
    }
    pop() {
        const last = this.value[this.length - 1];
        this.value.length -= 1;
        return last;
    }
}

const stack = new Stack();

stack.pop();
stack.push(4)

