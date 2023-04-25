import _ from 'lodash';
import utils from './utils.js';

const testInput = `30373
25512
65332
33549
35390`;

const solve = async () => {
  const input = await utils.loadInput('./inputs/day8.txt');
  // const input = testInput.split('\n');

  let visibleTrees = 0;
  let maxScenicScore = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (
        i === 0 ||
        j === 0 ||
        i === input.length - 1 ||
        j === input[i].length - 1
      ) {
        visibleTrees++;
      } else {
        const visibility = getVisibilityInfo(input, i, j);
        if (visibility.visible) {
          visibleTrees++;
        }

        if (visibility.scenicScore > maxScenicScore) {
          maxScenicScore = visibility.scenicScore;
        }
      }
    }
  }

  return { result1: visibleTrees, result2: maxScenicScore };
};

function getVisibilityInfo(arr, x, y) {
  const iMin = 0;
  const iMax = arr.length - 1;
  const jMin = 0;
  const jMax = arr[0].length - 1;
  let visible = {
    left: false,
    top: false,
    right: false,
    bottom: false,
  };

  let numTrees = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };

  // console.log(`Checking item at ${x}, ${y}`);
  for (let i = x - 1; i >= iMin; i--) {
    numTrees.top++;

    if (arr[i][y] >= arr[x][y]) {
      break;
    } else {
      if (i === iMin) {
        visible.top = true;
      }
    }
  }

  for (let j = y - 1; j >= jMin; j--) {
    numTrees.left++;
    if (arr[x][j] >= arr[x][y]) {
      break;
    } else {
      if (j === jMin) {
        visible.left = true;
      }
    }
  }

  for (let i = x + 1; i <= iMax; i++) {
    numTrees.bottom++;

    if (arr[i][y] >= arr[x][y]) {
      break;
    } else {
      if (i === iMax) {
        visible.bottom = true;
      }
    }
  }

  for (let j = y + 1; j <= jMax; j++) {
    numTrees.right++;

    if (arr[x][j] >= arr[x][y]) {
      break;
    } else {
      if (j === jMax) {
        visible.right = true;
      }
    }
  }

  const results = {
    visible: _.some(Object.keys(visible), (k) => {
      return visible[k] === true;
    }),
    scenicScore: _.reduce(numTrees, (acc, val) => {
      return acc * val;
    }, 1),
  };

  return results;
}

solve().then((res) => console.log(res));
