import { randomOneNote } from "./utils";

export class NoteQuestion {
  constructor(
    private readonly div: HTMLDivElement,
    private readonly interval: number,
    private readonly resultDelay: number = 500
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
    if (this.disabled) return;
    if (this.timeout != null) clearTimeout(this.timeout);
    const result = idx === this.rightIndex;
    this.showAnswer(result);
  }
  private disabled = false;
  private showAnswer(result: boolean) {
    this.disabled = true;
    this.answerBtnList[this.rightIndex].classList.add("right-answer");

    setTimeout(() => {
      this.disabled = false;
      this.notifyListener(result);
    }, this.resultDelay);
  }

  setAnswer(note: string, clef: "bass" | "treble") {
    let selections: string[] = [];
    for (let index = 0; index < 4; index++) {
      let _note = "";
      do {
        _note = randomOneNote(clef);
      } while (_note === note || selections.includes(_note));
      selections.push(_note);
    }
    this.answerBtnList.forEach((btn, idx) => {
      btn.classList.remove("right-answer");
      btn.innerText = selections[idx].toUpperCase();
    });

    const rightIndex = Math.floor(Math.random() * this.answerBtnList.length);
    const randomOne = this.answerBtnList[rightIndex];
    randomOne.innerText = note.toUpperCase();
    this.rightIndex = rightIndex;
    if (this.interval !== 0) {
      this.timeout = setTimeout(() => {
        this.showAnswer(false);
      }, this.interval);
    }
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
