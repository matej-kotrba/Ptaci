function skinOwned(name) {
    for (var i in skins) {
        for (var k in skins[i]) {
            if (k == name && skins[i][k].owned) return true
        }
    }
    return false
}

function equippedSkin(name) {
    for (var i in skins[name]) {
        if (skins[name][i].equipped) {
            return skins[name][i].image
        }
    }
    return skins[name].normal.image
}

function switchSkin(name, skin) {
    for (var i in skins[name]) {
        skins[name][i].equipped = false
    }
    skins[name][skin].equipped = true
    console.log(skins)
}