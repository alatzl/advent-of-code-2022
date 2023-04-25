import fs from 'fs/promises';
/*
  A > C
  B > A
  C > B
*/
const testInput = `A Y
B X
C Z`;

const calculateScores = async () => {
  // let input = testInput.split('\n');
  let input = await fs.readFile('./inputs/day2.txt');
  input = input.toString().split('\n');

  return method2(input);
}

const method1 = (input) => {
  const values = {
    A: 1, /* rock */
    B: 2, /* paper */
    C: 3, /* scissors */
    X: 1, /* rock */
    Y: 2, /* paper */
    Z: 3 /* scissors */
  };

  const loss = 0;
  const tie = 3;
  const win = 6;

  let totalPoints = 0;
  for( let i = 0; i < input.length; i++) {
    if (input[i] !== '') {
      const choices = input[i].split(' ');
      const opponent = choices[0];
      const suggestion = choices[1];

      let points = values[suggestion];
      console.log(`opponent: ${opponent}, suggestion: ${suggestion}`)
      if (opponent === 'A') {
        if (suggestion === 'X') {
          points += tie;
        } else if (suggestion === 'Y') {
          points += win;
        } // else, it's a loss for 0 points
      } else if (opponent === 'B') {
        if (suggestion === 'Y') {
          points += tie;
        } else if (suggestion === 'Z') {
          points += win;
        } // else, it's a loss for 0 points
      } else if (opponent === 'C') {
        if (suggestion === 'Z') {
          points += tie;
        } else if (suggestion === 'X') {
          points += win;
        } // else, it's a loss for 0 points
      }
      console.log(`Current points: ${points}`)
      totalPoints += points;
    }

    console.log(`Total points: ${totalPoints}`);
    return totalPoints;
  }
}

const method2 = (input) => {
  const values = {
    A: 1, // rock
    B: 2, // paper
    C: 3, // scissors
  };

  const outcomes = {
    X: 0, // loss
    Y: 3, // draw
    Z: 6 // win
  };

  let totalPoints = 0;
  for( let i = 0; i < input.length; i++) {
    if (input[i] !== '') {
      const choices = input[i].split(' ');
      const opponent = choices[0];
      const outcome = choices[1];
      console.log(`opponent: ${opponent}, outcome: ${outcome}`)
      let points = 0;
      points += outcomes[outcome];
      if (opponent === 'A') {
        if (outcome === 'Z') {
          // you need to win, so choose paper
          points += values.B;
        } else if (outcome === 'Y') {
          // you need to tie, so choose rock
          points += values.A;
        } else {
          points += values.C;
        }
      } else if (opponent === 'B') {
        if (outcome === 'Z') {
          points += values.C;
        } else if (outcome === 'Y') {
          points += values.B;
        } else {
          points += values.A;
        }
      } else if (opponent === 'C') {
        if (outcome === 'Z') {
          points += values.A;
        } else if (outcome === 'Y') {
          points += values.C;
        } else {
          points += values.B;
        }
      }
      console.log(`Current points: ${points}`)
      totalPoints += points;
    }


  }

  console.log(`Total points: ${totalPoints}`);
  return totalPoints;
}

calculateScores();