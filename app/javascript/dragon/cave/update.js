export default function update(time, delta) {
  if (this.sys.game._over) return

  this._player.x = this._player._x * 64
  this._player.y = this._player._y * 64

  this._monsters.forEach(m => {
    m.x = m._x * 64;
    m.y = m._y * 64;
  })

  const div = document.getElementById("message")

  const found = this._monsters.find(m => {
    return (m._x === this._player._x) && (m._y === this._player._y)
  })

  if (found) {
    this.sys.game._over = true

    this.cameras.main.shake(500)

    div.textContent = `Score: ${this.sys.game._score} GAME OVER`

    this.time.delayedCall(500, () => {
      this.scene.pause();
    }, [], this);
  }
  else {
    div.textContent = `Score: ${this.sys.game._score}`
  }
}
