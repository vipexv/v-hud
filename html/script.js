window.addEventListener("message", function (event) {
  const userHealth = document.getElementById("user-health");
  const userArmour = document.getElementById("user-armour");
  const mph = document.getElementById("mph");
  const vehGear = document.getElementById("gear");
  const vehFuel = document.getElementById("fuel");
  const centerigElement = document.querySelector(".centerig");
  switch (event.data.action) {
    case "update":
      var health = Math.min(event.data.health, 200);
      var armour = Math.floor(event.data.armour);
      health = Math.floor(health / 2);
      animateCount(userHealth, health, "%");
      animateCount(userArmour, armour, "%");
      break;
    case "updateVeh":
      centerigElement.style.display = "block";

      var speed = Math.floor(event.data.speed);
      var fuel = Math.floor(event.data.fuel);

      animateCount(mph, speed, " MP/H");
      animateCount(vehGear, event.data.gear);
      animateCount(vehFuel, fuel, "%");
      break;
    case "hideUI":
      centerigElement.style.display = "none";
      break;
  }
});

function animateCount(element, newValue, symbol = "") {
  const oldValue = parseInt(element.textContent, 10);

  if (oldValue === newValue) {
    return;
  }

  const duration = 1000; // Animation duration in milliseconds
  const start = performance.now();

  requestAnimationFrame(function animate(currentTime) {
    const elapsedTime = currentTime - start;
    const progress = Math.min(elapsedTime / duration, 1);
    const currentValue = Math.floor(
      oldValue + (newValue - oldValue) * progress
    );

    element.textContent = currentValue + symbol;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  });
}
