// LEVELS, GAME, PROGRESS INFO

var game = {
    display: "menu",
    stop: false,
    level: 0
}

var playerValues = {
    draw: false,
    shoot: false,
    starCollected: false
}

var levelsInfo = {
    levelsCompleted: 0,
    stars: 0
}

var levelsStats = {}
for (var i = 0; i < levely.length; i++) {
    levelsStats[i] = 0
}

var skins = {
    player: {
        normal: {
            owned: true,
            equipped: true,
            image: playerImages.normal
        },
        red: {
            owned: false,
            equipped: false,
            image: playerImages.normalRed
        },
        green: {
            owned: false,
            equipped: false,
            image: playerImages.normalGreen
        }
    },
    playerEffects: {
        normal: {
            owned: true,
            equipped: true,
            image: playerImages.circleNormal,
            color: "rgb(255,255,255,0.2)"
        },
        red: {
            owned: false,
            equipped: false,
            image: playerImages.circleRed,
            color: "rgb(255,0,0,0.2)"
        },
        yellow: {
            owned: false,
            equipped: false,
            image: playerImages.circleYellow,
            color: "rgb(255,255,0,0.2)"
        }
    },
    boomer: {
        normal: {
            owned: true,
            equipped: true,
            image: playerImages.boomerNormal
        }
    },
    other: {
        pursching: undefined
    }
}

// VARIABLES

var dt = 0
var lastframe = 0
var timeStamp = 0

var playerShots = []
var playerEffects = {
    array: [],
    boomerArray: [],
    timer: 0,
}
var objects = []
var destroyAnimation = []
var pigs = []
var pigsKillAnimation = []

var levelObjectives = {
    star: undefined
}

// MENU VARIABLES

var buttons = []

// MENU SET UP

setMenu()

function main() {

    lastframe = timeStamp
    timeStamp = Date.now()
    dt = (timeStamp - lastframe) / (1000 / 60)

    if (game.display == "menu") {
        c.drawImage(menuImages.bg, 0, 0, canvas.width, canvas.height)
    }

    else if (game.display == "shop") {
        backgroundSet()
    }

    else if (game.display == "costumize") {
        backgroundSet()
    }

    else if (game.display == "transaction") {
        c.drawImage(menuImages.bg, 0, 0, canvas.width, canvas.height)
        c.fillStyle = "black"
        c.globalAlpha = 0.8
        c.fillRect(0, 0, canvas.width, canvas.height)
        c.globalAlpha = 1
        c.fillStyle = "rgb(59, 59, 59)"
        c.fillRect(300, 100, canvas.width - 600, canvas.height - 200)
        c.textAlign = "center"
        c.font = "30px Verdana"
        c.fillStyle = "white"
        c.fillText("Are you sure you want to buy \'" + skins.other.pursching + "\'", canvas.width / 2, 200)
    }

    else if (game.display == "levels") {
        backgroundSet()
    }

    else if (game.display == "postmatch") {
        c.fillStyle = "black"
        c.globalAlpha = 0.05
        c.fillRect(0, 0, canvas.width, canvas.height)
        c.globalAlpha = 0.2
        var starsCount = starsEarned()
        for (var i = 0; i < starsCount; i++) {
            c.drawImage(menuImages.star, canvas.width / 2 - 400 + 300 * i, 100, 200, 200)
        }
        for (var k = 0; k < 3 - starsCount; k++) {
            c.drawImage(menuImages.blankstar, canvas.width / 2 + (-400 + starsCount * 300) + 300 * k, 100, 200, 200)
        }
        c.fillStyle = "white"
        c.font = "45px serif"
        c.fillText("All pigs killed", 250, 470);
        (pigs.length == 0) ? c.drawImage(menuImages.tick, 400, 380, 100, 100) : c.drawImage(menuImages.cross, 400, 400, 100, 100);
        c.fillText(levely[game.level]["objectives"][0] + " birds left", 250, 570);
        (levely[game.level]["objectives"][0] <= playerShots.length - (playerValues.shoot == true) ? 1 : 0) ? c.drawImage(menuImages.tick, 400, 480, 100, 100) : c.drawImage(menuImages.cross, 400, 500, 100, 100);
        c.fillText("Star collected", 250, 670);
        (playerValues.starCollected) ? c.drawImage(menuImages.tick, 400, 580, 100, 100) : c.drawImage(menuImages.cross, 400, 600, 100, 100)
        c.font = "25px serif"
        c.textAlign = "center"
        if (pigs.length != 0) c.fillText("You need to kill all Pigs to advance through levels", 800, 780)
        c.globalAlpha = 1
    }

    else if (game.display == "pause") {
        c.fillStyle = "rgb(22, 22, 22, 0.2)"
        c.fillRect(0, 0, canvas.width, canvas.height)
    }

    else if (!game.stop && game.display == "game") {

        if (playerShots.length == 0 || (pigs.length == 0 && pigsKillAnimation.length == 0)) {
            setPostMatch()
        }

        else {

            if (game.display == "game") {

                c.clearRect(0, 0, canvas.width, canvas.height)

                drawPlayerStart()

                // shoot

                if (playerValues.shoot) {
                    playerShots[0].xs *= 0.995 ** (dt)
                    playerShots[0].ys *= 0.995 ** (dt)
                    playerShots[0].x += playerShots[0].xs * dt
                    playerShots[0].ys += playerShots[0].g * dt
                    playerShots[0].y += playerShots[0].ys * dt
                }

                objectCollision(playerShots[0])

                for (var i in objects) {
                    objects[i].gravity()
                    objects[i].render()
                }

                //  mouse move render 

                if (playerValues.draw) {
                    if (Math.round(vzdalenost(playerShots[0].x, 270, playerShots[0].y, canvas.height - 300)) <= 220) {
                        playerShots[0].x = mouse.movex
                        playerShots[0].y = mouse.movey
                    }
                    if (vzdalenost(playerShots[0].x, 270, playerShots[0].y, canvas.height - 300) > 220) {
                        var xs = xxs(playerShots[0].x, 270, playerShots[0].y, canvas.height - 300)
                        var ys = yys(playerShots[0].x, 270, playerShots[0].y, canvas.height - 300)
                        playerShots[0].x = 270 + xs * 220
                        playerShots[0].y = canvas.height - 300 + ys * 220
                    }
                }
                else if (!playerValues.shoot) {
                    playerShotsRender()
                }

                // bounce

                if (playerShots.length > 0 && playerValues.shoot) bounce()

                //

                spliceAnimation()

                for (var i in destroyAnimation) {
                    destroyAnimation[i].gravity()
                    destroyAnimation[i].render()
                }

                // Pigs

                pigCollision()

                for (var i in pigs) {
                    pigs[i].gravity()
                    pigs[i].render()
                }

                for (var i in pigsKillAnimation) {
                    pigsKillAnimation[i].render()
                    pigsKillAnimation[i].kill()
                }

                // Star


                if (levelObjectives.star != undefined) {
                    levelObjectives.star.pick()
                    levelObjectives.star.render()
                }

                // player shots render
                if (playerValues.shoot) {
                    playerEffects.timer += Math.abs(playerShots[0].xs) * 0.15
                    if (playerEffects.timer >= 5) {
                        playerEffectPush()
                        playerEffects.timer = 0
                    }
                }
                for (var i in playerEffects.array) {
                    playerEffects.array[i].delete()
                }
                for (var i in playerEffects.array) {
                    playerEffects.array[i].render()
                }

                for (var i in playerEffects.boomerArray) {
                    playerEffects.boomerArray[i].hitbox()
                    playerEffects.boomerArray[i].render()
                }

                for (var i in playerShots) {
                    playerShots[i].render()
                }

                // string redner

                drawString()

                // Delete player
                if ((Math.abs(playerShots[0].xs) <= 1 && Math.abs(playerShots[0].ys) <= 1) && playerValues.shoot) {
                    playerShots.splice(0, 1)
                    playerValues.draw = false
                    playerValues.shoot = false
                }
            }
        }
    }

    buttonHover()

    for (var i in buttons) {
        buttons[i].render()
    }

    showStarCount()

    requestAnimationFrame(main)
}

main()