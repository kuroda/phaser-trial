import * as CONSTANTS from "../constants";

export default function moveMonsters() {
  const scene = this.sys.game._currentScene();

  this._monsters.forEach(monster => {
    changeDirection(scene, monster);
    moveMonster(scene, monster)
  })
}

function getVector(direction) {
  let deltaX = 0;
  let deltaY = 0;

  if (direction == CONSTANTS.LEFT) deltaX = -1;
  else if (direction == CONSTANTS.RIGHT) deltaX = 1;
  else if (direction == CONSTANTS.UP) deltaY = -1;
  else if (direction == CONSTANTS.DOWN) deltaY = 1;

  return [deltaX, deltaY];
}

function changeDirection(scene, monster) {
  const movableDirections = [0, 1, 2, 3].filter(i => {
    return movableTo(scene, monster, getVector(i));
  })

  if (movableDirections.length == 0) {
    monster._direction = CONSTANTS.NONE;
    return
  }
  else if (movableDirections.length == 1) {
    monster._direction = movableDirections[0];
    return
  }

  const possibleDirections = movableDirections.filter(i => {
    if (monster._direction === i) return true;

    const g = Math.floor(monster._direction / 2)
    const h = Math.floor(i / 2)

    return (g !== h)
  })

  const r = getRandomInt(possibleDirections.length);

  monster._direction = possibleDirections[r];
}

function moveMonster(scene, monster) {
    const vector = getVector(monster._direction);

    if (vector[0] == -1) monster.setFrame(CONSTANTS.MONSTER_LEFT)
    else if (vector[0] == 1) monster.setFrame(CONSTANTS.MONSTER_RIGHT)

    monster._x = monster._x + vector[0];
    monster._y = monster._y + vector[1];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function movableTo(scene, monster, vector) {
  const x = monster._x + vector[0]
  const y = monster._y + vector[1]

  if (x === 0 || x === scene._map.width - 1) return false
  if (y === 0 || y === scene._map.height - 1) return false

  const tile = scene._map.getTileAt(x, y, true, "floor")

  if (CONSTANTS.COLLISION_TILES.includes(tile.index)) return false

  if (scene._monsters === undefined) return false

  const found = scene._monsters.find((m, index) => {
    return (m._index !== monster._index) && (m._x === x) && (m._y === y)
  })

  return !found
}
