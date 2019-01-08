class Cursor {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.left = 0
    this.top = 0
    this.pointX = x
    this.pointY = y
  }
  setPoint (point) {
    this.pointX = point.x - this.left
    this.pointY = point.y - this.top
    this.__calc()
    return this
  }
  setScroll (top, left) {
    this.top = top
    this.left = left
    this.__calc()
    return this
  }
  __calc () {
    this.x = this.pointX + this.left
    this.y = this.pointY + this.top
  }
}
export default Cursor
