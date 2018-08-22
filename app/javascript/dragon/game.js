import Phaser from "phaser/dist/phaser.min"
import bindEventHandlers from "./base_event_handlers"
import mainScene from "./main"
import caveScene from "./cave"

const config = {
  type: Phaser.CANVAS,
  parent: "screen",
  width: 320,
  height: 320,
  // scene: [mainScene, caveScene]
  scene: [caveScene, mainScene]
}

const dragonGame = {}

dragonGame.start = () => {
  const game = new Phaser.Game(config)
  const sceneNames = ["main", "cave"]

  game._currentScene = () => {
    const sceneName = sceneNames.find(n => game.scene.isActive(n))

    if (sceneName) return game.scene.getScene(sceneName)
  }

  game._score = 0

  bindEventHandlers(game)
}

export default dragonGame
