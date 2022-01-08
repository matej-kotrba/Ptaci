
// VARIABLES

var dt = 0
var lastframe = 0
var timeStamp = 0

var playerShots = []
var objects = []
var destroyAnimation = []
var pigs = []
var pigsKillAnimation = []

// MENU VARIABLES

var buttons = []

// MENU SET UP

setMenu()

// LEVEL START 

spawnPlayers()

spawnObjects()

spawnPigs()

function main() {

    lastframe = timeStamp
    timeStamp = Date.now()
    dt = (timeStamp - lastframe) / (1000 / 60)

    if (game.display == "menu") {
        c.drawImage(menuImages.bg,-1,0,canvas.width,canvas.height)
        for (var i in buttons) {
            buttons[i].render()
            buttons[i].click()
        }
    }

    else if (!game.stop && game.display == "game") {

        c.clearRect(0, 0, canvas.width, canvas.height)

        drawPlayerStart()

        // shoot

        if (playerValues.shoot) {
            playerShots[0].xs *= 0.995
            playerShots[0].ys *= 0.995
            playerShots[0].x += playerShots[0].xs * dt
            playerShots[0].ys += playerShots[0].g * dt
            playerShots[0].y += playerShots[0].ys * dt
        }

        objectCollision()

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

        if ((Math.abs(playerShots[0].xs) <= 1 && Math.abs(playerShots[0].ys) <= 1) && playerValues.shoot) {
            playerShots.splice(0, 1)
            playerValues.draw = false
            playerValues.shoot = false
        }

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

        // player shots render

        for (var i in playerShots) {
            playerShots[i].render()
        }

        // string redner

        drawString()
    }
    requestAnimationFrame(main)
}

main()