class CommandManager {
  undos = []
  redos = []
  constructor (count = 10) {
    this.count = count
  }
  execute (cmd) {
    cmd.execute()
    this.undos.push(cmd)
    if (this.undos.length > this.count) {
      this.undos.shift()
    }
    this.redos.splice(0, this.redos.length)
  }
  undo () {
    if (this.undos.length === 0) return
    let cmd = this.undos.pop()
    cmd.undo()
    this.redos.push(cmd)
  }
  redo () {
    if (this.redos.length === 0) return
    let cmd = this.redos.pop()
    cmd.execute()
    this.undos.push(cmd)
  }
}

export default CommandManager
