import { Stave, StaveNote, SVGContext, VoiceTime } from "vexflow";
import { NoteDisplayer } from "./NoteDisplayer";
import { randomOneTrebleNotes } from "./utils";

export class EquanDurationNoteDisplayer extends NoteDisplayer {
  private beatCount: number;
  constructor(
    context: SVGContext,
    stave: Stave,
    private readonly voiceInfo: {
      voiceTime: VoiceTime;
      subDuration: number;
    }
  ) {
    super(context, stave);
    const totalDuration =
      (1 / this.voiceInfo.voiceTime.beat_value) *
      this.voiceInfo.voiceTime.num_beats;
    this.beatCount = totalDuration / (1 / this.voiceInfo.subDuration);
  }
  draw() {
    console.log(this.beatCount);
    const noteChar = Array(this.beatCount)
      .fill(1)
      .map(() => randomOneTrebleNotes());
    const notes = noteChar.map((note) => {
      return new StaveNote({
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
