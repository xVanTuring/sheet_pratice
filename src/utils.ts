const noteOrder: NoteName[] = ["c", "d", "e", "f", "g", "a", "b"];
export type NoteName = "c" | "d" | "e" | "f" | "g" | "a" | "b";
function nextNoteName(note: NoteName): NoteName {
  if (note === "g") {
    return "a";
  }
  return String.fromCharCode(note.charCodeAt(0) + 1) as NoteName;
}
function preNoteName(note: NoteName): NoteName {
  if (note === "a") {
    return "g";
  }
  return String.fromCharCode(note.charCodeAt(0) - 1) as NoteName;
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
export function nextNoteBy(
  a: { noteName: NoteName; group: number },
  by: number
) {
  let _iter = by - 1;
  while (_iter) {
    a = nextNote(a);
    _iter--;
  }
  return a
}
export function preNoteBy(
  a: { noteName: NoteName; group: number },
  by: number
) {
  let _iter = by - 1;
  while (_iter) {
    a = preNote(a);
    _iter--;
  }
  return a
}
export function nextNote(a: { noteName: NoteName; group: number }) {
  return {
    noteName: nextNoteName(a.noteName),
    group: a.noteName === "b" ? a.group + 1 : a.group,
  };
}
export function preNote(a: { noteName: NoteName; group: number }) {
  return {
    noteName: preNoteName(a.noteName),
    group: a.noteName === "c" ? a.group - 1 : a.group,
  };
}
/**
 * both includes
 * @param from
 * @param to
 */
export function noteRange(from: string, to: string) {
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
export function noteNear(mid: string, near: number = 3) {
  let initial1 = {
    noteName: mid.split("/")[0] as NoteName,
    group: parseInt(mid.split("/")[1]),
  };
  let initial2 = {
    noteName: mid.split("/")[0] as NoteName,
    group: parseInt(mid.split("/")[1]),
  };
  let range: string[] = [];
  for (let index = 0; index < near; index++) {
    initial1 = preNote(initial1);
    range.push(`${initial1.noteName}/${initial1.group}`);
    initial2 = nextNote(initial2);
    range.push(`${initial2.noteName}/${initial2.group}`);
  }
  return range;
}

export function shuffle<T>(arr: T[]) {
  // https://github.com/ccforward/cc/issues/44
  let n = arr.length,
    random;
  while (0 != n) {
    random = (Math.random() * n--) >>> 0; // 无符号右移位运算符向下取整
    [arr[n], arr[random]] = [arr[random], arr[n]]; // ES6的结构赋值实现变量互换
  }
  return arr;
}
