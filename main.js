var player = {
    force: new Decimal("1e2000"),
    mass: new Decimal("1e1000"),
    speed: new Decimal(0),
    distance: new Decimal(0),
    lastUpdate: new Date().getTime(),

    upgrades: [],
}

function init() {
    startInterval();
}

function startInterval() {
    mainLoop = setInterval(gameLoop, 50);
}

function gameLoop() {
    var currentUpdate = new Date().getTime();
    diff = new Decimal(currentUpdate - player.lastUpdate);
    player.distance = player.distance.plus(calculateDistance(player.speed, player.speed.plus(calculateAcc().times(diff.div(1000))), diff))
    player.speed = player.speed.plus(calculateAcc().times(diff.div(1000)));

    document.getElementById("speed").innerHTML = regularFormat(player.speed, 2);
    document.getElementById("distance").innerHTML = regularFormat(player.distance, 2);
    document.getElementById("acc").innerHTML = regularFormat(calculateAcc(), 1);
    document.getElementById("mass").innerHTML = regularFormat(player.mass, 1);
    document.getElementById("force").innerHTML = regularFormat(player.force, 1);

    if (!player.upgrades.includes(id)) {
        if (canAfford(1) && document.getElementById("upgrade-1").classList.contains("cant")) {
            document.getElementById("upgrade-1").classList.remove("cant");
            document.getElementById("upgrade-1").classList.add("can");
        } else if (!canAfford(1) && document.getElementById("upgrade-1").classList.contains("can")) {
            document.getElementById("upgrade-1").classList.remove("can");
            document.getElementById("upgrade-1").classList.add("cant");
        }
    }
}

function calculateAcc() {
    let g = player.force.div(player.mass);
    return g;
}

function calculateDistance(start, end, diff) {
    let avg = start.plus(end).div(2);
    return avg.times(diff.div(1000));
}