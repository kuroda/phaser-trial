import Phaser from "phaser/dist/phaser.min"
import bindEventHandlers from "./base_event_handlers"
import mainScene from "./main"
import caveScene from "./cave"
import cave2Scene from "./cave2"

const config = {
  type: Phaser.CANVAS,
  parent: "screen",
  width: 320,
  height: 320,
  scene: [mainScene, caveScene, cave2Scene]
}

const dragonGame = {}

dragonGame.start = () => {
  const game = new Phaser.Game(config)
  const sceneNames = ["main", "cave", "cave2"]

  game._currentScene = () => {
    const sceneName = sceneNames.find(n => game.scene.isActive(n))

    if (sceneName) return game.scene.getScene(sceneName)
  }

  game._restart = () => {
    game._score = 0
    game._over = false

    const div = document.getElementById("game-over");
    div.style.display = "none";

    game.scene.scenes.forEach(s => s.scene.restart())
    game.scene.switch("main")
  }

  const button = document.getElementById("js-restart")
  button.addEventListener("click", event => game._restart())

  game._score = 0

  bindEventHandlers(game)
}

export default dragonGame
