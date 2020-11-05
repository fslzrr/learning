import { Universe, Cell } from "game-of-life";
import { memory } from "game-of-life/game_of_life_bg";

// Constants declarations
const SIZE_CELL = 5;
const COLOR_ALIVE = "#000000";
const COLOR_DEAD = "#FFFFFF";
const COLOR_GRID = "#CCCCCC";

// Constructing the universe
const universe = Universe.new();
const width = universe.width();
const height = universe.height();

// Setting up canvas
const canvas = document.getElementById("game-of-life");
canvas.height = (SIZE_CELL + 1) * (height + 1);
canvas.width = (SIZE_CELL + 1) * (width + 1);

const ctx = canvas.getContext("2d");

const drawGrid = () => {
  ctx.beginPath();
  ctx.strokeStyle = COLOR_GRID;

  // Draw vertical line
  for (let i = 0; i <= width; i++) {
    const x = i * (SIZE_CELL + 1) + 1;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, (SIZE_CELL + 1) * height + 1);
  }

  // Horizontal lines.
  for (let j = 0; j <= height; j++) {
    const y = j * (SIZE_CELL + 1) + 1;
    ctx.moveTo(0, y);
    ctx.lineTo((SIZE_CELL + 1) * width + 1, y);
  }

  ctx.stroke();
};

const getIndex = (row, column) => {
  return row * width + column;
};

const drawCells = () => {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

  ctx.beginPath();

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col);

      ctx.fillStyle = cells[idx] === Cell.Dead ? COLOR_DEAD : COLOR_ALIVE;

      ctx.fillRect(
        col * (SIZE_CELL + 1) + 1,
        row * (SIZE_CELL + 1) + 1,
        SIZE_CELL,
        SIZE_CELL
      );
    }
  }

  ctx.stroke();
};

// Rendering
const render = () => {
  universe.tick();

  drawGrid();
  drawCells();

  requestAnimationFrame(render);
};

drawGrid();
drawCells();
requestAnimationFrame(render);
