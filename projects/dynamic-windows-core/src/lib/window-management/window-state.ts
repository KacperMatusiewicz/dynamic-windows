export class WindowState {
  private x: number
  private y: number
  private width: number
  private height: number


  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  public getX(): number{ return this.x}
  public getY(): number{ return this.y}
  public getW(): number{ return this.width}
  public getH(): number{ return this.height}
}
