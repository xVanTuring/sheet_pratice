import { EqualDurationNoteDisplayer } from "./EqualDurationNoteDisplayer";
import { CoordinationNoteProvide } from "./NoteProvider/CoordinationNoteProvider";
import {
  bassNoteRanger,
  trebleNoteRanger,
} from "./NoteProvider/RangeNoteProvider";
import { ReplayProvider } from "./NoteProvider/ReplayProvider";
import { NoteQuestion } from "./NoteQuestion";
import { QuestionProvider } from "./QuestionProvider";
import { Statistic } from "./Statistics";
import { StaveDisplayer } from "./StaveDisplayer";
const DurationToSize = {
  1: 110,
  2: 130,
  4: 150,
  8: 300,
  16: 520,
};
export class NotePratice {
  private clef: "treble" | "bass" = "treble";
  private voidInfo = {
    subDuration: 1,
    voiceTime: {
      num_beats: 4,
      beat_value: 4,
    },
    clef: this.clef,
  };
  private replayProvider = new ReplayProvider(15);
  private coordNoteProvider = new CoordinationNoteProvide([
    {
      provider: this.replayProvider,
      weight: 2,
    },
    {
      provider: trebleNoteRanger,
      weight: 1,
    },
  ]);

  private questionProvider = new QuestionProvider(
    this.coordNoteProvider,
    this.voidInfo
  );
  private stat = new Statistic();

  private staveDisplayer: StaveDisplayer;
  private notedisplayer: EqualDurationNoteDisplayer;
  private noteQuestion: NoteQuestion;

  constructor(
    staveEle: HTMLDivElement,
    questionEle: HTMLDivElement,
    private indexElement: HTMLDivElement
  ) {
    this.staveDisplayer = new StaveDisplayer(staveEle, this.clef);
    this.notedisplayer = new EqualDurationNoteDisplayer(
      this.staveDisplayer.getContext(),
      this.staveDisplayer.getStave(),
      this.voidInfo
    );
    this.noteQuestion = new NoteQuestion(questionEle, "piano-keyboard", 0);
    this.noteQuestion.resultCb = this.onAnswered.bind(this);
  }
  private onAnswered(key: string, right: boolean) {
    if (right) {
      this.replayProvider.addRight(key);
      this.stat.addRight();
    } else {
      this.replayProvider.addWrong(key);
      this.stat.addWrong();
    }
    this.continueSeq();
  }

  setClef(clef: "treble" | "bass") {
    if (clef !== this.clef) {
      this.clef = clef;
      this.replayProvider.setClef(clef);
      this.coordNoteProvider.updateProvider([
        {
          provider: this.replayProvider,
          weight: 3,
        },
        {
          provider: clef === "bass" ? bassNoteRanger : trebleNoteRanger,
          weight: 1,
        },
      ]);
      this.staveDisplayer.setClef(clef);
      this.staveDisplayer.draw();
      this.notedisplayer.setClef(clef);
      this.stat.reset();

      this.question.length = 0;
      this.continueSeq();
    }
  }

  private question: string[] = [];
  private index = 0;

  continueSeq() {
    if (this.question.length === 0) {
      this.resetQuestion();
    }
    this.index++;
    const note = this.question.shift()!;
    this.noteQuestion.setAnswer(note);
    this.indexElement.innerText = `No. ${this.index}`;
  }

  resetQuestion() {
    this.index = 0;
    this.question = this.questionProvider.nextQuestion();
    this.notedisplayer.draw(this.question);
  }

  resetWidth(width: number) {
    this.staveDisplayer.setWidth(width);
  }

  setSubDuration(subDuration: 1 | 2 | 4 | 8) {
    this.voidInfo.subDuration = subDuration;
    this.resetWidth(DurationToSize[subDuration]);
    this.question.length = 0;
    this.continueSeq();
  }
}
