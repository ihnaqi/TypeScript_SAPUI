import type EventEmitter from "wolfy87-eventemitter";
import Person from "./Person";

export default class PersonEditor {

  private person: Person;

  // Fields
  private firstNameText: sap.m.Input;
  private ageText: sap.m.Input;
  private marriedCheckBox: sap.m.CheckBox;

  // Label
  private firstNameLabel: sap.m.Label;
  private ageLabel: sap.m.Label;

  protected ee: EventEmitter;
  protected v: sap.ui.layout.VerticalLayout
  protected h: sap.ui.layout.HorizontalLayout

  protected title: string;

  // Constructor
  constructor(person: Person) {
    this.person = person;
    this.ee = person.getEventEmitter();
  }

  public initGUI(){
     // INIT GUI CODE
     let model = new sap.ui.model.json.JSONModel(this.person);

     // Input Fields
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

     this.marriedCheckBox = new sap.m.CheckBox(undefined, {selected: "{/married}", select: ()=>{
       this.ee.emit("married", this.marriedCheckBox.getSelected());
     }});
 
     // Labels
     this.firstNameLabel = new sap.m.Label({ text: "First Name" });
     this.ageLabel = new sap.m.Label({ text: "Age" });
 
 
     //Page
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

  public setEvents() {
    this.ee.on("nameText", (name: any)=>{
      this.firstNameText.setValue(name);
    });

    this.ee.on("ageText", (age: any)=>{
      this.ageText.setValue(age);
    });

    this.ee.on("marriedCheckBox", (married: any)=>{
      this.marriedCheckBox.setSelected(married);
    });
  }
}




