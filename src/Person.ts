import type EventEmitter from "wolfy87-eventemitter";

export default class Person {

	private name: string;
	private age: number;
	private isMarried: boolean;
	protected eventEmitter: EventEmitter;

	constructor(eventEmitter: EventEmitter) {
		this.eventEmitter = eventEmitter;
		this.name = "";
		this.age = 0;
		this.isMarried = false;
	}

	public setName(name: string): void {
		this.name = name;
		this.eventEmitter.emit("name", name);
	}

	public setAge(age: number): void {
		this.age = age;
		this.eventEmitter.emit("age", this.age);
	}

	public setMarried(isMarried: boolean): void {
		this.isMarried = isMarried;
		this.eventEmitter.emit("married", this.isMarried);
	}

	public getName(): string {
		return this.name;
	}

	public getAge(): number {
		return this.age;
	}

	public getMarried(): boolean {
		return this.isMarried;
	}

	public getEventEmitter(): EventEmitter {
		return this.eventEmitter;
	}

	public toString(): string {
		return `Name ${this.getName()}, Age: ${this.getAge()}, Married: ${this.getMarried() ? 'YES' : 'NO'}`;
	}
}