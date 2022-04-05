import { EqualDurationNoteDisplayer } from "../views/EqualDurationNoteDisplayer";
import { RangeNoteProvider } from "../NoteProvider/RangeNoteProvider";
import { ReplayProvider } from "../NoteProvider/ReplayProvider";
import { Question } from "../views/Question";
import { StaveDisplayer } from "../views/StaveDisplayer";
import { nextNote, nextNoteBy, NoteName, preNote, preNoteBy } from "../utils";

export class IntervalQuantitiesPratice {
  private replayProvider = new ReplayProvider();

  private noteRanger = new RangeNoteProvider("c/4", "b/5");
  private upDirection: boolean = true;
  private staveDisplayer: StaveDisplayer;
  private notedisplayer: EqualDurationNoteDisplayer;
  private questionView: Question;
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
    this.questionView = new Question(questionEle, null, 8);
    this.questionView.resultCb = this.onAnswered.bind(this);
  }
  question: string[] = [];
  start() {
    const note = this.noteRanger.next();
    const interval = Math.floor(Math.random() * 8) + 1;

    let nearNote = {
      noteName: note.split("/")[0] as NoteName,
      group: parseInt(note.split("/")[1]),
    };
    if (this.upDirection) {
      nearNote = nextNoteBy(nearNote, interval);
    } else {
      nearNote = preNoteBy(nearNote, interval);
    }

    
    this.question = [note, `${nearNote.noteName}/${nearNote.group}`];
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
