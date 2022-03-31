export function randomTrebleNotes(): string {
  const noteList = ["a", "b", "c", "d", "e", "f", "g"];
  const pos = [3, 4, 5];
  const randomElement = noteList[Math.floor(Math.random() * noteList.length)];
  const randomPos = pos[Math.floor(Math.random() * pos.length)];
  if (randomPos === 3 && randomElement < "f") {
    return randomTrebleNotes();
  }
  return `${randomElement}/${randomPos}`;
}
