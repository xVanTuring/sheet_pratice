import { Stave, StaveNote, SVGContext, VoiceTime } from "vexflow";
import { NoteDisplayer } from "./NoteDisplayer";

export class EqualDurationNoteDisplayer extends NoteDisplayer {
  constructor(
    context: SVGContext,
    stave: Stave,
    private voiceInfo: {
      voiceTime: VoiceTime;
      subDuration: number;
      clef: "treble" | "bass";
    }
  ) {
    super(context, stave);
  }

  setClef(clef: "treble" | "bass") {
    this.voiceInfo.clef = clef;
  }

  draw(noteChar: string[]) {
    const notes = noteChar.map((note) => {
      return new StaveNote({
        clef: this.voiceInfo.clef,
        keys: [note],
        duration: String(this.voiceInfo.subDuration),
      });
    });

    this.ndraw({
      notesList: notes,
      voiceTime: this.voiceInfo.voiceTime,
    });
  }
}
