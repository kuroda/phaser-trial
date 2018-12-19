import * as CONSTANTS from "./constants"

export const keydownEventHandlers = {
  " ": Space,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown
}

function movable_to(scene, deltaX, deltaY) {
  const x = scene._player._x + deltaX
  const y = scene._player._y + deltaY

  if (x === 0 || x === scene._map.width - 1) return false
  if (y === 0 || y === scene._map.height - 1) return false

  const tile = scene._map.getTileAt(x, y, true, "floor")

  return !CONSTANTS.COLLISION_TILES.includes(tile.index)
}

function Space(scene, event) {
  if (scene.scene.key === "main")
    SpaceKeydownOnMain(scene, event)
  else if (scene.scene.key === "cave")
    SpaceKeydownOnCave(scene, event)
}

function SpaceKeydownOnMain(scene, event) {
  const tile =
    scene._map.getTileAt(scene._player._x, scene._player._y, true)

  if (tile.index === CONSTANTS.ENTRANCE) {
    scene.cameras.main.fadeOut(1000, 0, 0, 0, (camera, progress) => {
      if (progress === 1) {
        scene.scene.switch("cave")
        scene.cameras.main.fadeIn()

        const caveScene = scene.sys.game.scene.getScene("cave")
        if (caveScene._bgm) caveScene._bgm.resume()
      }
    })
  }
}

function SpaceKeydownOnCave(scene, event) {
  const treasure =
    scene._map.getTileAt(scene._player._x, scene._player._y, true, "treasures")

  const floorTile =
    scene._map.getTileAt(scene._player._x, scene._player._y, true, "floor")

  if (treasure.index === CONSTANTS.TREASURE) {
    scene._treasuresLayer.removeTileAt(scene._player._x, scene._player._y)
    scene.sys.game._score++
  }
  else if (floorTile.index === CONSTANTS.EXIT) {
    scene._bgm.pause()
    scene.cameras.main.fadeOut(1000, 0, 0, 0, (camera, progress) => {
      if (progress === 1) {
        scene.scene.switch("main")
        scene.cameras.main.fadeIn()
      }
    })
  }
}

function ArrowLeft(scene, event) {
  if (movable_to(scene, -1, 0)) {
    if (scene._player.frame.name === CONSTANTS.LEFT_0) {
      scene._player.setFrame(CONSTANTS.LEFT_1)
      scene._player._x--;
    }
    else if (scene._player.frame.name === CONSTANTS.LEFT_1) {
      scene._player.setFrame(CONSTANTS.LEFT_2)
      scene._player._x--;
    }
    else if (scene._player.frame.name === CONSTANTS.LEFT_2) {
      scene._player.setFrame(CONSTANTS.LEFT_1)
      scene._player._x--;
    }
    else {
      scene._player.setFrame(CONSTANTS.LEFT_0)
    }
  }
}

function ArrowRight(scene, event) {
  if (movable_to(scene, 1, 0)) {
    if (scene._player.frame.name === CONSTANTS.RIGHT_0) {
      scene._player.setFrame(CONSTANTS.RIGHT_1)
      scene._player._x++;
    }
    else if (scene._player.frame.name === CONSTANTS.RIGHT_1) {
      scene._player.setFrame(CONSTANTS.RIGHT_2)
      scene._player._x++;
    }
    else if (scene._player.frame.name === CONSTANTS.RIGHT_2) {
      scene._player.setFrame(CONSTANTS.RIGHT_1)
      scene._player._x++;
    }
    else {
      scene._player.setFrame(CONSTANTS.RIGHT_0)
    }
  }
  else {
    scene._player.setFrame(CONSTANTS.RIGHT_0)
  }
}

function ArrowUp(scene, event) {
  if (movable_to(scene, 0, -1)) {
    if (scene._player.frame.name === CONSTANTS.BACK_0) {
      scene._player.setFrame(CONSTANTS.BACK_1)
      scene._player._y--;
    }
    else if (scene._player.frame.name === CONSTANTS.BACK_1) {
      scene._player.setFrame(CONSTANTS.BACK_2)
      scene._player._y--;
    }
    else if (scene._player.frame.name === CONSTANTS.BACK_2) {
      scene._player.setFrame(CONSTANTS.BACK_1)
      scene._player._y--;
    }
    else {
      scene._player.setFrame(CONSTANTS.BACK_0)
    }
  }
  else {
    scene._player.setFrame(CONSTANTS.BACK_0)
  }
}

function ArrowDown(scene, event) {
  if (movable_to(scene, 0, 1)) {
    if (scene._player.frame.name === CONSTANTS.FRONT_0) {
      scene._player.setFrame(CONSTANTS.FRONT_1)
      scene._player._y++;
    }
    else if (scene._player.frame.name === CONSTANTS.FRONT_1) {
      scene._player.setFrame(CONSTANTS.FRONT_2)
      scene._player._y++;
    }
    else if (scene._player.frame.name === CONSTANTS.FRONT_2) {
      scene._player.setFrame(CONSTANTS.FRONT_1)
      scene._player._y++;
    }
    else {
      scene._player.setFrame(CONSTANTS.FRONT_0)
    }
  }
  else {
    scene._player.setFrame(CONSTANTS.FRONT_0)
  }
}
