function setGame(level) {
    // LEVEL START 
    playerShots = []
    objects = []
    destroyAnimation = []
    pigs = []
    pigsKillAnimation = []
    playerEffects.array = []
    playerEffects.boomerArray = []
    levelObjectives.star = undefined
    playerValues.draw = false
    playerValues.shoot = false
    playerValues.starCollected = false
    spawnPlayers(level)
    spawnObjects(level)
    spawnPigs(level)
    spawnStar(level)
    console.log(level)
    game.level = level - 1
}

// LEVEL SETUP

function spawnObjects(index) {
    for (var i in levely[index - 1]["objects"]) {
        objects.push(new Object(levely[+index - 1]["objects"][i][0], levely[+index - 1]["objects"][i][1],
            levely[+index - 1]["objects"][i][2], levely[+index - 1]["objects"][i][3]))
    }
}

function spawnPlayers(index) {
    for (var i = 0; i < levely[index - 1]["players"][0]; i++) {
        playerShots.push(new Player())
    }
    if (levely[index - 1]["players"][1] != undefined) {
        for (var i of levely[index - 1]["players"][1]) {
            playerShots[i] = new Boomer()
        }
    }
}

function spawnPigs(index) {
    for (var i in levely[index - 1]["pigs"]) {
        pigs.push(new Pig(levely[+index - 1]["pigs"][i][0], levely[+index - 1]["pigs"][i][1]))
    }
}

function spawnStar(index) {
    levelObjectives.star = new Star(levely[+index - 1]["objectives"][1][0], levely[+index - 1]["objectives"][1][1])
}

// Set screens

function setMenu() {
    buttons.push(new Button("normal", "PLAY", "levels", canvas.width / 2, 250, 500, 100))
    buttons.push(new Button("normal", "SHOP", "shop", canvas.width / 2, 400, 500, 100))
    buttons.push(new Button("normal", "CUSTOMIZE", "costumize", canvas.width / 2, 550, 500, 100))
}

function setLevels() {

    for (var i = 0; i < 12; i++) {
        buttons.push(new Button("level", i + 1, "game", canvas.width / 2, 250))

    }
    buttons.push(new Button("cross", 0, "menu", 100, 50, 50, 50))
}

function setPostMatch() {
    game.display = "postmatch"
    buttons.push(new Button("again", game.level + 1, "game", 1200, 400, 150, 150))
    buttons.push(new Button("exit", 0, "menu", 1200, 600, 150, 150))
}

function setPause() {
    game.display = "pause"
    buttons.push(new Button("normal", "RESUME", "resume", canvas.width / 2, 250, 500, 100))
    buttons.push(new Button("normal", "EXIT", "levels", canvas.width / 2, 400, 500, 100))
}

function setShop() {
    game.display = "shop"
    buttons.push(new Button("buy", { image: playerImages.normalRed, text: 5, title: "Red Bird", skin: "red", for: "player" }, "transaction", canvas.width / 2, 250, 500, 100))
    buttons.push(new Button("buy", { image: playerImages.normalGreen, text: 10, title: "Green Bird", skin: "green", for: "player" }, "transaction", canvas.width / 2, 250, 500, 100))
    buttons.push(new Button("buy", { image: playerImages.normalChicaron, text: 15, title: "Chicharrón", skin: "chicaron", for: "player" }, "transaction", canvas.width / 2, 250, 500, 100))
    buttons.push(new Button("buy", { image: playerImages.circleRed, text: 5, title: "Red Circle", skin: "red", for: "playerEffects" }, "transaction", canvas.width / 2, 250, 500, 100))
    buttons.push(new Button("buy", { image: playerImages.circleYellow, text: 10, title: "Yellow Circle", skin: "yellow", for: "playerEffects" }, "transaction", canvas.width / 2, 250, 500, 100))
    buttons.push(new Button("cross", 0, "menu", 100, 50, 50, 50))
}

function setTransaction(price, skin, trueName) {
    game.display = "transaction"
    buttons.push(new Button("min", { text: "YES", purchase: true, price: price, for: skin, trueName: trueName }, "shop", canvas.width / 2 - 150, 450, 500, 100))
    buttons.push(new Button("min", { text: "NO", purchase: false }, "shop", canvas.width / 2 + 150, 450, 500, 100))
}

function setCostumize() {
    game.display = "costumize"
    for (var i in skins) {
        if (i != "other") {
            for (var k in skins[i]) {
                buttons.push(new Button("skinSelect", { for: i, skin: skins[i][k], name: k, image: skins[i][k].image }, "", canvas.width / 2 + 150, 450, 500, 100))
            }
        }
    }
    buttons.push(new Button("cross", 0, "menu", 100, 50, 50, 50))
}

function backgroundSet() {
    c.drawImage(menuImages.bg, 0, 0, canvas.width, canvas.height)
    c.fillStyle = "black"
    c.globalAlpha = 0.6
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.globalAlpha = 1
}