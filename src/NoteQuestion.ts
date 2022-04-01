import { randomOneBassNote, randomOneTrebleNote } from "./utils";

export class NoteQuestion {
  constructor(
    private readonly div: HTMLDivElement,
    private readonly interval: number
  ) {
    this.initAnswser();
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

  private answerBtnClicked(idx: number) {
    if (this.timeout != null) clearTimeout(this.timeout);
    const result = idx === this.rightIndex;
    this.showAnswer(result);
  }

  private showAnswer(result: boolean) {
    this.answerBtnList[this.rightIndex].classList.add("right-answer");

    setTimeout(() => {
      this.notifyListener(result);
    }, 1000);
  }

  setAnswer(note: string, clef: string) {
    this.answerBtnList.forEach((btn) => {
      btn.classList.remove("right-answer");
      btn.innerText =
        clef === "bass"
          ? randomOneBassNote().toUpperCase()
          : randomOneTrebleNote().toUpperCase();
    });
    const rightIndex = Math.floor(Math.random() * this.answerBtnList.length);
    const randomOne = this.answerBtnList[rightIndex];
    randomOne.innerText = note.toUpperCase();
    this.rightIndex = rightIndex;
    this.timeout = setTimeout(() => {
      this.showAnswer(false);
    }, this.interval);
  }
  private timeout: number | null = null;
  private _resultCb: ((result: boolean) => void) | null = null;

  public set resultCb(_resultCb: (result: boolean) => void) {
    this._resultCb = _resultCb;
  }
  private notifyListener(result: boolean) {
    if (this._resultCb != null) {
      this._resultCb(result);
    }
  }
}
