import { RangeNoteProvider } from "../NoteProvider/RangeNoteProvider";
import { nextNoteBy, NoteName, preNoteBy } from "../utils";
import { Direction, IntervalProvider } from "./IntervalProvider";

export class RandomIntervalProvider implements IntervalProvider {
  constructor(
    private noteRanger: RangeNoteProvider,
    private direction: Direction
  ) {}

  next(): { notes: string[]; answer: number } {
    const note = this.noteRanger.next();
    const interval = Math.floor(Math.random() * 8) + 1;

    let nearNote = {
      noteName: note.split("/")[0] as NoteName,
      group: parseInt(note.split("/")[1]),
    };
    if (this.direction === Direction.Up) {
      nearNote = nextNoteBy(nearNote, interval);
    } else if (this.direction === Direction.Down) {
      nearNote = preNoteBy(nearNote, interval);
    } else {
      nearNote =
        Math.random() > 0.5
          ? preNoteBy(nearNote, interval)
          : nextNoteBy(nearNote, interval);
    }
    return {
      notes: [note, `${nearNote.noteName}/${nearNote.group}`],
      answer: interval,
    };
  }

  setDirection(direction: Direction) {
    this.direction = direction;
  }
  available(): boolean {
    return true;
  }
}
