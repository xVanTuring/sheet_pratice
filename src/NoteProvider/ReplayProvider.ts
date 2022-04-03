import { NoteProvider } from "./NoteProvider";
import { randomItem } from "./utils";
export interface ReplayProviderConfig {
  // 词典大小
  size: number;
  // 0-1答对时调整值
  learnRate: number;
  keepNegetaive: boolean;
}
export class ReplayProvider implements NoteProvider {
  private map: Map<string, number>;
  private bassMap: Map<string, number>;
  private trebleMap: Map<string, number>;

  constructor(
    private readonly config: ReplayProviderConfig = {
      size: 0,
      learnRate: 0.5,
      keepNegetaive: false,
    }
  ) {
    this.bassMap = new Map();
    this.trebleMap = new Map();
    this.map = this.trebleMap;
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
      if (!this.config.keepNegetaive && this.map.get(note)! - 1 <= 0) {
        this.map.delete(note);
      } else {
        this.map.set(note, this.map.get(note)! - 0.5);
      }
    } else if (this.config.keepNegetaive) {
      this.map.set(note, -0.5);
    }
  }

  private deleteMinialKey() {
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

  private shouldDeleteNote() {
    return this.config.size !== 0 && this.map.size >= this.config.size;
  }

  private addNewNote(note: string) {
    if (this.shouldDeleteNote()) {
      this.deleteMinialKey();
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
    return randomItem(fullList).note;
  }

  available() {
    return this.map.size > 0;
  }

  setClef(clef: "bass" | "treble") {
    if (clef === "bass") {
      this.map = this.bassMap;
    } else {
      this.map = this.trebleMap;
    }
  }
}
