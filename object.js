
// objects

class Object {
    constructor(x, y, type, material) {
        this.values = setTypeValuesObject(type, material)
        this.x = x
        this.y = y
        this.onLand = false
        this.v = 0
        this.g = 0.2
        this.color = this.values.materialStats.color
        this.hp = this.values.materialStats.hp
    }
    render() {
        c.fillStyle = this.color
        c.fillRect(this.x, this.y, this.values.w, this.values.h)
        c.strokeStyle = "black"
        c.lineWidth = 5
        c.strokeRect(this.x, this.y, this.values.w, this.values.h)
    }
    gravity() {
        var lowestPoint = canvas.height - 5
        var n = 1 / dt
        for (var i in objects) {
            if (i != objects.indexOf(this) && playerShots[0].x >= objects[i].x && playerShots[0].x <= objects[i].x + objects[i].values.w &&
                playerShots[0].y <= objects[i].y /*+ objects[i].values.h + playerShots[0].r*/) lowestPoint = playerShots[0].y - playerShots[0].r - 5
        }
        if (!this.onLand && !(playerShots[0].x >= this.x && playerShots[0].x <= this.x + this.values.w &&
            playerShots[0].y >= this.y + this.values.h && playerShots[0].y <= this.y + this.values.h + playerShots[0].r &&
            playerShots[0].y + playerShots[0].r >= lowestPoint)) {
            this.v += this.g * (1 / (n * (n + 1) / 2))
            this.y += this.v
        }
        else if (playerShots[0].x >= this.x && playerShots[0].x <= this.x + this.values.w &&
            playerShots[0].y >= this.y + this.values.h && playerShots[0].y <= this.y + this.values.h + playerShots[0].r &&
            playerShots[0].y + playerShots[0].r >= lowestPoint) {
            this.y = playerShots[0].y - playerShots[0].r - this.values.h
            this.v = 0
        }
        else {
            this.v = 0

        }
        if (playerShots[0].x >= this.x && playerShots[0].x <= this.x + this.values.w &&
            playerShots[0].y >= this.y + this.values.h && playerShots[0].y <= this.y + this.values.h + playerShots[0].r &&
            playerShots[0].y + playerShots[0].r >= lowestPoint) playerShots[0].ys *= 0.5
    }
}

function objectCollision() {
    for (var i in objects) {

        var objekt = objects[i]
        var hrac = playerShots[0]

        objectEachOneBlock(i)

        if (objekt.y + objekt.values.h >= canvas.height) {
            objekt.y = canvas.height - objekt.values.h
            demage(objekt, "grav")
            objekt.v = 0
            objekt.onLand = true
        }

        if (hrac.x + hrac.r >= objekt.x
            && hrac.x + hrac.r <= objekt.x + objekt.values.w
            && hrac.y >= objekt.y
            && hrac.y <= objekt.y + objekt.values.h) {
            demage(objekt, "hor")
            if (objekt.hp > 0) {
                hrac.xs *= -0.7
                hrac.x = objekt.x - hrac.r
            }
            else objectDestroyCons(objekt)
            console.log("a")
        }
        else if (hrac.x - hrac.r >= objekt.x
            && hrac.x - hrac.r <= objekt.x + objekt.values.w
            && hrac.y >= objekt.y
            && hrac.y <= objekt.y + objekt.values.h) {
            demage(objekt, "hor")
            if (objekt.hp > 0) {
                hrac.xs *= -0.7
                hrac.x = objekt.x + objekt.values.w + hrac.r
            }
            else objectDestroyCons(objekt)
            console.log("b")
        }

        else if (hrac.x >= objekt.x
            && hrac.x <= objekt.x + objekt.values.w
            && hrac.y - hrac.r >= objekt.y
            && hrac.y - hrac.r <= objekt.y + objekt.values.h) {
            demage(objekt, "ver")
            if (objekt.hp > 0) {
                hrac.ys *= -1
                //  if (objekt.y + objekt.values.h + hrac.r*2) hrac.y = objekt.y + objekt.values.h + hrac.r
                hrac.y = objekt.y + objekt.values.h + hrac.r
            }
            else objectDestroyCons(objekt)
            console.log("c")
        }

        else if (hrac.x >= objekt.x
            && hrac.x <= objekt.x + objekt.values.w
            && hrac.y + hrac.r >= objekt.y
            && hrac.y + hrac.r <= objekt.y + objekt.values.h) {
            demage(objekt, "ver")
            if (objekt.hp > 0) {
                hrac.ys *= -1
                hrac.ys *= 0.5
                hrac.y = objekt.y - hrac.r - 0.1
            }
            else objectDestroyCons(objekt)
            console.log("d")
        }
        else if (vzdalenost(objekt.x, hrac.x, objekt.y, hrac.y) <= hrac.r) {
            if (hrac.x <= objekt.x - hrac.r + hrac.xs) {
                demage(objekt, "hor")
            }
            else {
                demage(objekt, "ver")
                if (objekt.hp > 0) {
                    var angle = drawAngle(objekt.x, hrac.x, objekt.y, hrac.y)
                    hrac.y = objekt.y + Math.sin(angle) * hrac.r
                }
            }
            if (objekt.hp > 0) {
                if (hrac.xs >= 0) {
                    hrac.ys *= -0.5
                    hrac.xs *= -0.85
                }
                else {
                    hrac.ys *= -0.5
                }
            }
            else {


            }
            console.log("e")
        }
        else if (vzdalenost(objekt.x + objekt.values.w, hrac.x, objekt.y, hrac.y) <= hrac.r) {
            if (hrac.x >= objekt.x + objekt.w + objekt.r) demage(objekt, "hor")
            else {
                demage(objekt, "ver")
                if (objekt.hp > 0) {
                    var angle = drawAngle(objekt.x + objekt.values.w, hrac.x, objekt.y, hrac.y)
                    hrac.y = objekt.y + Math.sin(angle) * hrac.r
                }
            }
            if (objekt.hp > 0) {
                if (hrac.xs <= 0) {
                    hrac.ys *= -0.5
                    hrac.xs *= -0.85
                }
                else {
                    hrac.ys *= -0.5
                }
            }
            else objectDestroyCons(objekt)
            console.log("f")
        }
        else if (vzdalenost(objekt.x, hrac.x, objekt.y + objekt.values.h, hrac.y) <= hrac.r) {
            var angle = drawAngle(objekt.x, hrac.x, objekt.y + objekt.values.h, hrac.y)
            if (hrac.y >= objekt.y && hrac.ys < 0) demage(objekt, "ver")
            else demage(objekt, "hor")
            if (objekt.hp > 0) {
                if (hrac.xs >= 0) {
                    hrac.y = objekt.y + objekt.values.h + Math.sin(angle) * hrac.r
                    hrac.xs *= -0.85
                    hrac.ys = Math.abs(hrac.ys * 0.85)
                }
            }
            else objectDestroyCons(objekt)
            console.log("g")
        }
        else if (vzdalenost(objekt.x + objekt.values.w, hrac.x, objekt.y + objekt.values.h, hrac.y) <= hrac.r) {
            //if (hrac.y >= objekt.y && hrac.ys < 0) demage(objekt, "ver")
            //else demage(objekt, "hor")
            if (objekt.hp > 0) {
                if (hrac.xs <= 0) {
                    hrac.xs *= -1
                    hrac.ys *= -1
                }
            }
            else objectDestroyCons(objekt)
            console.log("h")

        }
    }
}

function objectDestroyCons(index) {
    playerShots[0].xs *= 0.5
    playerShots[0].ys *= 0.5
    objectDestroy(index)
}

function objectEachOneBlock(i) {
    for (var k in objects) {
        if (k != i) {
            if (objects[i].x + objects[i].values.w >= objects[k].x && objects[i].x <= objects[k].x + objects[k].values.w
                && objects[i].y + objects[i].values.h >= objects[k].y && objects[i].y + objects[i].values.h / 2 <= objects[k].y + objects[k].values.h) {
                objects[i].y = objects[k].y - objects[i].values.h
                demage(objects[i], "grav")
                objects[i].v = 0
                objects[i].onLand = true
                return
            }

        }
    }
    objects[i].onLand = false
}

function demage(object, type) {
    switch (type) {
        case "hor": {
            if (Math.abs(playerShots[0].xs) >= 4) object.hp -= Math.abs(playerShots[0].xs)
            break
        }
        case "ver": {
            if (Math.abs(playerShots[0].ys) >= 10) object.hp -= Math.abs(playerShots[0].ys * 0.9)
            break
        }
        case "grav": {
            if (Math.abs(object.v) >= 3) object.hp -= Math.abs(object.v / 2)
        }
    }
    return
}

function objectDestroy(object) {
    var pieces = 0
    pieces += Math.floor(object.values.w / 20)
    pieces += Math.floor(object.values.h / 20)
    for (var i = 0; i < pieces; i++) {
        destroyAnimation.push(new ObjectDestroy(Math.random() * object.values.w + object.x, Math.random() * object.values.h + object.y, object.color))
        destroyAnimation[destroyAnimation.length - 1].angle()
        destroyAnimation[destroyAnimation.length - 1].direction()
    }
    objects.splice(objects.indexOf(object), 1)
    return
}

class ObjectDestroy {
    constructor(x, y, material) {
        this.x = x
        this.y = y
        this.w = Math.random() * 50 + 10
        this.h = this.w / 3
        this.wholeAngle = 0
        this.angle = () => {
            if (Math.random() >= 0.5) {
                this.angle = -1
                return;
            } this.angle = 1
        }
        this.rotationSpeed = Math.random() * 8 + 2
        this.color = material
        this.ys = Math.random() * 5 + 5
        this.xs = Math.random() * 5
        this.direction = () => {
            if (Math.random() >= 0.5) {
                this.direction = -1
                return;
            } this.direction = 1
        }
        this.g = Math.random() * 0.5 + 0.1
    }
    render() {
        this.x += this.xs * this.direction * dt
        this.y -= this.ys
        this.wholeAngle += this.rotationSpeed * dt
        c.save()
        c.translate(this.x + this.w / 2, this.y + this.h / 2)
        c.rotate(this.wholeAngle * (2 * Math.PI / 360))
        c.fillStyle = this.color
        c.fillRect(-this.w / 2, -this.h / 2, this.w, this.h)
        c.strokeStyle = "black"
        c.lineWidth = 1
        c.strokeRect(-this.w / 2, -this.h / 2, this.w, this.h)
        c.restore()
    }
    gravity() {
        this.ys -= this.g * dt
    }
}

function spliceAnimation() {
    for (var i in destroyAnimation) {
        if (destroyAnimation[i].x + destroyAnimation[i].w > 0 && destroyAnimation[i].x < canvas.width
            && destroyAnimation[i].y + destroyAnimation[i].h > 0 && destroyAnimation[i].y < canvas.height) return
    }
    destroyAnimation = []
}

// // // // // // // // // // // 

function setTypeValuesObject(type, material) {
    var values = {}
    switch (type) {
        case "little": {
            values.w = 30
            values.h = 120
            break
        }
        case "i": {
            values.w = 40
            values.h = 250
            break
        }
        case "I": {
            values.w = 60
            values.h = 450
            break
        }
        case "brick": {
            values.w = 300
            values.h = 300
            break
        }
        case "rect": {
            values.w = 300
            values.h = 200
            break
        }
        case "normal": {
            values.w = 300
            values.h = 40
            break
        }
        case "normalLong": {
            values.w = 600
            values.h = 50
            break
        }
        case "lay": {
            values.w = 400
            values.h = 50
            break
        }
        case "layer": {
            values.w = 500
            values.h = 100
            break
        }
        default:
            values.w = 1200
            values.h = 200
    }
    values.materialStats = getObjectStats(material)
    return values
}

function getObjectStats(material) {
    switch (material) {
        case "wood":
            return { color: "rgb(119, 64, 33)", hp: 30 }
        case "ice":
            return { color: "rgb(53, 180, 230)", hp: 15 }
        case "metal":
            return { color: "rgb(60, 61, 61)", hp: 60 }
        default:
            return { color: "rgb(119, 64, 33)", hp: 30 }
    }
}