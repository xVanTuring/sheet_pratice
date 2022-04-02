import { EqualDurationNoteDisplayer } from "./EqualDurationNoteDisplayer";
import { CoordinationNoteProvide } from "./NoteProvider/CoordinationNoteProvider";
import {
    bassNoteRanger,
    trebleNoteRanger
} from "./NoteProvider/RangeNoteProvider";
import { ReplayProvider } from "./NoteProvider/ReplayProvider";
import { NoteQuestion } from "./NoteQuestion";
import { QuestionProvider } from "./QuestionProvider";
import { Statistic } from "./Statistics";
import { StaveDisplayer } from "./StaveDisplayer";

export class NotePratice {
  private clef: "treble" | "bass" = "treble";
  private voidInfo = {
    subDuration: 4,
    voiceTime: {
      num_beats: 1,
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

  constructor(staveEle: HTMLDivElement, questionEle: HTMLDivElement) {
    this.staveDisplayer = new StaveDisplayer(staveEle, this.clef);
    this.notedisplayer = new EqualDurationNoteDisplayer(
      this.staveDisplayer.getContext(),
      this.staveDisplayer.getStave(),
      this.voidInfo
    );
    this.noteQuestion = new NoteQuestion(questionEle, 0);
    this.noteQuestion.resultCb = (key: string, right: boolean) => {
      if (right) {
        this.replayProvider.addRight(key);
        this.stat.addRight();
      } else {
        this.replayProvider.addWrong(key);
        this.stat.addWrong();
      }
      this.startQuestion();
    };
    this.startQuestion();
  }

  setClef(clef: "treble" | "bass") {
    if (clef !== this.clef) {
      this.clef = clef;
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
      this.startQuestion();
    }
  }

  startQuestion() {
    const note = this.questionProvider.nextQuestion();
    this.notedisplayer.draw(note);
    this.noteQuestion.setAnswer(note[0]);
  }
}
