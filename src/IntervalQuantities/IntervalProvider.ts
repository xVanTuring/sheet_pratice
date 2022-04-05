export enum Direction {
  Up,
  Down,
  Random,
}

export interface IntervalProvider {
  next(): { notes: string[]; answer: number };
  setDirection(direction: Direction): void;
  available(): boolean;
}
