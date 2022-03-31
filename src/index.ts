import { SingleNoteDisplayer } from "./SingleNoteDisplayer";

const div = document.getElementById("output") as HTMLDivElement;
const sndisplayer = new SingleNoteDisplayer(div);

setInterval(() => {
  const note = sndisplayer.draw();
}, 2000);
