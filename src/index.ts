import { EquanDurationNoteDisplayer } from "./EqualDurationNoteDisplayer";
import { StaveDisplayer } from "./StaveDisplayer";
const clef: "treble" | "bass" = "bass";
const div = document.getElementById("output") as HTMLDivElement;
const staveDisplayer = new StaveDisplayer(div, clef);
staveDisplayer.draw();
const notedisplayer = new EquanDurationNoteDisplayer(
  staveDisplayer.getContext(),
  staveDisplayer.getStave(),
  {
    subDuration: 4,
    voiceTime: {
      num_beats: 4,
      beat_value: 4,
    },
    clef: clef,
  }
);

const note = notedisplayer.draw();
console.log(note);

setInterval(() => {
  const note = notedisplayer.draw();
  console.log(note);
}, 2000);
