function skinOwned(where, name) {
    for (var i in skins[where]) {
        if (i == name && skins[where][i].owned) return true
    }
    return false
}

function equippedSkin(name, type) {
    for (var i in skins[name]) {
        if (skins[name][i].equipped) {
            return skins[name][i][type]
        }
    }
    return skins[name].normal[type]
}

function switchSkin(name, skin) {
    for (var i in skins[name]) {
        skins[name][i].equipped = false
    }
    skins[name][skin].equipped = true
    console.log(skins)
}