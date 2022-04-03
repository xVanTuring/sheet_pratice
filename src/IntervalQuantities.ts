import { IntervalQuantitiesPratice } from "./IntervalQuantities/IntervalQuantitiesPratice";

const div = document.getElementById("output") as HTMLDivElement;
const question = document.getElementById("question") as HTMLDivElement;

let intervalQuantitiesPratice = new IntervalQuantitiesPratice(div, question);
intervalQuantitiesPratice.start();
