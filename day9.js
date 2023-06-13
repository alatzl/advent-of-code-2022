import _ from "lodash";
import utils from "./utils.js";

const testInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const solve = async () => {
  // const input = testInput.split("\n");
  const input = await utils.loadInput("./inputs/day9.txt");
  let tailPositions = [];
  tailPositions.push("0,0"); // to account for starting position

  const h = {
    x: 0,
    y: 0,
  };

  const t = {
    x: 0,
    y: 0,
  };

  input.forEach((str) => {
    const [direction, steps] = str.split(" ");
    let axis = "";
    let stepValue = 0;
    switch (direction) {
      case "R":
        axis = "x";
        stepValue = 1;
        break;
      case "U":
        axis = "y";
        stepValue = 1;
        break;
      case "D":
        axis = "y";
        stepValue = -1;
        break;
      case "L":
        axis = "x";
        stepValue = -1;
        break;
      default:
        break;
    }

    for (let i = 1; i <= steps; i++) {
      h[axis] += stepValue;
      const [x, y] = determineTailNextMove(h, t);
      t.x += x;
      t.y += y;

      tailPositions.push(`${t.x},${t.y}`);
      // printPositions(h, t);
    }
  });

  // count up all visited tail positions
  const uniqueTailPositions = Array.from(new Set(tailPositions));

  return { result1: uniqueTailPositions.length, result2: null };
};

const printPositions = (h, t) =>
  console.log(`H: ${h.x}, ${h.y}; T: ${t.x}, ${t.y}`);

const isAdjacent = (h, t) => {
  const { x: hx, y: hy } = h;
  const { x: tx, y: ty } = t;

  let adjacent = false;

  const xDiff = Math.abs(hx - tx);
  const yDiff = Math.abs(hy - ty);

  if (xDiff <= 1 && yDiff <= 1) {
    adjacent = true;
  }

  return adjacent;
};

const determineTailNextMove = (h, t) => {
  const returnMoves = [0, 0];

  if (isAdjacent(h, t)) {
    return returnMoves;
  }
  const { x: hx, y: hy } = h;
  const { x: tx, y: ty } = t;

  if (hx > tx) {
    returnMoves[0] = 1;
  }
  if (hx < tx) {
    returnMoves[0] = -1;
  }
  if (hy > ty) {
    returnMoves[1] = 1;
  }
  if (hy < ty) {
    returnMoves[1] = -1;
  }

  return returnMoves;
};

solve().then((res) => console.log(res));
