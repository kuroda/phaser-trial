export default function update(time, delta) {
  if (this.sys.game._over) return

  this._player.x = this._player._x * 64
  this._player.y = this._player._y * 64

  this._monsters.forEach(m => {
    m.x = m._x * 64;
    m.y = m._y * 64;
  })

  const found = this._monsters.find(m => {
    return (m._x === this._player._x) && (m._y === this._player._y)
  })

  if (found) {
    gameOver(this)
  }
  else {
    updateMessage(`Score: ${this.sys.game._score}`)
  }
}

function gameOver(scene) {
  scene.sys.game._over = true

  scene.cameras.main.shake(500)

  updateMessage(`Score: ${scene.sys.game._score} GAME OVER`)

  scene.time.delayedCall(500, () => {
    scene.scene.pause();
  }, [], scene);
}

function updateMessage(message) {
  const div = document.getElementById("message")

  div.textContent = message
}
