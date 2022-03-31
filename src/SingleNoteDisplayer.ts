import {
  Formatter,
  Stave,
  SVGContext,
  Voice,
  Renderer,
  StaveNote,
} from "vexflow";
import { randomTrebleNotes } from "./utils";

export class SingleNoteDisplayer {
  context: SVGContext;
  stave: Stave;
  constructor(
    private readonly div: HTMLDivElement,
    clef: "treble" | "bass" = "treble"
  ) {
    const renderer = new Renderer(this.div, Renderer.Backends.SVG);

    renderer.resize(200, 180);

    this.context = renderer.getContext() as SVGContext;
    this.stave = new Stave(0, 0, 120);
    this.stave.addClef(clef)
    // .addTimeSignature("1/1");
    this.stave.setContext(this.context).draw();
  }
  private lastNote: SVGElement | null = null;

  draw() {
    if (this.lastNote) {
      this.context.svg.removeChild(this.lastNote);
    }
    this.lastNote = this.context.openGroup();
    let note = randomTrebleNotes();
    const notes = [new StaveNote({ keys: [note], duration: "1" })];
    const voice = new Voice({ num_beats: 1, beat_value: 1 });
    voice.addTickables(notes);
    new Formatter().joinVoices([voice]).format([voice]);
    voice.draw(this.context, this.stave);
    this.context.closeGroup();
    return note;
  }
}
