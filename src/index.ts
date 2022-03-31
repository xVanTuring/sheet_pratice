import { Formatter, SVGContext, Vex, Voice } from "vexflow";
const { Renderer, Stave, StaveNote } = Vex.Flow;
function randomTrebleNotes():string {
  const noteList = ["a", "b", "c", "d", "e", "f", "g"];
  const pos = [3, 4, 5];
  const randomElement = noteList[Math.floor(Math.random() * noteList.length)];
  const randomPos = pos[Math.floor(Math.random() * pos.length)];
  if (randomPos === 3 && randomElement < "f") {
    return randomTrebleNotes();
  }
  return `${randomElement}/${randomPos}`;
}

const div = document.getElementById("output") as HTMLDivElement;

const renderer = new Renderer(div, Renderer.Backends.SVG);

renderer.resize(200, 180);

const context = renderer.getContext() as SVGContext;

const stave = new Stave(0, 0, 120);
stave.addClef("treble").addTimeSignature("1/1");
stave.setContext(context).draw();

const drawOneNote=(()=>{
    let __group = null;
    return function () {
      if (__group) {
        context.svg.removeChild(__group);
      }
      __group = context.openGroup();
      let note = randomTrebleNotes()
      const notes = [new StaveNote({ keys: [note,"c/3"], duration: "1" })];
      const voice = new Voice({ num_beats: 1, beat_value: 1 });
      voice.addTickables(notes);
      new Formatter().joinVoices([voice]).format([voice]);
      voice.draw(context, stave);
      context.closeGroup();
      return note
    }
})()

setInterval(() => {
  let notes = drawOneNote();
  console.log(notes)
}, 2000);
