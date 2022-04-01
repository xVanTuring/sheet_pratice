import { EquanDurationNoteDisplayer } from "./EqualDurationNoteDisplayer";
import { StaveDisplayer } from "./StaveDisplayer";

const div = document.getElementById("output") as HTMLDivElement;
const staveDisplayer = new StaveDisplayer(div);
staveDisplayer.draw();
const notedisplayer = new EquanDurationNoteDisplayer(
  staveDisplayer.getContext(),
  staveDisplayer.getStave(),
  {
    subDuration: 2,
    voiceTime: {
      beat_value: 4,
      num_beats: 4,
    },
  }
);

const note = notedisplayer.draw();
console.log(note);

setInterval(() => {
  const note = notedisplayer.draw();
  console.log(note);
}, 2000);
