// @ts-check
import _ from 'lodash';
import utils from '../utils.js';

const testInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`;

const solve = async (part) => {
  const input = await utils.loadInput('./input.txt');
  // const input = testInput.split('\n');
  
  /** @returns {{files: object, dirs: object, name: string, parent: any}} */
  const newFolderObj = () => {
    return {
      files: {},
      dirs: {},
      name: '',
      parent: null
    };
  }
  let root = {};
  /** @type {{files: object, dirs: object, name: string, parent: any}} */
  let currentDir = undefined;
  let prevDir;
  let allDirs = [];

  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    
    if (line.startsWith('$')) {
      if (line.startsWith('$ cd')) {
        const cmd = line.substring(5);

        if (cmd === '..') {
          currentDir = currentDir.parent;
        } else if (cmd === '/') {
          const newDir = newFolderObj();
          newDir.parent = null;
          newDir.name = cmd;
          currentDir = newDir;
          root = newDir;
          allDirs.push(newDir)
        } else {
          if (currentDir.dirs[cmd]) {
            currentDir = currentDir.dirs[cmd];
          } else {
            throw new Error('Directory not found');
          }
        }
      } else if (line.startsWith('$ ls')) {

        while(input[i+1] && !input[i+1].startsWith('$')) {
          i++;
          const subLine = input[i];
          if (subLine.startsWith('dir')) {
            const dir = subLine.substring(4);
            const newDir = newFolderObj();
            newDir.parent = currentDir;
            newDir.name = dir;
            currentDir.dirs[dir] = newDir;
            allDirs.push(newDir);
          
          } else {
            const [size, name] = subLine.split(' ');
            currentDir.files[name] = { name, size: parseInt(size) };
          }
        }
      } else {
        console.log(`doing nothing with this line: ${line}`)
      }
    }
  }


  print(root);
  const result1 = allDirs.map(dir => {
    return getSize(dir);
  }).reduce((acc, next) => {
    if (next  < 100000) {
      return acc + next;
    } else {
      return acc;
    }
  }, 0);

  const rootSize = getSize(root);

  const unused = 70000000 - rootSize;
  const reductionSize = 30000000 - unused;

  const result2 = allDirs.map(dir => {
    return {
      dir,
      size: getSize(dir)
    };
  }).filter(dir => {
    return dir.size >= reductionSize;
  }).reduce((acc, next) => {
    if (next.size < acc) {
      return next.size;
    } else {
      return acc;
    }
  }, 70000000);

  return { result1, result2};
}

solve().then(res => console.log(res));

function print(directory, indent = 0) {
  const indentString = '\t'.repeat(indent);

  console.log(indentString + directory.name);

  Object.values(directory.files).forEach(file => {
    console.log(`${indentString}\t${file.name} - ${file.size}`)
  });
  Object.values(directory.dirs).forEach(dir => {
    print(dir, indent+1);
  });
}

function getSize(directory) {
  let acc = 0;

  Object.values(directory.files).forEach(file => {
    acc += file.size;
  });
  Object.values(directory.dirs).forEach(dir => {
    acc += getSize(dir);
  });

  return acc;
}