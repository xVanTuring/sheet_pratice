const noteOrder: NoteName[] = ["c", "d", "e", "f", "g", "a", "b"];
type NoteName = "c" | "d" | "e" | "f" | "g" | "a" | "b";
function nextNoteName(note: NoteName): NoteName {
  if (note === "g") {
    return "a";
  }
  return String.fromCharCode(note.charCodeAt(0) + 1) as NoteName;
}
/**
 * less than 0 if a<b
 * larger than 1 if a>b
 * 0 if equal
 * @param a
 * @param b
 */
function compareNote(
  a: { noteName: NoteName; group: number },
  b: { noteName: NoteName; group: number }
) {
  if (a.noteName === b.noteName && a.group === b.group) {
    return 0;
  }
  if (a.group > b.group) {
    return 1;
  }
  if (a.group < b.group) {
    return -1;
  }
  if (noteOrder.indexOf(a.noteName) > noteOrder.indexOf(b.noteName)) {
    return 1;
  }
  return -1;
}
function nextNote(a: { noteName: NoteName; group: number }) {
  return {
    noteName: nextNoteName(a.noteName),
    group: a.noteName === "b" ? a.group + 1 : a.group,
  };
}
/**
 * both includes
 * @param from
 * @param to
 */
function noteRange(from: string, to: string) {
  let range: string[] = [];
  let initial = {
    noteName: from.split("/")[0] as NoteName,
    group: parseInt(from.split("/")[1]),
  };
  const last = {
    noteName: to.split("/")[0] as NoteName,
    group: parseInt(to.split("/")[1]),
  };
  while (compareNote(initial, last) <= 0) {
    range.push(`${initial.noteName}/${initial.group}`);
    initial = nextNote(initial);
  }
  return range;
}
const trebleNoteRange = noteRange("f/3", "e/6");
function randomOneTrebleNote(): string {
  const randomElement =
    trebleNoteRange[Math.floor(Math.random() * trebleNoteRange.length)];
  return randomElement;
}
const bassNoteRange = noteRange("f/1", "g/4");
function randomOneBassNote(): string {
  const randomElement =
    bassNoteRange[Math.floor(Math.random() * bassNoteRange.length)];
  return randomElement;
}

console.log(bassNoteRange, trebleNoteRange);
export function randomOneNote(clef: "bass" | "treble") {
  if (clef === "bass") {
    return randomOneBassNote();
  }
  return randomOneTrebleNote();
}
