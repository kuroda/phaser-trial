import TilesSprite from "../../images/tiles-sprite.png"
import PlayerSprite from "../../images/player-sprite2.png"

export default function preload() {
  this.load.tilemapTiledJSON("main_map", "/dragon/main_map.json?t=" + new Date())
  this.load.spritesheet("tiles", TilesSprite, {
    frameWidth: 64, frameHeight: 64
  })
  this.load.spritesheet("player", PlayerSprite, {
    frameWidth: 48, frameHeight: 64
  })
}
