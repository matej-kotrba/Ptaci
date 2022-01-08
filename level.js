
function drawPlayerStart() {
    c.fillStyle = "brown"
    c.fillRect(250, canvas.height - 300, 40, 300)
}

function drawString() {
    c.beginPath()
    c.lineWidth = 10
    c.lineCap = "round"
    c.moveTo(270, canvas.height - 300)
    if (playerShots.length != 0 && playerValues.draw) {
        var color = vzdalenost(playerShots[0].x, 270, playerShots[0].y, canvas.height - 300)
        c.strokeStyle = `rgb(${color}, 190, 0)`
        var playerPosistion = something(playerShots[0].x, 270, playerShots[0].y, canvas.height - 300)
        c.lineTo(playerPosistion.a, playerPosistion.b)
        playerShots[0].angle = drawAngle(playerShots[0].x, 270, playerShots[0].y, canvas.height - 300)
    }
    c.stroke()
    c.closePath()
}

var level1 = {

}