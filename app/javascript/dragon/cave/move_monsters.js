export default function moveMonsters() {
  this._monsters.forEach(m => {
    if (m._y === 4) {
      m._y = 3;
    }
    else {
      m._y = 4;
    }
  })
}
