import { EquanDurationNoteDisplayer } from "./EqualDurationNoteDisplayer";
import { NoteQuestion } from "./NoteQuestion";
import { Statistic } from "./Statistics";
import { StaveDisplayer } from "./StaveDisplayer";
const clef: "treble" | "bass" = "treble";
const div = document.getElementById("output") as HTMLDivElement;
const staveDisplayer = new StaveDisplayer(div, clef);
staveDisplayer.draw();
const notedisplayer = new EquanDurationNoteDisplayer(
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

const q = document.getElementById("question") as HTMLDivElement;
const nQ = new NoteQuestion(q, 0);
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
  nQ.setAnswer(note[0], clef);
}
startQuestion();
