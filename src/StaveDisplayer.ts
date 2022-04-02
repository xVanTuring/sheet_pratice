import { Renderer, Stave, SVGContext } from "vexflow";
export class StaveDisplayer {
  private context: SVGContext;
  private stave: Stave | null = null;
  private renderer: Renderer;
  private width: number = 110;
  constructor(
    private readonly div: HTMLDivElement,
    private clef: "treble" | "bass" = "treble",
    private readonly timeSignature = "4/4"
  ) {
    this.renderer = new Renderer(this.div, Renderer.Backends.SVG);

    this.renderer.resize(this.width + 80, 300);

    this.context = this.renderer.getContext() as SVGContext;
    this.draw();
  }
  setClef(clef: "treble" | "bass") {
    this.clef = clef;
  }

  private staveEle: SVGElement | null = null;

  draw() {
    if (this.staveEle) {
      this.context.svg.removeChild(this.staveEle);
    }
    this.staveEle = this.context.openGroup();
    this.stave = new Stave(0, 80, this.width);
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

  setWidth(width: number) {
    this.width = width;
    this.renderer.resize(width + 80, 300);
    this.draw();
  }
}
