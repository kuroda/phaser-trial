import * as CONSTANTS from "../constants";

export default function moveMonsters() {
  const scene = this.sys.game._currentScene();

  this._monsters.forEach(m => {
    moveMonster(scene, m)
  })
}

function moveMonster(scene, monster) {
  const r = getRandomInt(4);

  let deltaX = 0;
  let deltaY = 0;

  if (r == 0) deltaX = -1;
  else if (r == 1) deltaX = 1;
  else if (r == 2) deltaY = -1;
  else deltaY = 1;

  if (movableTo(monster, scene, deltaX, deltaY)) {
    if (r == 0) monster.setFrame(CONSTANTS.MONSTER_LEFT)
    else if (r == 1) monster.setFrame(CONSTANTS.MONSTER_RIGHT)

    monster._x = monster._x + deltaX;
    monster._y = monster._y + deltaY;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function movableTo(monster, scene, deltaX, deltaY) {
  const x = monster._x + deltaX
  const y = monster._y + deltaY

  if (x === 0 || x === scene._map.width - 1) return false
  if (y === 0 || y === scene._map.height - 1) return false

  const tile = scene._map.getTileAt(x, y, true, "floor")

  return !CONSTANTS.COLLISION_TILES.includes(tile.index)
}
