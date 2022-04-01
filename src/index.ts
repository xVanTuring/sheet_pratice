import { EqualDurationNoteDisplayer } from "./EqualDurationNoteDisplayer";
import { NoteQuestion } from "./NoteQuestion";
import { NoteRanger } from "./NoteRanger";
import { Statistic } from "./Statistics";
import { StaveDisplayer } from "./StaveDisplayer";
let clef: "treble" | "bass" = "treble";
const div = document.getElementById("output") as HTMLDivElement;
const q = document.getElementById("question") as HTMLDivElement;

const clefSelect = document.getElementById("clef-select") as HTMLSelectElement;
clefSelect.addEventListener("change", function () {
  clef = this.value as "treble" | "bass";
  start();
});

const staveDisplayer = new StaveDisplayer(div, clef);
let defaultRanger = new NoteRanger("c/4", "b/5");

const notedisplayer = new EqualDurationNoteDisplayer(
  staveDisplayer.getContext(),
  staveDisplayer.getStave(),
  defaultRanger,
  {
    subDuration: 4,
    voiceTime: {
      num_beats: 1,
      beat_value: 4,
    },
    clef: clef,
  }
);

const nQ = new NoteQuestion(q, defaultRanger, 0);
const stat = new Statistic();
nQ.resultCb = (right) => {
  if (right) {
    stat.addRight();
  } else {
    stat.addWrong();
  }
  console.log(stat.getStatus());
  startQuestion();
};

function startQuestion() {
  const note = notedisplayer.draw();
  nQ.setAnswer(note[0]);
}

function start() {
  staveDisplayer.setClef(clef);
  staveDisplayer.draw();
  notedisplayer.setClef(clef);
  stat.reset();
  startQuestion();
}
start();
