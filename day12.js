import _ from "lodash";
import utils from "./utils.js";

const testInput = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

const letters = 'abcdefghijklmnopqrstuvwxyz'

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
  for (let i = 0; i < input.length; i++) {
    // const line = input[i];
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === letter) {
        return [i, j]
      }
    }
  }
}

const calculateFewestSteps = (input) => {
  const startCoordinates = getLetterCoordinates(input, 'S');
  const endCoordinates = getLetterCoordinates(input, 'E');

  return getShortestPathLength(input, startCoordinates, endCoordinates)
}

function canEnterCell(heightMap, visited, x, y, current) {
  console.log(`Check if can enter [${x}, ${y}]; current is "${current}"`)

  const currentNumeric = letters.indexOf(current);
  console.log(`x = ${x}, y = ${y}`)

  return x >= 0 && x < heightMap.length 
    && y >= 0 && y < heightMap[0].length 
    && nextLetterSafe(currentNumeric, letters.indexOf(heightMap[x][y]))
    && !visited[x][y];
}

function nextLetterSafe(current, next) {
  console.log(`in nextLetterSafe`, current, next, next > current);
  // "next" can be AT MOST 1 greater than current, or any amount less.
  return (next <= current || next === current + 1) || next == 'E';
}

function getShortestPath(heightMap, visited, i, j, x, y, min_distance, distance) {
  let min_dist = min_distance
  console.log(`get shortest path from [${i}][${j}] to [${x}][${y}]`)
  let currentValue = heightMap[i][j];
  if (i === x && j === y) {
    console.log('BINGO')
    min_dist = Math.min(distance, min_dist)
    return min_dist;
  }

  visited[i][j] = true;

  // bottom
  if (canEnterCell(heightMap, visited, i+1, j, currentValue)) {
    min_dist = getShortestPath(heightMap, visited, i+1, j, x, y, min_dist, distance)
  }

  // top
  if (canEnterCell(heightMap, visited, i - 1, j, currentValue)) {
    min_dist = getShortestPath(heightMap, visited, i-1, j, x, y, min_dist, distance)
  }

  // right
  if (canEnterCell(heightMap, visited, i, j + 1, currentValue)) {
    min_dist = getShortestPath(heightMap, visited, i, j + 1, x, y, min_dist, distance)
  }

  // left
  if (canEnterCell(heightMap, visited, i, j - 1, currentValue)) {
    min_dist = getShortestPath(heightMap, visited, i, j - 1, x, y, min_dist, distance)
  }
  console.log('min dist?', min_dist)
  // backtrack? why?
  visited[i][j] = false;

  return min_dist;
}

function getShortestPathLength(heightMap, startCoordinates, endCoordinates) {
  console.log(`getShortestPathLength from ${startCoordinates} to ${endCoordinates}`)
  const visited = [];
  for (let i = 0; i < heightMap.length; i++) {
    visited.push(new Array(heightMap[0].length));
    for (let j = 0; j < heightMap[0].length; j++) {
      visited[i][j] = false
    }
  }

  // console.log('visited', visited);

  let distance = Number.MAX_SAFE_INTEGER
  console.log('to start', distance)
  distance = getShortestPath(
    heightMap, visited, 
    startCoordinates[0], startCoordinates[1], 
    endCoordinates[0], endCoordinates[1], 
    distance, 0);

  return distance;
}

solve().then((res) => console.log(res));
