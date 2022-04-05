import { ReplayProvider } from "../ReplayProvider";
import { Direction, IntervalProvider } from "./IntervalProvider";
import { RandomIntervalProvider } from "./RandomIntervalProvider";

export class CoordinationIntervalProvider implements IntervalProvider {
  constructor(
    private readonly randomInterval: RandomIntervalProvider,
    private readonly replay: ReplayProvider,
  ) {
  }
  next(): { notes: string[]; answer: number } {
    return null!;
  }
  setDirection(direction: Direction): void {
    this.randomInterval.setDirection(direction);
  }
  available(): boolean {
    return true;
  }
}
