var player = {
    force: new Decimal("1e2000"),
    mass: new Decimal("1e1000"),
    speed: new Decimal(0),
    lastUpdate: new Date().getTime(),
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
    player.speed = player.speed.plus(calculateAcc().times(diff.div(1000)));

    document.getElementById("speed").innerHTML = regularFormat(player.speed, 2);
    document.getElementById("acc").innerHTML = regularFormat(calculateAcc(), 1);
    document.getElementById("mass").innerHTML = regularFormat(player.mass, 1);
    document.getElementById("force").innerHTML = regularFormat(player.force, 1);
}

function calculateAcc() {
    let g = player.force.div(player.mass);
    return g;
}