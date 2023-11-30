define("Person", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Person {
        constructor(eventEmitter) {
            this.eventEmitter = eventEmitter;
            this.name = "";
            this.age = 0;
            this.isMarried = false;
        }
        setName(name) {
            this.name = name;
            this.eventEmitter.emit("name", name);
        }
        setAge(age) {
            this.age = age;
            this.eventEmitter.emit("age", this.age);
        }
        setMarried(isMarried) {
            this.isMarried = isMarried;
            this.eventEmitter.emit("married", this.isMarried);
        }
        getName() {
            return this.name;
        }
        getAge() {
            return this.age;
        }
        getMarried() {
            return this.isMarried;
        }
        getEventEmitter() {
            return this.eventEmitter;
        }
        toString() {
            return `Name ${this.getName()}, Age: ${this.getAge()}, Married: ${this.getMarried() ? 'YES' : 'NO'}`;
        }
    }
    exports.default = Person;
});
define("Editor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Editor {
        constructor(person) {
            this.person = person;
            this.eventEmitter = person.getEventEmitter();
            this.verticalLayout = new sap.ui.layout.VerticalLayout();
            this.initGUI();
            this.setEvents();
        }
        initGUI() {
            let jsonPerson = new sap.ui.model.json.JSONModel(this.person);
            this.nameField = new sap.m.Input({
                value: "{/name}",
                liveChange: () => {
                    this.person.setName(this.nameField.getValue());
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
            });
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
        getNameFieldValue() {
            return this.nameField.getValue();
        }
        getAgeFieldValue() {
            return parseInt(this.ageField.getValue());
        }
        getIsMarriedCheckValue() {
            return this.marriedCheckbox.getSelected();
        }
        setEvents() {
            this.eventEmitter.on("name", (name) => {
                this.nameField.setValue(name);
            });
            this.eventEmitter.on("age", (age) => {
                this.ageField.setValue(age);
            });
            this.eventEmitter.on("married", (married) => {
                this.marriedCheckbox.setSelected(married);
            });
        }
        getComponent() {
            return this.verticalLayout;
        }
    }
    exports.default = Editor;
});
define("BigPerson", ["require", "exports", "Person"], function (require, exports, Person_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BigPerson extends Person_1.default {
        constructor(eventEmitter) {
            super(eventEmitter);
            this.children = [];
        }
        addChild(child) {
            this.children.push(child);
            this.eventEmitter.emit("child", this.children[this.children.length - 1]);
        }
        addChildAt(index, child) {
            if (index < this.children.length) {
                this.children.splice(index, 0, child);
                this.eventEmitter.emit("child", this.children[index]);
            }
        }
        removeChild() {
            if (this.children.length > 0) {
                const person = this.children.shift();
                ;
                this.eventEmitter.emit("chid", person);
            }
        }
        removeChildAt(index) {
            if (index < this.children.length) {
                const person = this.children.at(index);
                this.children.splice(index, 1);
                this.eventEmitter.emit("child", person);
            }
        }
        getChildAt(index) {
            return this.children.at(index);
        }
        getChildCount() {
            return this.children.length;
        }
    }
    exports.default = BigPerson;
});
define("BEditor", ["require", "exports", "Editor", "Person"], function (require, exports, Editor_1, Person_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BEditor extends Editor_1.default {
        constructor(person) {
            super(person);
            this.children = [];
        }
        initGUI() {
            super.initGUI();
            let horizontalLayout = new sap.ui.layout.HorizontalLayout();
            this.addButton = new sap.m.Button(undefined, {
                text: "Add",
                press: () => {
                    let eventEmitter = new EventEmitter();
                    const child = new Person_2.default(eventEmitter);
                    (this.person).addChild(child);
                    this.getComponent().addContent(new Editor_1.default(child));
                }
            });
            this.removeButton = new sap.m.Button(undefined, {
                text: "Remove",
                press: () => {
                    (this.person).removeChild();
                    console.log((this.person).getChildCount());
                }
            });
            horizontalLayout.addContent(this.addButton);
            horizontalLayout.addContent(this.removeButton);
            this.verticalLayout.addContent(horizontalLayout);
        }
        setEvents() {
            super.setEvents();
            this.eventEmitter.on("child", (editor) => {
            });
        }
    }
    exports.default = BEditor;
});
define("PersonEditor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PersonEditor {
        constructor(person) {
            this.person = person;
            this.ee = person.getEventEmitter();
        }
        initGUI() {
            let model = new sap.ui.model.json.JSONModel(this.person);
            this.firstNameText = new sap.m.Input({
                value: "{/name}", liveChange: () => {
                    this.ee.emit("name", this.firstNameText.getValue());
                },
                placeholder: "Enter a first name",
            });
            this.ageText = new sap.m.Input({
                value: "{/age}", liveChange: () => {
                    this.ee.emit("age", +this.ageText.getValue());
                },
                placeholder: "Enter age",
            });
            this.marriedCheckBox = new sap.m.CheckBox(undefined, { selected: "{/married}", select: () => {
                    this.ee.emit("married", this.marriedCheckBox.getSelected());
                } });
            this.firstNameLabel = new sap.m.Label({ text: "First Name" });
            this.ageLabel = new sap.m.Label({ text: "Age" });
            let simpleFormNoButtons = new sap.ui.layout.form.SimpleForm(undefined, {
                title: this.title,
                content: [
                    this.firstNameLabel,
                    this.firstNameText,
                    this.ageLabel,
                    this.ageText,
                    this.marriedCheckBox
                ]
            });
            simpleFormNoButtons.setModel(model);
            this.v.addContent(simpleFormNoButtons);
        }
        setEvents() {
            this.ee.on("nameText", (name) => {
                this.firstNameText.setValue(name);
            });
            this.ee.on("ageText", (age) => {
                this.ageText.setValue(age);
            });
            this.ee.on("marriedCheckBox", (married) => {
                this.marriedCheckBox.setSelected(married);
            });
        }
    }
    exports.default = PersonEditor;
});
define("BigPersonEditor", ["require", "exports", "BigPerson", "Person", "PersonEditor"], function (require, exports, BigPerson_1, Person_3, PersonEditor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BigPersonEditor extends PersonEditor_1.default {
        constructor(bigPerson, v, h, title) {
            super(bigPerson.getPerson());
            this.bigPerson = bigPerson;
            this.ee2 = bigPerson.getEventEmitter();
            this.v = v;
            this.h = h;
            this.title = title;
            this.initGUI();
            this.setEvents();
        }
        initGUI() {
            this.addButton = new sap.m.Button(undefined, {
                text: "Add",
                press: () => {
                    let ee = new EventEmitter();
                    let newPerson = new Person_3.default(ee);
                    newPerson.setName("Working");
                    newPerson.setAge(23);
                    newPerson.setMarried(true);
                    let bigPerson = new BigPerson_1.default(newPerson, ee);
                    this.bigPerson.getEventEmitter().emit("personsFrame", newPerson);
                },
            });
            this.removeButton = new sap.m.Button(undefined, {
                text: "Remove",
                press: () => {
                    this.bigPerson.getEventEmitter().emit("personsRemoveFrame", this.bigPerson.getChildCount() - 1);
                },
            });
            let cHLayout = new sap.ui.layout.HorizontalLayout();
            cHLayout.addContent(this.addButton);
            cHLayout.addContent(this.removeButton);
            super.initGUI();
            this.v.addContent(cHLayout);
        }
        setEvents() {
            this.ee2.on("personFrame", (val, person) => {
                console.log(val);
                let cV = new sap.ui.layout.VerticalLayout();
                let ee = new EventEmitter();
                let newPerson = new Person_3.default(ee);
                newPerson.setName("Working");
                newPerson.setAge(23);
                newPerson.setMarried(true);
                let bigPerson = new BigPerson_1.default(person, ee);
                new BigPersonEditor(bigPerson, cV, this.h, this.title);
                this.h.addContent(cV);
            });
            this.ee2.on("personRemoveFrame", (val) => {
                this.h.removeContent(this.v);
            });
            super.setEvents();
        }
    }
    BigPersonEditor.i = 3;
    exports.default = BigPersonEditor;
});
define("app", ["require", "exports", "BEditor", "BigPerson"], function (require, exports, BEditor_1, BigPerson_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let eventEmitter = new EventEmitter();
    let person = new BigPerson_2.default(eventEmitter);
    let mHLayout = new sap.ui.layout.HorizontalLayout("page1");
    mHLayout.addContent(new BEditor_1.default(person).getComponent());
    mHLayout.addContent(new BEditor_1.default(person).getComponent());
    mHLayout.addContent(new BEditor_1.default(person).getComponent());
    let app = new sap.m.App("myApp");
    app.addPage(mHLayout);
    app.placeAt("content");
});
//# sourceMappingURL=app.js.map