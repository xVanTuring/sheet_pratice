// https://github.com/diversen/js-css-piano
type Pressed = (note: string) => void;
// TODO: toggle key name display
export class VirtualKeyboard {
  elem: HTMLDivElement;
  options: {
    octaves: number;
    octaveBegin: number;
  };
  constructor(
    private elemID: string,
    private pressCallBack: Pressed,
    ops?: {
      octaves: number;
      octaveBegin: number;
    }
  ) {
    this.elem = document.getElementById(elemID) as HTMLDivElement;
    this.options = Object.assign(
      {},
      {
        octaves: 2,
        octaveBegin: 3,
      },
      ops
    );
  }
  createPiano() {
    let html = this.getPianoHtml();
    this.elem.innerHTML = html;
    this.setEvents();
  }
  getPianoHtml() {
    let html = `<ul class="piano">`;
    for (let i = 1; i <= this.options.octaves; i++) {
      let currentOctave = this.options.octaveBegin;
      html += this.getTones(currentOctave);
      this.options.octaveBegin++;
    }
    html += `</ul>`;
    return html;
  }
  setEvents() {
    const elems = document.querySelectorAll("#" + this.elemID + " li ");
    elems.forEach((elem) => {
      elem.addEventListener("click", (event) => {
        let _note = (event.target as HTMLLIElement).dataset.note!;
        let stave = _note[_note.length - 1];
        let note = _note.substring(0, _note.length - 1);
        this.pressCallBack(`${note}/${stave}`);
      });
    });
  }
  getNoteAndOctave(note: string, octave: number) {
    return note + octave;
  }
  getTones(octave: number) {
    let octaveHTML = `
            <li class="white c" data-note="${this.getNoteAndOctave(
              "c",
              octave
            )}"></li>
            <li class="black cs" data-note="${this.getNoteAndOctave(
              "c#",
              octave
            )}"></li>
            <li class="white d" data-note="${this.getNoteAndOctave(
              "d",
              octave
            )}"></li>
            <li class="black ds" data-note="${this.getNoteAndOctave(
              "d#",
              octave
            )}"></li>
            <li class="white e" data-note="${this.getNoteAndOctave(
              "e",
              octave
            )}"></li>
            <li class="white f" data-note="${this.getNoteAndOctave(
              "f",
              octave
            )}"></li>
            <li class="black fs" data-note="${this.getNoteAndOctave(
              "f#",
              octave
            )}"></li>
            <li class="white g" data-note="${this.getNoteAndOctave(
              "g",
              octave
            )}"></li>
            <li class="black gs" data-note="${this.getNoteAndOctave(
              "g#",
              octave
            )}"></li>
            <li class="white a" data-note="${this.getNoteAndOctave(
              "a",
              octave
            )}"></li>
            <li class="black as" data-note="${this.getNoteAndOctave(
              "a#",
              octave
            )}"></li>
            <li class="white b" data-note="${this.getNoteAndOctave(
              "b",
              octave
            )}"></li>`;

    return octaveHTML;
  }

  highlightKey(note: string) {
    const noteInData = note.replace("/", "");
    let key = document.querySelector(
      `#${this.elemID} li[data-note="${noteInData}"]`
    );
    if (key != null) {
      key.classList.add("highlight");
    }
  }
  removeKeyHighlight() {
    let keys = document.querySelectorAll(`#${this.elemID} li.highlight`);
    keys.forEach((ele) => {
      ele.classList.remove("highlight");
    });
  }
}

export const keyboardTones = {
  a: "C",
  w: "C#",
  s: "D",
  e: "D#",
  d: "E",
  f: "F",
  t: "F#",
  g: "G",
  y: "G#",
  h: "A",
  u: "A#",
  j: "B",
};
