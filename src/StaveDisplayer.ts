import { Renderer, Stave, SVGContext } from "vexflow";

export class StaveDisplayer {
  private context: SVGContext;
  private stave: Stave | null = null;
  constructor(
    private readonly div: HTMLDivElement,
    private readonly clef: "treble" | "bass" = "treble"
  ) {
    const renderer = new Renderer(this.div, Renderer.Backends.SVG);

    renderer.resize(350, 180);

    this.context = renderer.getContext() as SVGContext;
  }

  private staveEle: SVGElement | null = null;

  draw() {
    if (this.staveEle) {
      this.context.svg.removeChild(this.staveEle);
    }
    this.staveEle = this.context.openGroup();
    this.stave = new Stave(0, 0, 300);
    this.stave.addClef(this.clef).addTimeSignature("4/4");
    this.stave.setContext(this.context).draw();
    this.context.closeGroup();
  }

  getContext() {
    return this.context;
  }
  getStave() {
    if (this.stave == null) {
      throw "Stave is not existed";
    }
    return this.stave;
  }
}
