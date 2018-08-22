export default function update(time, delta) {
  this._player.x = this._player._x * 64
  this._player.y = this._player._y * 64

  this._monsters.forEach(m => {
    m.x = m._x * 64;
    m.y = m._y * 64;
  })

  const tile = this._map.getTileAt(this._player._x, this._player._y, true, "floor")

  const div = document.getElementById("message")
  div.textContent = `Score: ${this.sys.game._score}`
}
