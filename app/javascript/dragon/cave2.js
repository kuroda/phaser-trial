import Phaser from "phaser/dist/phaser.min"

import preload from "./cave2/preload"
import create from "./cave2/create"
import update from "./cave2/update"

const cave2Scene = new Phaser.Scene("cave2")

cave2Scene.preload = preload
cave2Scene.create = create
cave2Scene.update = update

export default cave2Scene
