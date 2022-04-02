import { NoteProvider } from "./NoteProvider";
import { randomItem } from "./utils";

export class ReplayProvider implements NoteProvider {
  private map: Map<string, number>;

  constructor(private readonly size = 10) {
    this.map = new Map();
  }

  public addWrong(note: string) {
    if (this.map.has(note)) {
      this.map.set(note, this.map.get(note)! + 1);
    } else {
      this.addNewNote(note);
    }
  }
  public addRight(note: string) {
    if (this.map.has(note)) {
      if (this.map.get(note)! - 1 === 0) {
        this.map.delete(note);
      } else {
        this.map.set(note, this.map.get(note)! - 1);
      }
    }
  }

  private addNewNote(note: string) {
    if (this.map.size >= this.size) {
      // find minial and remove
      let key = "";
      let _small = Infinity;
      for (const [k, v] of this.map.entries()) {
        if (v <= _small) {
          _small = v;
          key = k;
        }
      }
      this.map.delete(key);
    }
    this.map.set(note, 1);
  }

  public next() {
    let fullList: { note: string; weight: number }[] = [];
    this.map.forEach((v, k) => {
      fullList.push({
        note: k,
        weight: v,
      });
    });
    console.log("Hit Replay");
    return randomItem(fullList).note;
  }

  available() {
    return this.map.size > 0;
  }
}
