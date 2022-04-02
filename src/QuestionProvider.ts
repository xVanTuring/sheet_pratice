import { VoiceTime } from "vexflow";
import { NoteProvider } from "./NoteProvider/NoteProvider";

export class QuestionProvider {
  private beatCount: number;
  constructor(
    private readonly randomNote: NoteProvider,
    private voiceInfo: {
      voiceTime: VoiceTime;
      subDuration: number;
      clef: "treble" | "bass";
    }
  ) {
    const totalDuration =
      (1 / this.voiceInfo.voiceTime.beat_value) *
      this.voiceInfo.voiceTime.num_beats;
    this.beatCount = totalDuration / (1 / this.voiceInfo.subDuration);
  }

  nextQuestion() {
    const noteChar = Array(this.beatCount)
      .fill(1)
      .map(() => this.randomNote.next());
    return noteChar;
  }
}
