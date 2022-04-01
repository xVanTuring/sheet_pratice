import { Stave, StaveNote, SVGContext, VoiceTime } from "vexflow";
import { NoteDisplayer } from "./NoteDisplayer";
import { randomOneBassNote, randomOneTrebleNote } from "./utils";

export class EquanDurationNoteDisplayer extends NoteDisplayer {
  private beatCount: number;
  constructor(
    context: SVGContext,
    stave: Stave,
    private readonly voiceInfo: {
      voiceTime: VoiceTime;
      subDuration: number;
      clef: "treble" | "bass";
    }
  ) {
    super(context, stave);
    const totalDuration =
      (1 / this.voiceInfo.voiceTime.beat_value) *
      this.voiceInfo.voiceTime.num_beats;
    this.beatCount = totalDuration / (1 / this.voiceInfo.subDuration);
  }
  draw() {
    const noteChar = Array(this.beatCount)
      .fill(1)
      .map(() =>
        this.voiceInfo.clef === "bass"
          ? randomOneBassNote()
          : randomOneTrebleNote()
      );
    const notes = noteChar.map((note) => {
      return new StaveNote({
        clef:this.voiceInfo.clef,
        keys: [note],
        duration: String(this.voiceInfo.subDuration),
      });
    });

    this.ndraw({
      notesList: notes,
      voiceTime: this.voiceInfo.voiceTime,
    });
    return noteChar;
  }
}
