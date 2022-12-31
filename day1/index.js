import fs from 'fs/promises';
import path from 'path';
import _ from 'lodash';

import stuff from '../index.js';
console.log(stuff);
// Find elf with most snacks
const getHungriestElf = async() => {
  try {
    const parsed = await loadInput('./input.txt');
    const elfCalories =  _.map(parsed, (elfArr, idx) => {
      return  _.sum(elfArr);
    });
    return _.max(elfCalories);
  } catch (err) {
    console.log(`OOPS! ${err}`)
  }
}

const getData = async () => {
  const data = await fs.readFile(__dirname + "/input.txt", "utf-8")

    const elfArrays = data.toString().split(`\n\n`).map(item => {
        return item.split(`\n`);
      });

    const parsed = elfArrays.map((arr) => {
      return _.compact(arr.map((item) => {
        return parseInt(item);
      }));
    });

    return parsed;
};

getHungriestElf();

const getTopThreeElves = async() => {
  try {
    const parsed = await getData();
    const top3 = _(parsed)
      .map((calArr) => _.sum(calArr))
      .sort()
      .reverse()
      .slice(0, 3)
      .sum();

    console.log(`the top 3 summed: ${top3}`);
  } catch (err) {
    console.log(`OOPS! ${err}`)
  }
}

getTopThreeElves();