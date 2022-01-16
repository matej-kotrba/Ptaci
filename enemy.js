var pigImages = {
    normal: new Image(),
    set: () => {
        pigImages.normal.src = "./img/pig.png"
    }
}

pigImages.set()

class Pig {
    constructor(x,y) {
        this.x = x
        this.y = y
        this.r = 50
        this.v = 0
        this.g = 0.2
        this.angle = 0
        this.onLand = false
    }
    render() {
        c.save()
        c.translate(this.x, this.y)
        c.rotate(this.angle)
        c.drawImage(pigImages.normal, -this.r, -this.r, this.r * 2, this.r * 2)
        c.restore()
        c.lineWidth = 5
        c.strokeStyle = "black"
        c.beginPath()
        c.arc(this.x,this.y,this.r,0,2*Math.PI)
        c.stroke()
        c.closePath()
    }
    gravity() {
        if (!this.onLand) {
            this.v += this.g * (2/3*dt)
            if (dt < 0.9) this.y += this.v * 2/3
            else this.y += this.v
        }
        else this.v = 0
    }
    kill() {
        this.angle += (15 * (Math.PI/180)) * dt
        this.r -= 1 * dt
        this.y -= 2 * dt
        if (this.r <= 0) {
            pigsKillAnimation.splice(pigsKillAnimation.indexOf(this),1)
        }
    }
}

function pigCollision() {
    for (var k in pigs) {
        pigs[k].onLand = false
        if (pigs[k].y + pigs[k].r >= canvas.height) {
            pigs[k].y = canvas.height - pigs[k].r
            pigs[k].onLand = true
            if (pigs[k].v > 15) {
                pigsKill(k)
                return
            }
        }
        for (var i in objects) {
            if (pigs[k].x + pigs[k].r >= objects[i].x && pigs[k].x <= objects[i].x + objects[i].values.w
                && pigs[k].y + pigs[k].r >= objects[i].y && pigs[k].y <= objects[i].y + objects[i].values.h) {
                if (pigs[k].y <= objects[i].y) {
                    pigs[k].y = objects[i].y - pigs[k].r
                    pigs[k].onLand = true
                    if (pigs[k].v > 10) {
                        pigsKill(k)
                        return
                    }
                }
                if (pigs[k].y + pigs[k].r >= objects[i].y + objects[i].values.h) {
                    pigsKill(k)
                    return
                }
            }
        }
        
        if (vzdalenost(playerShots[0].x, pigs[k].x, playerShots[0].y, pigs[k].y) < playerShots[0].r + pigs[k].r) {
             pigsKill(k)
             return
        }
    }
}

function pigsKill(k) {
    pigsKillAnimation.push(pigs[k])
    pigs.splice(k, 1)
}