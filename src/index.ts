import { EqualDurationNoteDisplayer } from "./EqualDurationNoteDisplayer";
import { CoordinationNoteProvide } from "./NoteProvider/CoordinationNoteProvider";
import { RangeNoteProvider } from "./NoteProvider/RangeNoteProvider";
import { ReplayProvider } from "./NoteProvider/ReplayProvider";
import { NoteQuestion } from "./NoteQuestion";
import { QuestionProvider } from "./QuestionProvider";
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

const replayP = new ReplayProvider(15);
const defaultRanger = new RangeNoteProvider("c/4", "b/5");
const coordNoteProvider = new CoordinationNoteProvide([
  {
    provider: replayP,
    weight: 5,
  },
  {
    provider: defaultRanger,
    weight: 1,
  },
]);
const questionProvider = new QuestionProvider(coordNoteProvider, {
  subDuration: 4,
  voiceTime: {
    num_beats: 1,
    beat_value: 4,
  },
  clef: clef,
});

const staveDisplayer = new StaveDisplayer(div, clef);

const notedisplayer = new EqualDurationNoteDisplayer(
  staveDisplayer.getContext(),
  staveDisplayer.getStave(),
  {
    subDuration: 4,
    voiceTime: {
      num_beats: 1,
      beat_value: 4,
    },
    clef: clef,
  }
);

const nQ = new NoteQuestion(q, 0);
const stat = new Statistic();
nQ.resultCb = (key: string, right: boolean) => {
  if (right) {
    replayP.addRight(key);
    stat.addRight();
  } else {
    replayP.addWrong(key);
    stat.addWrong();
  }
  startQuestion();
};

function startQuestion() {
  const note = questionProvider.nextQuestion();
  notedisplayer.draw(note);
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
