
var levelImages = {
    star: new Image(),
    set: () => {
        levelImages.star.src = "./img/star.png"
    }
}

levelImages.set()

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

class Star {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.d = 75
        this.angle = 0
        this.destroy = false
    }
    render() {
        if (this.destroy) {
            this.d--
            this.y += 0.5
            this.x += 0.5
            if (this.d <= 0) {
                levelObjectives.star = undefined
            }
        }
        this.angle += (5 * (Math.PI * 2 / 360)) * dt
        c.save()
        c.translate(this.x + this.d / 2, this.y + this.d / 2)
        c.rotate(this.angle)
        c.drawImage(levelImages.star, -this.d / 2, -this.d / 2 - 5, this.d, this.d)
        c.restore()
    }
    pick() {
        if (playerShots[0].x + playerShots[0].r >= this.x &&
            playerShots[0].x - playerShots[0].r <= this.x + this.d &&
            playerShots[0].y + playerShots[0].r >= this.y &&
            playerShots[0].y - playerShots[0].r <= this.y + this.d) {
            playerValues.starCollected = true
            this.destroy = true
        }
    }
}

function starsEarned() {
    var starsCount = 0
    if (playerValues.starCollected) starsCount++
    if (pigs.length == 0) starsCount++
    if (levely[game.level]["objectives"][0] <= playerShots.length - (playerValues.shoot == true) ? 1 : 0) starsCount++
    if (pigs.length == 0) {
        if (levelsStats[game.level] == 0) levelsInfo.levelsCompleted++
        if (levelsStats[game.level] < starsCount) {
            levelsInfo.stars += starsCount - levelsStats[game.level]
            levelsStats[game.level] = starsCount
        }
    }
    return starsCount
}