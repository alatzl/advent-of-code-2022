import fs from 'fs/promises';
import _ from 'lodash';

const loadInput = async (fileName, splitStr = '\n') => {
  let input = await fs.readFile(fileName);
  input = _.compact(input.toString().split(splitStr));

  return input;
}

export default {
  loadInput
}