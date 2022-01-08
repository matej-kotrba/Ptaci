const canvas = document.getElementById("canvas")
const c = canvas.getContext("2d")

var game = {
    display: "menu",
    stop: false
}

var mouse = {
    x: 0,
    y: 0,
    movex: 0,
    movey: 0
}

var playerValues = {
    draw: false,
    shoot: false,
}

// GAME OPTIONS 

function gameStop() {
    game.stop = true
}

function gameResume() {
    game.stop = false
    main()
}

// MATH

function vzdalenost(startx, x, starty, y) {
    var a = startx - x
    var b = starty - y
    var c = Math.sqrt(a * a + b * b)
    return c
}

function something(startx, x, starty, y) {
    var a = x - (startx - x)
    var b = y - (starty - y)
    return { a: a, b: b }
}

function vzdalenostXY(startx, x, starty, y) {
    var a = startx - x
    var b = starty - y
    return { a: a, b: b }
}

function xxs(startx, x, starty, y) {
    var a = startx - x
    var b = starty - y
    var c = Math.sqrt(a * a + b * b)
    return a / c
}

function yys(startx, x, starty, y) {
    var a = startx - x
    var b = starty - y
    var c = Math.sqrt(a * a + b * b)
    return b / c
}

function lookAfterMouse() {
    var a = playerShots[0].x - mouse.movex
    var b = playerShots[0].y - mouse.movey
    var c = Math.sqrt(a ** 2 + b ** 2)
    var tana = b / a
    if (a > 0) return Math.atan(tana) + Math.PI
    return Math.atan(tana)
}

function drawAngle(startx, x, starty, y) {
    var a = startx - x
    var b = starty - y
    var c = Math.sqrt(a * a + b * b)
    var tan = b / a
    if (a > 0) return Math.atan(tan) + Math.PI
    return Math.atan(tan)
}

// EVENT LISTNERENS

canvas.addEventListener("mousedown", (e) => {
    if (e.button == 0 && !playerValues.shoot) {
        mouse.x = e.offsetX * canvas.width / canvas.clientWidth | 0
        mouse.y = e.offsetY * canvas.height / canvas.clientHeight | 0
        if (vzdalenost(playerShots[0].x, mouse.x, playerShots[0].y, mouse.y) <= playerShots[0].r) {
            playerValues.draw = true
        }
    }
})

canvas.addEventListener("mouseup", (e) => {
    if (!playerValues.shoot && playerShots.length > 0 && playerValues.draw) {
        playerValues.draw = false
        playerValues.shoot = true
        playerShots[0].xs = (-vzdalenostXY(playerShots[0].x, 270, playerShots[0].y, canvas.height - 300).a / 10) * 1.5
        playerShots[0].ys = (-vzdalenostXY(playerShots[0].x, 270, playerShots[0].y, canvas.height - 300).b / 10) * 1.5
    }
})

canvas.addEventListener("mousemove", (e) => {
    mouse.movex = e.offsetX * canvas.width / canvas.clientWidth | 0
    mouse.movey = e.offsetY * canvas.height / canvas.clientHeight | 0
})

addEventListener("keypress", (e) => {
    if (e.code == "KeyR") levelRestart()
})

// LEVEL SETUP

function spawnObjects() {
    objects.push(new Object(500, 400, null, "metal"))
    objects.push(new Object(500, 700, null, "wood"))
    //objects.push(new Object(600, -200, "I", "metal"))
}

function spawnPlayers() {
    for (var i = 0; i < 5; i++) {
        playerShots.push(new Player())
    }
}

function spawnPigs() {
    pigs.push(new Pig(800, 400))
}

function levelRestart() {
    playerShots = []
    objects = []
    destroyAnimation = []
    pigs = []
    pigsKillAnimation = []
    playerValues.draw = false
    playerValues.shoot = false
    spawnObjects()
    spawnPlayers()
    spawnPigs()
}