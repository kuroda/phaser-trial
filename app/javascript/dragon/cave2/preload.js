import TilesSprite from "../../images/tiles-sprite.png"
import PlayerSprite from "../../images/player-sprite2.png"
import MonsterSprite from "../../images/monster-sprite.png"

export default function preload() {
  this.load.tilemapTiledJSON("cave2_map", "/dragon/cave2_map.json?t=" + new Date())
  this.load.spritesheet("tiles", TilesSprite, {
    frameWidth: 64, frameHeight: 64
  })
  this.load.spritesheet("player", PlayerSprite, {
    frameWidth: 48, frameHeight: 64
  })
  this.load.spritesheet("monster", MonsterSprite, {
    frameWidth: 64, frameHeight: 64
  })
  this.load.audio("cave2", "/dragon/cave.mp3")
}
