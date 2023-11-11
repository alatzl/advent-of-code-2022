import _ from "lodash";
import utils from "./utils.js";

const testInput = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

const solve = async () => {
  const input = testInput.split("\n");
  // const input = await utils.loadInput("./inputs/day12.txt");

  // const heightMap = parseInput(input);

  const result1 = calculateFewestSteps(input);

  return {
    result1,
    result2: null,
  };
};

const getLetterCoordinates = (input, letter) => {
  let x = 0;
  let y = 0;

  for (let i = 0; i < input.length; i++) {
    // const line = input[i];
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === letter) {
        x = j;
        y = i;
        return {x, y}
      }
    }
  }
}

const calculateFewestSteps = (input) => {
  const startCoordinates = getLetterCoordinates(input, 'S');
  const endCoordinates = getLetterCoordinates(input, 'E');


  return {startCoordinates, endCoordinates}
}

solve().then((res) => console.log(res));
