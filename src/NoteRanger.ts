import { noteRange } from "./utils";

export class NoteRanger {
  range!: string[];
  constructor(private start: string, private end: string) {
    this.setRange(this.start, this.end);
  }

  setRange(start: string, end: string) {
    this.start = start;
    this.end = end;
    this.range = noteRange(start, end);
  }

  next() {
    const randomNote =
      this.range[Math.floor(Math.random() * this.range.length)];
    return randomNote;
  }
}
export const bassNoteRanger = new NoteRanger("f/1", "g/4");

export const trebleNoteRanger = new NoteRanger("f/3", "e/6");
