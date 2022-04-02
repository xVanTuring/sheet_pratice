import { noteNear, shuffle } from "./utils";
import { VirtualKeyboard } from "./VirtualKeyboard";
type QuestionCallback = (key: string, result: boolean) => void;
export class NoteQuestion {
  virtualKeyboard: VirtualKeyboard;
  constructor(
    private readonly div: HTMLDivElement,
    private readonly pianoId: string,
    private readonly interval: number,
    private readonly resultDelay: number = 1000
  ) {
    this.initAnswser();

    this.virtualKeyboard = new VirtualKeyboard(
      this.pianoId,
      this.onPianoPressed.bind(this),
      {
        octaveBegin: 1,
        octaves: 7,
      }
    );
    this.virtualKeyboard.createPiano();
  }
  private answerBtnList!: Array<HTMLDivElement>;

  private initAnswser() {
    this.answerBtnList = [
      document.createElement("div"),
      document.createElement("div"),
      document.createElement("div"),
      document.createElement("div"),
    ];
    for (const [i, htmlEle] of this.answerBtnList.entries()) {
      htmlEle.classList.add("answer-btn");
      this.div.appendChild(htmlEle);
      htmlEle.addEventListener("click", () => {
        this.answerBtnClicked(i);
      });
    }
  }
  private rightIndex: number = 0;
  private rightAnswer: string = "";

  private answerBtnClicked(idx: number) {
    if (this.disabled) return;
    if (this.timeout != null) clearTimeout(this.timeout);
    const result = idx === this.rightIndex;
    this.showAnswer(result);
  }
  private onPianoPressed(note: string) {
    if (this.disabled) return;
    if (this.timeout != null) clearTimeout(this.timeout);
    const result = note === this.rightAnswer;
    this.showAnswer(result);
  }

  private disabled = false;

  private showAnswer(result: boolean) {
    this.disabled = true;
    this.answerBtnList[this.rightIndex].classList.add("right-answer");
    this.virtualKeyboard.highlightKey(this.rightAnswer);
    setTimeout(
      () => {
        this.disabled = false;
        this.notifyListener(this.rightAnswer, result);
      },
      result ? 300 : this.resultDelay
    );
  }

  setAnswer(note: string) {
    const selections: string[] = shuffle(noteNear(note, 4));
    this.answerBtnList.forEach((btn, idx) => {
      btn.classList.remove("right-answer");
      btn.innerText = selections[idx].toUpperCase();
    });
    this.virtualKeyboard.removeKeyHighlight();

    const rightIndex = Math.floor(Math.random() * this.answerBtnList.length);
    const randomOne = this.answerBtnList[rightIndex];
    randomOne.innerText = note.toUpperCase();
    this.rightIndex = rightIndex;
    this.rightAnswer = note;
    if (this.interval !== 0) {
      this.timeout = setTimeout(() => {
        this.showAnswer(false);
      }, this.interval);
    }
  }
  private timeout: number | null = null;
  private _resultCb: QuestionCallback | null = null;

  public set resultCb(_resultCb: QuestionCallback) {
    this._resultCb = _resultCb;
  }
  private notifyListener(key: string, result: boolean) {
    if (this._resultCb != null) {
      this._resultCb(key, result);
    }
  }
}
