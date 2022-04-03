import { VirtualKeyboard } from "./VirtualKeyboard";
type QuestionCallback = (key: string, result: boolean) => void;
export class Question {
  constructor(
    private readonly div: HTMLDivElement,
    private readonly virtualKeyboard: VirtualKeyboard | null = null,
    private readonly answerSize: number = 4,
    private readonly interval: number = 0,
    private readonly resultDelay: number = 1000
  ) {
    this.initAnswser();
  }
  private answerBtnList!: Array<HTMLDivElement>;

  private initAnswser() {
    this.answerBtnList = [];
    for (let index = 0; index < this.answerSize; index++) {
      this.answerBtnList.push(document.createElement("div"));
    }
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
  public extenalInput(note: string) {
    if (this.disabled) return;
    if (this.timeout != null) clearTimeout(this.timeout);
    const result = note === this.rightAnswer;
    this.showAnswer(result);
  }

  private disabled = false;

  private showAnswer(result: boolean) {
    this.disabled = true;
    this.answerBtnList[this.rightIndex].classList.add("right-answer");
    this.virtualKeyboard?.highlightKey(this.rightAnswer);
    setTimeout(
      () => {
        this.disabled = false;
        this.notifyListener(this.rightAnswer, result);
      },
      result ? 300 : this.resultDelay
    );
  }

  setAnswer(answer: string, selections: string[]) {
    this.answerBtnList.forEach((btn, idx) => {
      btn.classList.remove("right-answer");
      btn.innerText = selections[idx].toUpperCase();
    });
    this.virtualKeyboard?.removeKeyHighlight();

    const rightIndex = selections.indexOf(answer);
    this.rightIndex = rightIndex;
    this.rightAnswer = answer;
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
