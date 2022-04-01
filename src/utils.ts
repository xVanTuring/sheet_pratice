function randomOneTrebleNote(): string {
  const noteList = ["a", "b", "c", "d", "e", "f", "g"];
  const pos = [3, 4, 5];
  const randomElement = noteList[Math.floor(Math.random() * noteList.length)];
  const randomPos = pos[Math.floor(Math.random() * pos.length)];
  if (randomPos === 3 && ["c", "d", "e"].includes(randomElement)) {
    return randomOneTrebleNote();
  }
  return `${randomElement}/${randomPos}`;
}

function randomOneBassNote(): string {
  const noteList = ["a", "b", "c", "d", "e", "f", "g"];
  const pos = [2, 3, 4];
  const randomElement = noteList[Math.floor(Math.random() * noteList.length)];
  const randomPos = pos[Math.floor(Math.random() * pos.length)];
  if (randomPos === 4 && ["g", "a", " b"].includes(randomElement)) {
    return randomOneBassNote();
  }
  return `${randomElement}/${randomPos}`;
}

export function randomOneNote(clef: "bass" | "treble") {
  if (clef === "bass") {
    return randomOneBassNote();
  }
  return randomOneTrebleNote();
}
