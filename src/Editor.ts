import type EventEmitter from "wolfy87-eventemitter";
import Person from './Person';

export default class Editor {

	protected person: Person;

	// UI fields and their associated labels
	private nameField: sap.m.Input;
	private nameLabel: sap.m.Label;

	private ageField: sap.m.Input;
	private ageLabel: sap.m.Label;

	private marriedCheckbox: sap.m.CheckBox;
	private marriedCheckBoxLabel: sap.m.Label;

	protected eventEmitter: EventEmitter;
	private verticalLayout: sap.ui.layout.VerticalLayout;
	protected horizontalLayout: sap.ui.layout.HorizontalLayout;

	protected title: string;

	constructor(person: Person) {
		this.person = person;
		this.eventEmitter = person.getEventEmitter();
		this.verticalLayout = new sap.ui.layout.VerticalLayout();
		this.initGUI();
		this.setEvents();
	}

	public initGUI() {
		let jsonPerson = new sap.ui.model.json.JSONModel(this.person);

		this.nameField = new sap.m.Input({
			value: "{/name}",
			liveChange: () => {
				this.person.setName(this.nameField.getValue())
			},
			placeholder: "Enter name here"
		});

		this.ageField = new sap.m.Input({
			value: "{/age}",
			liveChange: () => {
				this.eventEmitter.emit("age", this.ageField.getValue());
			},
			placeholder: "Enter age",
		});

		this.marriedCheckbox = new sap.m.CheckBox(undefined, {
			selected: "{/married}",
			select: () => {
				this.eventEmitter.emit("married", this.marriedCheckbox.getSelected());
			}
		});

		this.nameLabel = new sap.m.Label({
			text: "Name",
		});

		this.ageLabel = new sap.m.Label({
			text: "Age",
		});

		this.marriedCheckBoxLabel = new sap.m.Label({
			text: "Married"
		})

		let simpleFormNoButtons = new sap.ui.layout.form.SimpleForm(undefined, {
			title: this.title,
			content: [
				this.nameLabel,
				this.nameField,
				this.ageLabel,
				this.ageField,
				this.marriedCheckBoxLabel,
				this.marriedCheckbox
			]
		});

		simpleFormNoButtons.setModel(jsonPerson);
		this.verticalLayout.addContent(simpleFormNoButtons);

	}

	public getNameFieldValue(): string {
		return this.nameField.getValue();
	}

	public getAgeFieldValue(): number {
		return parseInt(this.ageField.getValue());
	}

	public getIsMarriedCheckValue(): boolean {
		return this.marriedCheckbox.getSelected();
	}

	public setEvents(): void {
		this.eventEmitter.on("name", (name: string | any) => {
			this.nameField.setValue(name);
		});

		this.eventEmitter.on("age", (age: number | any) => {
			this.ageField.setValue(age);
		});

		this.eventEmitter.on("married", (married: boolean | any) => {
			this.marriedCheckbox.setSelected(married);
		});
	}

	public getComponent(): sap.ui.layout.VerticalLayout {
		return this.verticalLayout;
	}
}