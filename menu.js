var menuImages = {
    bg: new Image(),
    cross: new Image(),
    lock: new Image(),
    star: new Image(),
    blankstar: new Image(),
    tick: new Image(),
    again: new Image(),
    exit: new Image(),
    set: () => {
        menuImages.bg.src = "./img/menuimage.png"
        menuImages.cross.src = "./img/escape.png"
        menuImages.lock.src = "./img/lock.png"
        menuImages.star.src = "./img/star.png"
        menuImages.blankstar.src = "./img/start-blank.png"
        menuImages.tick.src = "./img/tick.png"
        menuImages.again.src = "./img/again.png"
        menuImages.exit.src = "./img/exit.png"
    }
}

menuImages.set()

function setMenu() {
    buttons.push(new Button("normal", "PLAY", "levels", canvas.width / 2, 250, 500, 100))
    buttons.push(new Button("normal", "SHOP", "shop", canvas.width / 2, 400, 500, 100))
}

function setLevels() {

    for (var i = 0; i < 12; i++) {
        buttons.push(new Button("level", i + 1, "game", canvas.width / 2, 250))

    }
    buttons.push(new Button("cross", 0, "menu", 1400, 50, 50, 50))
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
}

class Button {
    constructor(type, text, page, x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.type = type
        this.text = text
        this.page = page
        this.hover = () => { }
        this.normal = () => { }
        /*this.gradient = c.createLinearGradient(this.x,this.y,this.x+this.w,this.y);
        this.gradient.addColorStop("0", "rgb(222, 236, 18)");
        this.gradient.addColorStop("1.0", "rgb(27, 27, 27)");
        */
        this.variables = {}
        this.getVar = () => {
            switch (type) {
                case "main": {

                }
                case "normal": {
                    this.variables.bgcolor = "rgb(27, 27, 27)"
                    this.variables.textcolor = "rgb(222, 236, 18)"
                    this.hover = () => {
                        c.fillStyle = this.variables.textcolor
                        c.fillRect(this.x - this.w / 2, this.y, this.w, this.h)
                        c.fillStyle = this.variables.bgcolor
                        c.font = "60px Verdana"
                        c.textAlign = "center"
                        c.fillText(this.text, this.x, this.y + this.h / 2 + Number(c.font.split("px")[0]) / 3)
                    }
                    this.normal = () => {
                        c.fillStyle = this.variables.bgcolor
                        c.fillRect(this.x - this.w / 2, this.y, this.w, this.h)
                        c.fillStyle = this.variables.textcolor
                        c.font = "60px Verdana"
                        c.textAlign = "center"
                        c.fillText(this.text, this.x, this.y + this.h / 2 + Number(c.font.split("px")[0]) / 3)
                    }
                    break
                }
                case "level": {
                    this.variables.bgcolor = "rgb(22, 22, 22)"
                    this.variables.textcolor = "rgb(222, 236, 18)"
                    this.w = 300
                    this.h = 200
                    this.x = ((buttons.length+1) > 4) ? ((buttons.length+1) - 4 * Math.floor((buttons.length) / 4)) * this.w + 0 : (buttons.length+1) * this.w + 0
                    this.y = this.h * Math.floor((buttons.length) / 4) + 50
                    this.hover = () => {
                        c.font = "70px Verdana"
                        c.textAlign = "center"
                        c.fillStyle = this.variables.bgcolor
                        c.fillRect(this.x - this.w / 2, this.y, this.w, this.h)
                        c.lineWidth = 3
                        c.strokeStyle = this.variables.textcolor
                        c.strokeRect(this.x - this.w / 2, this.y, this.w, this.h)
                        c.fillStyle = this.variables.textcolor
                        c.fillText(this.text, this.x, this.y + this.h / 2 + Number(c.font.split("px")[0]) / 3)
                        if (levelsInfo.levelsCompleted < buttons.indexOf(this)) c.drawImage(menuImages.lock, this.x - this.w / 2, this.y, this.w, this.h)
                        else {
                            for (var i = 0; i < levelsStats[buttons.indexOf(this)]; i++) {
                                c.drawImage(menuImages.star, this.x - 85 + (60 * i), this.y + this.h - 60, 50, 50)
                            }
                            for (var k = levelsStats[buttons.indexOf(this)]; k < 3; k++) {
                                c.drawImage(menuImages.blankstar, this.x - 85 + (60 * k), this.y + this.h - 60, 50, 50)
                            }
                        }
                    }
                    this.normal = () => {
                        c.font = "60px Verdana"
                        c.textAlign = "center"
                        c.fillStyle = this.variables.bgcolor
                        c.fillRect(this.x - this.w / 2, this.y, this.w, this.h)
                        c.fillStyle = this.variables.textcolor
                        c.fillText(this.text, this.x, this.y + this.h / 2 + Number(c.font.split("px")[0]) / 3)
                        if (levelsInfo.levelsCompleted < buttons.indexOf(this)) c.drawImage(menuImages.lock, this.x - this.w / 2, this.y, this.w, this.h)
                        else {
                            for (var i = 0; i < levelsStats[buttons.indexOf(this)]; i++) {
                                c.drawImage(menuImages.star, this.x - 85 + (60 * i), this.y + this.h - 60, 50, 50)
                            }
                            for (var k = levelsStats[buttons.indexOf(this)]; k < 3; k++) {
                                c.drawImage(menuImages.blankstar, this.x - 85 + (60 * k), this.y + this.h - 60, 50, 50)
                            }
                        }
                    }
                    break
                }
                case "cross": {
                    this.normal = () => {
                        c.drawImage(menuImages.cross, this.x - this.w / 2, this.y, this.w, this.h)
                    }
                    this.hover = () => {
                        c.fillStyle = "black"
                        c.fillRect(this.x - this.w / 2, this.y, this.w, this.h)
                        c.drawImage(menuImages.cross, this.x - this.w / 2, this.y, this.w, this.h)
                    }
                    break
                }
                case "again": {
                    this.angle = 0
                    this.normal = () => {
                        c.save()
                        c.translate(this.x, this.y + this.h / 2)
                        c.rotate(this.angle * (2 * Math.PI / 360))
                        c.drawImage(menuImages.again, -this.w / 2, -this.h / 2, this.w, this.h)
                        c.restore()
                    }
                    this.hover = () => {
                        this.angle -= 5
                        c.save()
                        c.translate(this.x, this.y + this.h / 2)
                        c.rotate(this.angle * (2 * Math.PI / 360))
                        c.drawImage(menuImages.again, -this.w / 2, -this.h / 2, this.w, this.h)
                        c.restore()
                    }
                    break;
                }
                case "exit": {
                    this.baseW = this.w
                    this.baseX = this.x
                    this.normal = () => {
                        c.drawImage(menuImages.exit,this.x-this.w/2,this.y,this.w,this.h)
                    }
                    this.hover = () => {
                        this.w -= 3
                        this.x += 0
                        if (this.w <= -this.baseW) {
                            this.w = this.baseW
                            this.x = this.baseX
                        }
                        c.drawImage(menuImages.exit,this.x-this.w/2,this.y,this.w,this.h)
                    }
                    break
                }
                case "buy": {
                    this.variables.bgcolor = "rgb(22, 22, 22)"
                    this.variables.textcolor = "rgb(222, 236, 18)"
                    this.w = 300
                    this.h = 200
                    this.x = ((buttons.length+1) > 4) ? ((buttons.length+1) - 4 * Math.floor((buttons.length) / 4)) * this.w + 0 : (buttons.length+1) * this.w + 0
                    this.y = this.h * Math.floor((buttons.length) / 4) + 50
                    this.hover = () => {
                        c.font = "70px Verdana"
                        c.textAlign = "center"
                        c.fillStyle = this.variables.bgcolor
                        c.fillRect(this.x - this.w / 2, this.y, this.w, this.h)
                        c.lineWidth = 3
                        c.strokeStyle = this.variables.textcolor
                        c.strokeRect(this.x - this.w / 2, this.y, this.w, this.h)
                        c.fillStyle = this.variables.textcolor
                        c.fillText(this.text, this.x, this.y + this.h / 2 + Number(c.font.split("px")[0]) / 3)
                        if (levelsInfo.levelsCompleted < buttons.indexOf(this)) c.drawImage(menuImages.lock, this.x - this.w / 2, this.y, this.w, this.h)
                        else {
                            for (var i = 0; i < levelsStats[buttons.indexOf(this)]; i++) {
                                c.drawImage(menuImages.star, this.x - 85 + (60 * i), this.y + this.h - 60, 50, 50)
                            }
                            for (var k = levelsStats[buttons.indexOf(this)]; k < 3; k++) {
                                c.drawImage(menuImages.blankstar, this.x - 85 + (60 * k), this.y + this.h - 60, 50, 50)
                            }
                        }
                    }
                    this.normal = () => {
                        c.font = "60px Verdana"
                        c.textAlign = "center"
                        c.fillStyle = this.variables.bgcolor
                        c.fillRect(this.x - this.w / 2, this.y, this.w, this.h)
                        c.fillStyle = this.variables.textcolor
                        c.fillText(this.text, this.x, this.y + this.h / 2 + Number(c.font.split("px")[0]) / 3)
                        if (levelsInfo.levelsCompleted < buttons.indexOf(this)) c.drawImage(menuImages.lock, this.x - this.w / 2, this.y, this.w, this.h)
                        else {
                            for (var i = 0; i < levelsStats[buttons.indexOf(this)]; i++) {
                                c.drawImage(menuImages.star, this.x - 85 + (60 * i), this.y + this.h - 60, 50, 50)
                            }
                            for (var k = levelsStats[buttons.indexOf(this)]; k < 3; k++) {
                                c.drawImage(menuImages.blankstar, this.x - 85 + (60 * k), this.y + this.h - 60, 50, 50)
                            }
                        }
                    }
                }
                default: {

                }
            }
        }
        this.getVar()
    }
    render() {
        if (mouse.movex > this.x - this.w / 2 && mouse.movex < this.x + this.w / 2 &&
            mouse.movey > this.y && mouse.movey < this.y + this.h || mouse.movex > this.baseX - this.baseW / 2 && mouse.movex < this.baseX + this.baseW / 2 &&
            mouse.movey > this.y && mouse.movey < this.y + this.h) this.hover()
        else this.normal()
    }
}

function pageSwitch(buttonIndex) {
    var tlac = buttons[buttonIndex]
    if (tlac.page != "game" || levelsInfo.levelsCompleted >= buttonIndex) {
        buttons = []
        game.display = tlac.page
    }
    switch (tlac.page) {
        case "levels": {
            setLevels()
            break;
        }
        case "menu": {
            setMenu()
            break;
        }
        case "game": {
            if (levelsInfo.levelsCompleted >= buttonIndex) {
                setGame(tlac.text)
            }
            break;
        }
        case "pause": {
            setPause()
            break
        }
        case "resume": {
            game.display = "game"
            break;
        }
        case "shop": {
            setShop()
        }
    }
    mouse.x = undefined
    mouse.y = undefined
}

function pageSwitchDirect(page) {
    if (page != "game") {
        buttons = []
        game.display = page
    }
    switch (page) {
        case "levels": {
            setLevels()
            break;
        }
        case "menu": {
            setMenu()
            break;
        }
        case "game": {
            if (levelsInfo.levelsCompleted >= buttonIndex) {
                setGame(tlac.text)
            }
            break;
        }
        case "pause": {
            setPause()
            break
        }
        case "resume": {
            game.display = "game"
            break;
        }
    }
    mouse.x = undefined
    mouse.y = undefined
}