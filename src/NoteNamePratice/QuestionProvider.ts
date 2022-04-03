import { VoiceTime } from "vexflow";
import { NoteProvider } from "../NoteProvider/NoteProvider";

export class QuestionProvider {
  constructor(
    private readonly randomNote: NoteProvider,
    private voiceInfo: {
      voiceTime: VoiceTime;
      subDuration: number;
    }
  ) {}

  nextQuestion() {
    const totalDuration =
      (1 / this.voiceInfo.voiceTime.beat_value) *
      this.voiceInfo.voiceTime.num_beats;
    const beatCount = totalDuration / (1 / this.voiceInfo.subDuration);
    const noteChar = Array(beatCount)
      .fill(1)
      .map(() => this.randomNote.next());
    return noteChar;
  }
}
