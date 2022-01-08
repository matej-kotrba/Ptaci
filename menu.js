var menuImages = {
    bg: new Image(),
    set: ()=> {
        menuImages.bg.src = "./img/menuimage.png"
    }
}

menuImages.set()

function setMenu() {
    buttons.push(new Button(canvas.width / 2, 250, 500, 100, "normal", "PLAY"))
    buttons[buttons.length - 1].getVar()
}

class Button {
    constructor(x, y, w, h, type, text) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.type = type
        this.text = text
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
                    break
                }
                default: {

                }
            }
        }
    }
    render() {
        if (mouse.movex >= this.x - this.w / 2 && mouse.movex <= this.x + this.w / 2 &&
            mouse.movey >= this.y && mouse.movey <= this.y + this.h) c.fillStyle = "rgb(222, 236, 18)"
        else c.fillStyle = this.variables.bgcolor
        c.fillRect(this.x - this.w / 2, this.y, this.w, this.h)
        c.font = "60px Verdana"
        c.textAlign = "center"
        if (mouse.movex >= this.x - this.w / 2 && mouse.movex <= this.x + this.w / 2 &&
            mouse.movey >= this.y && mouse.movey <= this.y + this.h) c.fillStyle = this.variables.bgcolor
        else c.fillStyle = c.fillStyle = "rgb(222, 236, 18)"
        c.fillText(this.text, this.x, this.y + this.h / 2 + Number(c.font.split("px")[0]) / 3)
    }
    click() {
        if (mouse.x >= this.x - this.w / 2 && mouse.x <= this.x + this.w / 2 &&
            mouse.y >= this.y && mouse.y <= this.y + this.h) {
                game.display = "game"
            }
    }
}