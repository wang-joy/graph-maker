import GraphSvg from '../GraphSvg'

export default {
  svgs: [],
  create (id) {
    let svg = new GraphSvg(id)
    this.svgs.push(svg)
  },
  remove (id) {
    this.svgs = this.svgs.filter(el => el.id !== id)
  },
  getById (id) {
    return this.svgs.find(el => el.id === id)
  }
}
