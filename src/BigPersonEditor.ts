import type EventEmitter from "wolfy87-eventemitter";
import BigPerson from "./BigPerson";
import Person from "./Person";
import PersonEditor from "./PersonEditor";

export default class BigPersonEditor extends PersonEditor {

   // Buttons
   private addButton: sap.m.Button;
   private removeButton: sap.m.Button;
   private bigPerson: BigPerson;
   protected ee2: EventEmitter;
   private static i = 3;

   // Constructor
   constructor(bigPerson: BigPerson, v: sap.ui.layout.VerticalLayout, h: sap.ui.layout.HorizontalLayout, title: string) {
      super(bigPerson.getPerson());

      this.bigPerson = bigPerson;
      this.ee2 = bigPerson.getEventEmitter();
      this.v = v;
      this.h = h;
      this.title = title;
      this.initGUI();
      this.setEvents();
   }

   public initGUI() {
      this.addButton = new sap.m.Button(undefined, {
         text: "Add",
         press: () => {
            let ee = new EventEmitter();

            let newPerson = new Person(ee);
            newPerson.setName("Working");
            newPerson.setAge(23);
            newPerson.setMarried(true);
            let bigPerson = new BigPerson(newPerson, ee);
            this.bigPerson.getEventEmitter().emit("personsFrame", newPerson);
         },
      });

      this.removeButton = new sap.m.Button(undefined, {
         text: "Remove",
         press: () => {
            // this.v.removeContent(this.bigPerson.getChildCount() - 1);
            this.bigPerson.getEventEmitter().emit("personsRemoveFrame", this.bigPerson.getChildCount() - 1);
         },
      });

      let cHLayout = new sap.ui.layout.HorizontalLayout();
      cHLayout.addContent(this.addButton);
      cHLayout.addContent(this.removeButton);

      super.initGUI();
      this.v.addContent(cHLayout);
   }

   public setEvents() {
      this.ee2.on("personFrame", (val: any, person: any) => {
         console.log(val);
         let cV = new sap.ui.layout.VerticalLayout();

         let ee = new EventEmitter();
         let newPerson = new Person(ee);
         newPerson.setName("Working");
         newPerson.setAge(23);
         newPerson.setMarried(true);

         let bigPerson = new BigPerson(person, ee);

         new BigPersonEditor(bigPerson, cV, this.h, this.title);
         this.h.addContent(cV);

      });

      this.ee2.on("personRemoveFrame", (val: any) => {
         this.h.removeContent(this.v);
      });

      super.setEvents();
   }
}




