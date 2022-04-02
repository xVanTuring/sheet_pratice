import { NotePratice } from "./NotePratice";

const div = document.getElementById("output") as HTMLDivElement;
const question = document.getElementById("question") as HTMLDivElement;
const clefSelect = document.getElementById("clef-select") as HTMLSelectElement;

const notePratice = new NotePratice(div, question);

clefSelect.addEventListener("change", function () {
  const clef = this.value as "treble" | "bass";
  notePratice.setClef(clef);
});
notePratice.startQuestion();
