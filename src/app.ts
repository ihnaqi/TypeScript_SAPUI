import type EventEmitter from "wolfy87-eventemitter";
import Person from "./Person";
import Editor from "./Editor";
import BEditor from "./BEditor";
import BigPerson from "./BigPerson";

// let v = new sap.ui.layout.VerticalLayout();
// let v2 = new sap.ui.layout.VerticalLayout();

let eventEmitter = new EventEmitter();

let person = new BigPerson(eventEmitter);

let mHLayout = new sap.ui.layout.HorizontalLayout("page1");

mHLayout.addContent(new BEditor(person).getComponent());
mHLayout.addContent(new BEditor(person).getComponent());
mHLayout.addContent(new BEditor(person).getComponent());
// mHLayout.addContent(new Editor(person).getComponent());
// mHLayout.addContent(new Editor(person).getComponent());

let app = new sap.m.App("myApp");
app.addPage(mHLayout);
app.placeAt("content");