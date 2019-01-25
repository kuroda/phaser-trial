import * as CONSTANTS from "../constants";
import moveMonsters from "./move_monsters"

export default function create() {
  const self = this
  this._cave = {}
  this._map = this.make.tilemap({key: "cave_map"})
  const tiles = this._map.addTilesetImage("tiles")
  this._floorLayer = this._map.createDynamicLayer("floor", tiles, 0, 0);
  this._treasuresLayer = this._map.createDynamicLayer("treasures", tiles, 0, 0);
  this._bgm = this.sound.add("cave")
  this._bgm.play({ loop: true })

  const player = createPlayer(this)
  const strongPlayer = createStrongPlayer(this)
  const monsters = createMonsters(this)
  const hearts = createHearts(this)

  prepareCamera(this)

  this.timedEvent = this.time.addEvent({
    delay: 2000,
    callback: moveMonsters,
    callbackScope: this,
    loop: true
  })
}

function createPlayer(scene) {
  const player = scene.add.sprite(0, 0, "player")

  player.setOrigin(-0.166, 0.1)
  player.setFrame(CONSTANTS.FRONT_0)
  player._x = 1
  player._y = 1

  scene._player = player

  return player
}

function createStrongPlayer(scene) {
  const strongPlayer = scene.add.sprite(0, 0, "strongPlayer")

  strongPlayer.setOrigin(-0.166, 0.1)
  strongPlayer.setFrame(CONSTANTS.FRONT_0)
  strongPlayer.setAlpha(0.0)

  scene._strongPlayer = strongPlayer

  return strongPlayer
}

function createMonsters(scene) {
  const monsters = []

  const coords = [
    [1, 4],
    [4, 6],
    [8, 8]
  ]

  coords.forEach((coord, index) => {
    const monster = scene.add.sprite(0, 0, "monster")

    monster.setOrigin(0, 0)
    monster.setFrame(CONSTANTS.MONSTER_LEFT)
    monster._index = index
    monster._x = coord[0]
    monster._y = coord[1]
    monster._direction = CONSTANTS.NONE

    monsters.push(monster)
  })

  scene._monsters = monsters

  return monsters
}

function createHearts(scene) {
  const hearts = []

  const coords = [
    [1, 6],
    [5, 3],
    [8, 4]
  ]

  coords.forEach((coord, index) => {
    const heart = scene.add.sprite(0, 0, "heart")

    heart.setOrigin(0, 0)
    heart.setFrame(0)
    heart._index = index
    heart._x = coord[0]
    heart._y = coord[1]
    heart._direction = CONSTANTS.NONE

    hearts.push(heart)
  })

  scene._hearts = hearts

  return hearts
}

function prepareCamera(scene) {
  scene.cameras.main.setBounds(0, 0,
    scene._map.widthInPixels, scene._map.heightInPixels)
  scene.cameras.main.startFollow(scene._player)
  scene.cameras.main.name = "caveCamera" // for debugging.
  scene.cameras.main.fadeIn()
}
