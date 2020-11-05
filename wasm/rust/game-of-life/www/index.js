import { Universe } from "game-of-life";

const pre = document.getElementById("game-of-life");
const universe = Universe.new();

const render = () => {
  pre.textContent = universe.render();
  universe.tick();

  requestAnimationFrame(render);
};

requestAnimationFrame(render);
