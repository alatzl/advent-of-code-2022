import fs from 'fs/promises';
import _ from 'lodash';

const loadInput = async (fileName) => {
  let input = await fs.readFile(fileName);
  input = _.compact(input.toString().split('\n'));

  return input;
}

export default {
  loadInput
}