export default function update(time, delta) {
  if (this.sys.game._over) return

  this._player.x = this._player._x * 64
  this._player.y = this._player._y * 64

  if (this._player._strong) {
    this._player.setAlpha(0.0)
    this._strongPlayer.setAlpha(1.0)
    this._strongPlayer.x = this._player.x
    this._strongPlayer.y = this._player.y
    this._strongPlayer.setFrame(this._player.frame.name)
  }
  else {
    this._player.setAlpha(1.0)
    this._strongPlayer.setAlpha(0.0)
  }

  this._monsters.forEach(m => {
    m.x = m._x * 64;
    m.y = m._y * 64;
  })

  this._hearts.forEach(h => {
    h.x = h._x * 64;
    h.y = h._y * 64;
  })

  const monster = this._monsters.find(m => {
    return (m.alpha === 1.0) &&
      (m._x === this._player._x) && (m._y === this._player._y)
  })

  const heart = this._hearts.find(h => {
    return (h.alpha === 1.0) &&
      (h._x === this._player._x) && (h._y === this._player._y)
  })

  if (monster) {
    if (this._player._strong) {
      monster.setAlpha(0.0)
    }
    else {
      gameOver(this)
    }
  }
  else {
    if (heart) {
      heart.setAlpha(0.0)
      this._player._strong = true
      this.time.addEvent({
        delay: 3000,
        callback: unsetStrongFlag,
        callbackScope: this,
        loop: false
      })
    }
    updateMessage(`Score: ${this.sys.game._score}`)
  }
}

function gameOver(scene) {
  scene.sys.game._over = true

  scene.cameras.main.shake(500)

  updateMessage(`Score: ${scene.sys.game._score} GAME OVER`)

  scene.time.delayedCall(500, () => {
    const div = document.getElementById("game-over");
    div.style.display = "block";
    scene.scene.pause();
  }, [], scene);
}

function updateMessage(message) {
  const div = document.getElementById("message")

  div.textContent = message
}

function unsetStrongFlag() {
  this._player._strong = false
}
