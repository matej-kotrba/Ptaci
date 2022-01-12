const canvas = document.getElementById("canvas")
const c = canvas.getContext("2d")

// MOUSE

var mouse = {
    x: 0,
    y: 0,
    movex: 0,
    movey: 0
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
    mouse.x = e.offsetX * canvas.width / canvas.clientWidth | 0
    mouse.y = e.offsetY * canvas.height / canvas.clientHeight | 0
    if (e.button == 0 && !playerValues.shoot && game.display == "game") {
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
    for (var i in buttons) {
        if ((mouse.x > buttons[i].x - buttons[i].w / 2 && mouse.x < buttons[i].x + buttons[i].w / 2 &&
            mouse.y > buttons[i].y && mouse.y < buttons[i].y + buttons[i].h) ||
            (mouse.x > buttons[i].baseX - buttons[i].baseW / 2 && mouse.x < buttons[i].baseX + buttons[i].baseW / 2 &&
                mouse.y > buttons[i].y && mouse.y < buttons[i].y + buttons[i].h)) {
            pageSwitch(i)
            break
        }
    }
})

canvas.addEventListener("mousemove", (e) => {
    mouse.movex = e.offsetX * canvas.width / canvas.clientWidth | 0
    mouse.movey = e.offsetY * canvas.height / canvas.clientHeight | 0
})

addEventListener("keydown", (e) => {
    if (e.code == "KeyR" && game.display == "game") setGame(game.level + 1)
    if (e.code == "Escape") {
        if (game.display == "game") pageSwitchDirect("pause")
    }
})

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
}

function spawnPigs(index) {
    for (var i in levely[index - 1]["pigs"]) {
        pigs.push(new Pig(levely[+index - 1]["pigs"][i][0], levely[+index - 1]["pigs"][i][1]))
    }
}

function spawnStar(index) {
    levelObjectives.star = new Star(levely[+index - 1]["objectives"][1][0], levely[+index - 1]["objectives"][1][1])
}