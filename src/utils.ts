export function randomOneTrebleNote(): string {
  const noteList = ["a", "b", "c", "d", "e", "f", "g"];
  const pos = [3, 4, 5];
  const randomElement = noteList[Math.floor(Math.random() * noteList.length)];
  const randomPos = pos[Math.floor(Math.random() * pos.length)];
  if (randomPos === 3 && randomElement < "f") {
    return randomOneTrebleNote();
  }
  return `${randomElement}/${randomPos}`;
}

export function randomOneBassNote(): string {
  const noteList = ["a", "b", "c", "d", "e", "f", "g"];
  const pos = [3];
  const randomElement = noteList[Math.floor(Math.random() * noteList.length)];
  const randomPos = pos[Math.floor(Math.random() * pos.length)];
  return `${randomElement}/${randomPos}`;
}
