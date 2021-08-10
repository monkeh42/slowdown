var upgrades = {
    1: {
        title: "Unlock wind resistance",
        cost: new Decimal("5e1000"),
    }
}

function canAfford(id) {
    return player.distance.gte(upgrades[id].cost);
}

function buyUpgrade(id) {
    if (!canAfford(id)) { return }
    player.upgrades.push(id);
    document.getElementById("upgrade-" + id).classList.remove("cant");
    document.getElementById("upgrade-" + id).classList.remove("can");
    document.getElementById("upgrade-" + id).classList.add("bought");
}