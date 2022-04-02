import { NotePratice } from "./NotePratice";

const div = document.getElementById("output") as HTMLDivElement;
const question = document.getElementById("question") as HTMLDivElement;
const clefSelect = document.getElementById("clef-select") as HTMLSelectElement;
const durationSelect = document.getElementById(
  "duration-select"
) as HTMLSelectElement;
const noteIndex = document.getElementById("noteIndex") as HTMLDivElement;

const notePratice = new NotePratice(div, question, noteIndex);

clefSelect.addEventListener("change", function () {
  const clef = this.value as "treble" | "bass";
  notePratice.setClef(clef);
});

durationSelect.addEventListener("change", function () {
  const duration = parseInt(this.value) as 1 | 2 | 4 | 8;
  notePratice.setSubDuration(duration);
});
notePratice.continueSeq();
