// PLAYER
var playerImages = {
    normal: new Image(),
    normalRed: new Image(),
    normalGreen: new Image(),
    normalChicaron: new Image(),
    circleNormal: new Image(),
    circleRed: new Image(),
    circleYellow: new Image(),
    boomerNormal: new Image(),
    set: () => {
        playerImages.normal.src = "./img/normalbird.png"
        playerImages.normalRed.src = "./img/redbird.png"
        playerImages.normalGreen.src = "./img/normalGreen.png"
        playerImages.circleNormal.src = "./img/circleNormal.png"
        playerImages.circleRed.src = "./img/circleRed.png"
        playerImages.circleYellow.src = "./img/circleYellow.png"
        playerImages.boomerNormal.src = "./img/boomerNormal.png"
        playerImages.normalChicaron.src = "./img/chicaron.png"
    }
}

playerImages.set()

class Player {
    constructor(type) {
        this.values = setTypeValuesPlayer(type)
        this.x = 0
        this.y = 0
        this.r = this.values.r
        this.color = this.values.color
        this.xs = 0
        this.ys = 0
        this.g = 0.6
        this.angle = 0
        this.onclick = () => { }
    }
    render() {
        /*c.beginPath()
        c.fillStyle = this.color
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        c.fill()
        c.closePath()*/
        this.angle += ((Math.PI * 2) / 360 * this.xs) * dt
        c.save()
        c.translate(this.x, this.y)
        c.rotate(this.angle)
        c.drawImage(equippedSkin(this.values.for, "image"), -this.r, -this.r, this.r * 2, this.r * 2)
        c.restore()
        c.lineWidth = 5
        c.strokeStyle = "black"
        c.beginPath()
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        c.stroke()
        c.closePath()
    }
}

class Boomer extends Player {
    constructor() {
        super("boomer")
        this.g = 0.8
        this.onclick = () => {
            playerEffects.boomerArray.push(new BoomerExplode(this.x, this.y))
            this.onclick = () => { }
        }
    }
}

class BoomerExplode {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.r = 50
        this.reverse = false
    }
    render() {
        if (!this.reverse) {
            if (this.r < 175) this.r += 8
            else this.reverse = true
        }
        else {
            if (this.r > 0) this.r -= 12
        }
        if (this.r <= 0) {
            playerEffects.boomerArray.splice(playerEffects.boomerArray.indexOf(this), 1)
            return
        }
        c.beginPath()
        c.fillStyle = "rgb(0,0,0,0.8)"
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        c.fill()
        c.closePath()
        c.beginPath()
        c.fillStyle = "rgb(255,0,0,0.8)"
        if (this.r > 50) c.arc(this.x, this.y, this.r - 50, 0, 2 * Math.PI)
        c.fill()
        c.closePath()
        c.beginPath()
        c.fillStyle = "rgb(255,255,0,0.8)"
        if (this.r > 100) c.arc(this.x, this.y, this.r - 100, 0, 2 * Math.PI)
        c.fill()
        c.closePath()
    }
    hitbox() {
        for (var i in pigs) {
            if (vzdalenost(this.x,pigs[i].x,this.y,pigs[i].y) <= this.r + pigs[i].r) pigsKill(i)
        }
        for (var i in objects) {
            if (this.x + this.r >= objects[i].x
                && this.x + this.r <= objects[i].x + objects[i].values.w
                && this.y >= objects[i].y
                && this.y <= objects[i].y + objects[i].values.h) {
                objectDestroy(objects[i])
            }
            else if (this.x - this.r >= objects[i].x
                && this.x - this.r <= objects[i].x + objects[i].values.w
                && this.y >= objects[i].y
                && this.y <= objects[i].y + objects[i].values.h) {
                objectDestroy(objects[i])
            }
            else if (this.x >= objects[i].x
                && this.x <= objects[i].x + objects[i].values.w
                && this.y - this.r >= objects[i].y
                && this.y - this.r <= objects[i].y + objects[i].values.h) {
                objectDestroy(objects[i])
            }
            else if (this.x >= objects[i].x
                && this.x <= objects[i].x + objects[i].values.w
                && this.y + this.r >= objects[i].y
                && this.y + this.r <= objects[i].y + objects[i].values.h) {
                objectDestroy(objects[i])
            }
            else if (vzdalenost(objects[i].x, this.x, objects[i].y, this.y) <= this.r) {
                objectDestroy(objects[i])
            }
            else if (vzdalenost(objects[i].x + objects[i].values.w, this.x, objects[i].y, this.y) <= this.r) {
                objectDestroy(objects[i])
            }
            else if (vzdalenost(objects[i].x, this.x, objects[i].y + objects[i].values.h, this.y) <= this.r) {
                objectDestroy(objects[i])
            }
            else if (vzdalenost(objects[i].x + objects[i].values.w, this.x, objects[i].y + objects[i].values.h, this.y) <= this.r) {
                objectDestroy(objects[i])
            }
        }
    }
}

function setTypeValuesPlayer(type) {
    var values = {}
    switch (type) {
        case "boomer": {
            values.r = 50
            values.for = "boomer"
            break
        }
        default:
            values.r = 40
            values.for = "player"
    }
    return values
}

function playerShotsRender() {
    for (var i in playerShots) {
        if (i == 0) {
            playerShots[i].x = 270
            playerShots[i].y = canvas.height - 300 - playerShots[i].r
            playerShots[i].angle = lookAfterMouse()
        }
        else {
            playerShots[i].x = 50
            if (i == 1) {
                playerShots[i].y = 300

            }
            else playerShots[i].y = playerShots[+i - 1].y - playerShots[+i - 1].r - playerShots[i].r - 5
        }
    }
}

function bounce() {

    if (playerShots[0].x + playerShots[0].r > canvas.width || playerShots[0].x - playerShots[0].r < 0) {
        playerShots[0].xs < 0 ? playerShots[0].x = playerShots[0].r : playerShots[0].x = canvas.width - playerShots[0].r
        playerShots[0].xs *= -0.7
    }
    if (playerShots[0].y + playerShots[0].r > canvas.height) {
        if (playerShots[0].y + playerShots[0].r > canvas.height) playerShots[0].y = canvas.height - playerShots[0].r
        playerShots[0].ys *= -0.7
    }
}

class PlayerMoveEffect {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.r = 40
    }
    render() {
        c.beginPath()
        c.fillStyle = equippedSkin("playerEffects", "color")
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        c.fill()
        c.closePath()
    }
    delete() {
        this.r--
        if (this.r <= 0) playerEffects.array.splice(playerEffects.array.indexOf(this), 1)
    }
}

function playerEffectPush() {
    playerEffects.array.push(new PlayerMoveEffect(playerShots[0].x, playerShots[0].y))
}
