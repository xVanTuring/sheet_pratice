import {
  Formatter,
  Stave,
  StaveNote,
  SVGContext,
  Voice,
  VoiceTime
} from "vexflow";

export class NoteDisplayer {
  constructor(
    private readonly context: SVGContext,
    private readonly stave: Stave
  ) {}

  private lastNote: SVGElement | null = null;

  protected ndraw(voiceInfo: { notesList: StaveNote[]; voiceTime: VoiceTime }) {
    if (this.lastNote) {
      this.context.svg.removeChild(this.lastNote);
    }
    this.lastNote = this.context.openGroup();
    const voice = new Voice(voiceInfo.voiceTime);
    voice.addTickables(voiceInfo.notesList);
    new Formatter().joinVoices([voice]).format([voice]);
    voice.draw(this.context, this.stave);
    this.context.closeGroup();
  }
}
