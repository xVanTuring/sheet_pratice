export class Statistic {
  constructor(private readonly questionDelay = 500) {}
  private total = 0;
  private right = 0;
  addRight() {
    this.right++;
    this.total++;
    this.calcDuration();
  }
  addWrong() {
    this.total++;
    this.calcDuration();
  }
  private lastTime = 0;
  private spend = 0;
  calcDuration() {
    if (this.lastTime === 0) {
      this.lastTime = Date.now();
    } else {
      this.spend += Date.now() - this.lastTime - this.questionDelay;
      this.lastTime = Date.now();
    }
  }
  getStatus() {
    return {
      total: this.total,
      right: this.right,
      spendTotal: this.spend,
      spendPer: this.spend / this.total,
    };
  }
}
