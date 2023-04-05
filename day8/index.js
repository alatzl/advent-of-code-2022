import _ from 'lodash';
import utils from '../utils.js';

const testInput = `30373
25512
65332
33549
35390`;

const solve = async () => {
  const input = await utils.loadInput('./input.txt');
  // const input = testInput.split('\n');

  let visibleTrees = 0;
  const visible = [];

  for (let i = 0; i < input.length; i++) {
    visible[i] = [];
    for (let j = 0; j < input[i].length; j++) {
      if (i === 0 || j === 0 || i === input.length - 1 || j === input[i].length - 1) {
        visibleTrees++;        
      } else {
        const isVisible = isVisibleFromEdge(input, i, j);
        if (isVisible) {
          visibleTrees++;
        }
      }
    }
  }


  function isVisibleFromEdge(arr, x, y) {
    const iMin = 0;
    const iMax = arr.length - 1;
    const jMin = 0;
    const jMax = arr[0].length - 1;
    let visible = false;

    for(let i = x-1; i >= iMin; i-- ) {
      if (arr[i][y] >= arr[x][y]) {
        break;
      } else if (i === iMin) {
        visible = true;
      }
    }

    if (!visible) {
      for (let j = y-1; j >= jMin; j--) {
        if (arr[x][j] >= arr[x][y]) {
          break;
        } else if (j === jMin) {
          visible = true;
        }
      }
    }

    if (!visible) {
      for (let i = x+1; i <= iMax; i++) {
        if (arr[i][y] >= arr[x][y]) {
          break;
        } else if (i === iMax) {
          visible = true;
        }
      }
    }
    if (!visible) {
      for (let j = y+1; j <= jMax; j++) {
        if (arr[x][j] >= arr[x][y]) {
          break;
        } else if (j === jMax) {
          visible = true;
        } 
      }
    }

    return visible;
  }

  return { result1: visibleTrees, result2: null };
}

solve().then(res => console.log(res));
