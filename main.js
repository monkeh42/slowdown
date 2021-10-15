var player = {
    force: new Decimal(2.1e7),
    mass: new Decimal(70),
    speed: new Decimal(0),
    distance: new Decimal(0),
    lastUpdate: new Date().getTime(),

    dragCoeff: new Decimal(0.5),
    surfaceArea: new Decimal(1),
    airDensity: new Decimal(1),

    upgrades: [],
}

const SPEED_OF_LIGHT = new Decimal(299792458);

function init() {
    startInterval();
}

function startInterval() {
    mainLoop = setInterval(gameLoop, 50);
}

function gameLoop() {
    var currentUpdate = new Date().getTime();
    diff = new Decimal(currentUpdate - player.lastUpdate);
    if (player.upgrades.includes(1)) { player.force = player.force.minus(calculateAirRes()); }
    player.distance = player.distance.plus(calculateDistance(player.speed, player.speed.plus(calculateAcc().times(diff.div(1000))), diff))
    player.speed = Decimal.min(player.speed.plus(calculateAcc().times(diff.div(1000))), SPEED_OF_LIGHT);

    document.getElementById("speed").innerHTML = regularFormat(player.speed, 2);
    document.getElementById("distance").innerHTML = regularFormat(player.distance, 2);
    document.getElementById("acc").innerHTML = regularFormat(calculateAcc(), 1);
    document.getElementById("mass").innerHTML = regularFormat(player.mass, 1);
    document.getElementById("force").innerHTML = regularFormat(player.force, 1);
    document.getElementById("air").innerHTML = regularFormat(calculateAirRes(), 1);
    document.getElementById("newspeed").innerHTML = regularFormat(calculateSpeed(), 1);

    if (!player.upgrades.includes(1)) {
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

function calculateSpeed() {
    let v = player.force.times(2).div(player.airDensity.times(player.dragCoeff).times(player.surfaceArea)).sqrt();
    return v;
}

function calculateAirRes() {
    let r = player.airDensity.times(player.dragCoeff).times(player.surfaceArea).div(2).times(Decimal.pow(player.speed, 1.5));
    return r;
}

function calculateDistance(start, end, diff) {
    let avg = start.plus(end).div(2);
    return avg.times(diff.div(1000));
}