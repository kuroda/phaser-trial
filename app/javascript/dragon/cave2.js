import Phaser from "phaser/dist/phaser.min"

import preload from "./cave/preload"
import create from "./cave/create"
import update from "./cave/update"

const caveScene = new Phaser.Scene("cave")

caveScene.preload = preload
caveScene.create = create
caveScene.update = update

export default caveScene
