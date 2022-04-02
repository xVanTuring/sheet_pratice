export interface NoteProvider {
  next(): string;
  available(): boolean;
}
