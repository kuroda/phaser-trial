import * as CONSTANTS from "../constants";

export default function create() {
  const self = this
  this._map = this.make.tilemap({key: "main_map"})
  const tiles = this._map.addTilesetImage("tiles")
  this._map.createDynamicLayer("floor", tiles, 0, 0);

  const player = createPlayer(this)

  prepareCamera(this)
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

function prepareCamera(scene) {
  scene.cameras.main.setBounds(0, 0,
    scene._map.widthInPixels, scene._map.heightInPixels)
  scene.cameras.main.startFollow(scene._player)
  scene.cameras.main.name = "mainCamera" // For debugging.
  scene.cameras.main.fadeIn()
}
