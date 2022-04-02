// https://www.onlinemusictools.com/kb/
export enum MIDINoteStatus {
  NOTEON = 144,
  NOTEOFF = 128,
}
type NotePressed = (note: string) => void;
export class MidiInput {
  private onNoteDown: NotePressed | null = null;
  private onNoteUp: NotePressed | null = null;
  available() {
    return navigator.requestMIDIAccess != null;
  }

  start() {
    navigator.requestMIDIAccess().then((midi) => {
      this.refresh(midi);
      midi.onstatechange = (e) => this.refresh(e.target as any);
    });
  }

  private refresh(midi: WebMidi.MIDIAccess) {
    midi.inputs.forEach((input) => {
      console.log(`Connecting to ${input.name}`);
      input.onmidimessage = (msg) => {
        this.onMessage(msg);
      };
    });
  }

  private onMessage(msg: WebMidi.MIDIMessageEvent) {
    //   https://stackoverflow.com/questions/712679/convert-midi-note-numbers-to-name-and-octave
    const type = msg.data[0];
    const note = msg.data[1];
    let noteStave = this.noteIdToNoteName(note);
    if (type === MIDINoteStatus.NOTEON) {
      this.onNoteDown?.(noteStave);
    }
    if (type === MIDINoteStatus.NOTEOFF) {
      this.onNoteUp?.(noteStave);
    }
  }

  setOnNoteDown(cb: NotePressed) {
    this.onNoteDown = cb;
  }
  setOnNoteUp(cb: NotePressed) {
    this.onNoteUp = cb;
  }
  noteIdToNoteName(initialNote: number) {
    let noteString = [
      "c",
      "c#",
      "d",
      "d#",
      "e",
      "f",
      "f#",
      "g",
      "g#",
      "a",
      "a#",
      "b",
    ];

    let octave = Math.floor(initialNote / 12) - 1;
    let noteIndex = initialNote % 12;
    let note = noteString[noteIndex];
    return `${note}/${octave}`;
  }
}
