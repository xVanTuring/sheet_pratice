import { Renderer, Stave, SVGContext } from "vexflow";

export class StaveDisplayer {
  private context: SVGContext;
  private stave: Stave | null = null;
  constructor(
    private readonly div: HTMLDivElement,
    private readonly clef: "treble" | "bass" = "treble",
    private readonly timeSignature = "4/4"
  ) {
    const renderer = new Renderer(this.div, Renderer.Backends.SVG);

    renderer.resize(150, 300);

    this.context = renderer.getContext() as SVGContext;
  }

  private staveEle: SVGElement | null = null;

  draw() {
    if (this.staveEle) {
      this.context.svg.removeChild(this.staveEle);
    }
    this.staveEle = this.context.openGroup();
    this.stave = new Stave(0, 80, 120);
    this.stave.addClef(this.clef).addTimeSignature(this.timeSignature);
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
