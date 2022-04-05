import { RangeNoteProvider } from "../NoteProvider/RangeNoteProvider";
import { ReplayProvider } from "../ReplayProvider";
import { EqualDurationNoteDisplayer } from "../views/EqualDurationNoteDisplayer";
import { Question } from "../views/Question";
import { StaveDisplayer } from "../views/StaveDisplayer";
import { Direction } from "./IntervalProvider";
import { RandomIntervalProvider } from "./RandomIntervalProvider";

export class IntervalQuantitiesPratice {
  private replayProvider = new ReplayProvider();

  private noteRanger = new RangeNoteProvider("c/4", "b/5");
  private direction: Direction = Direction.Up;
  private staveDisplayer: StaveDisplayer;
  private notedisplayer: EqualDurationNoteDisplayer;
  private questionView: Question;
  private intervalProvider: RandomIntervalProvider;
  constructor(staveEle: HTMLDivElement, questionEle: HTMLDivElement) {
    this.staveDisplayer = new StaveDisplayer(staveEle, "treble");
    this.notedisplayer = new EqualDurationNoteDisplayer(
      this.staveDisplayer.getContext(),
      this.staveDisplayer.getStave(),
      {
        clef: "treble",
        subDuration: 2,
        voiceTime: {
          beat_value: 4,
          num_beats: 4,
        },
      }
    );
    this.intervalProvider = new RandomIntervalProvider(
      this.noteRanger,
      this.direction
    );
    this.questionView = new Question(questionEle, null, 8);
    this.questionView.resultCb = this.onAnswered.bind(this);
  }
  question: string[] = [];
  start() {
    const { notes: question, answer: interval } =
      this.intervalProvider.next();
    this.question = question;
    this.notedisplayer.draw(this.question);
    this.questionView.setAnswer(String(interval), [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
    ]);
  }
  setDirection(){

  }
  onAnswered(_: string, right: boolean) {
    let qStr = this.question.join("-");
    if (right) {
      this.replayProvider.addRight(qStr);
    } else {
      this.replayProvider.addWrong(qStr);
    }
    this.start();
  }
}
