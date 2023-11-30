import type EventEmitter from "wolfy87-eventemitter";
import Person from "./Person";

export default class BigPerson extends Person {
    private children: Person[];

    constructor(eventEmitter: EventEmitter) {
        super(eventEmitter);
        this.children = [];
    }

    public addChild(child: Person): void {
        this.children.push(child);
        this.eventEmitter.emit("child", this.children[this.children.length - 1]);
    }

    public addChildAt(index: number, child: Person): void {
        if(index < this.children.length) {
            this.children.splice(index, 0, child);
            this.eventEmitter.emit("child", this.children[index]);
        }
    }

    public removeChild(): void {
        if (this.children.length > 0) {
            const person: Person = this.children.shift();;
            this.eventEmitter.emit("chid", person);
        }
    }

    public removeChildAt(index: number): void {
        if (index < this.children.length) {
            const person: Person = this.children.at(index);
            this.children.splice(index, 1);
            this.eventEmitter.emit("child", person);
        }
    }

    public getChildAt(index: number): Person | undefined {
        return this.children.at(index);
    }

    public getChildCount(): number {
        return this.children.length;
    }
}