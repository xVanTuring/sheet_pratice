import { NoteProvider } from "./NoteProvider";
import { randomItem } from "./utils";

export class CoordinationNoteProvide implements NoteProvider {
  constructor(private providers: { provider: NoteProvider; weight: number }[]) {
    this.providers.sort((a, b) => a.weight - b.weight);
  }
  next(): string {
    if (!this.available()) {
      throw "Not Available";
    }
    const availableProviders = this.providers.filter((p) =>
      p.provider.available()
    );

    const providers = randomItem(availableProviders);
    return providers.provider.next();
  }
  available() {
    return this.providers.some((p) => p.provider.available() && p.weight > 0);
  }

  updateProvider(providers: { provider: NoteProvider; weight: number }[]) {
    this.providers = providers;
  }
}
