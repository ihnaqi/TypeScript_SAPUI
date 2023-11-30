import type EventEmitter from "wolfy87-eventemitter";
import Editor from "./Editor";
import Person from "./Person";
import BigPerson from "./BigPerson";

export default class BEditor extends Editor {
	private children: Editor[];

	private addButton: sap.m.Button;
	private removeButton: sap.m.Button;
	// private eventEmitter: EventEmitter;

	constructor(person: BigPerson) {
		super(person);
		this.children = [];
		// this.eventEmitter = new EventEmitter();
	}

	public initGUI(): void {
		super.initGUI();
		let horizontalLayout: sap.ui.layout.HorizontalLayout = new sap.ui.layout.HorizontalLayout();

		this.addButton = new sap.m.Button(undefined, {
			text: "Add",
			press: () => {
				let eventEmitter: EventEmitter = new EventEmitter();
				const child: Person = new Person(eventEmitter);

				((this.person) as BigPerson).addChild(child);
				this.getComponent().addContent(new Editor(child));
			}
		});

		this.removeButton = new sap.m.Button(undefined, {
			text: "Remove",
			press: () => {
				((this.person) as BigPerson).removeChild();
				console.log(((this.person) as BigPerson).getChildCount());
			}
		});

		horizontalLayout.addContent(this.addButton);
		horizontalLayout.addContent(this.removeButton);
		this.verticalLayout.addContent(horizontalLayout);
	}

	public setEvents(): void {
		super.setEvents();
		this.eventEmitter.on("child", (editor: Editor | any) => {
			// Now change has been made in the array, Reflect the changes into the UI
		});
	}
}