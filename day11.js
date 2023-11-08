import _ from 'lodash';
import utils from './utils.js';

const testInput = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;


class Monkey {
    constructor(startingItems, operator, operand, divisibleBy, onTrue, onFalse) {
        this.items = startingItems
        this.operator = operator
        this.operand = operand
        this.divisibleBy = divisibleBy
        this.onDivisibleTrue = onTrue,
        this.onDivisibleFalse = onFalse
    }

    doThrow(idx) {
        return this.items.splice(idx, 1)[0]
    }

    catchThrow(item) {
        this.items.push(item)
    }
}

function inspectItem(currentValue, operator, operand) {
    let num = Number((operand === 'old') ? currentValue : operand);

    if (operator === '*') {
        return currentValue * num
    } else {
        return currentValue + num
    }
}

function isDivisible(value, divisor) {
    return value % divisor == 0;
}

const solve = async () => {
  const monkeys = await utils.loadInput('./inputs/day11.txt', '\n\n');
  // const monkeys = testInput.split('\n\n');

  const parsedMonkeys = [];
  
  monkeys.map(m => {
    parsedMonkeys.push(parseMonkey(m))
  });

  const result1 = calculateMonkeyBusiness(_.cloneDeep(parsedMonkeys), 20 /* numRounds */, (val) => Math.floor(val / 3));
  const lcm = parsedMonkeys.reduce((acc, curr) => acc * curr.divisibleBy, 1)
  const result2 = calculateMonkeyBusiness(_.cloneDeep(parsedMonkeys), 10000 /* numRounds */, (val) => {
    return val % lcm;
  });

  return { result1, result2 };
};

const parseMonkey = (monkeyData) => {
    const lines = monkeyData.split('\n')
    const startingItemsRegex = /(?:Starting items: )(.*)/g
    const operationRegex = /(?:Operation: new = old )(.*)/g
    const divisibleByRegex = /(?:Test: divisible by )(.*)/g
    const throwToTrueRegex = /(?:If true: throw to monkey )(.*)/g
    const throwToFalseRegex = /(?:If false: throw to monkey )(.*)/g

    const startingItemsInput = lines[1];
    let startingItems = []

    if (lines[1].startsWith('  Starting items: ')) {
        startingItems = startingItemsRegex.exec(startingItemsInput)[1].split(', ').map(x => parseInt(x, 10))
    }

    const operationInput = lines[2];
    let operator = ''
    let operand;

    const divisibleInput = lines[3]
    let divisibleBy;

    if (lines[2].startsWith('  Operation: new = old ')) {
        const opString = operationRegex.exec(operationInput)[1]
        operator = opString.substring(0,1)
        operand = opString.substring(1).trim()
    }

    if (lines[3].startsWith('  Test: divisible by ')) {
        divisibleBy = parseInt(divisibleByRegex.exec(divisibleInput)[1], 10)
    }

    let throwToOnTrue;
    let throwToOnFalse;

    if (lines[4].startsWith('    If true: throw to monkey ')) {
        throwToOnTrue = parseInt(throwToTrueRegex.exec(lines[4])[1], 10)
    }

    if (lines[5].startsWith('    If false: throw to monkey ')) {
        throwToOnFalse = Number(throwToFalseRegex.exec(lines[5])[1])
    }

    return new Monkey(startingItems, operator, operand, divisibleBy, throwToOnTrue, throwToOnFalse);
}

function calculateMonkeyBusiness(monkeys, numRounds = 1, lowerWorryLevels) {
    const processCounts = []

    for(let round = 0; round < numRounds; round++) {
        monkeys.forEach((m, x) => {
            if (round === 0) {
                processCounts[x] = 0
            }

            const originalItems = [...m.items]

            for (let i = 0; i < originalItems.length; i++) {
                processCounts[x] = processCounts[x] + 1
                const value = originalItems[i];
                const inspected = inspectItem(value, m.operator, m.operand)
                
                const worryAdjusted = lowerWorryLevels(inspected);

                m.items[i] = worryAdjusted;

                if (isDivisible(m.items[i], m.divisibleBy)) {
                    monkeys[m.onDivisibleTrue].catchThrow(m.items[i])
                } else {
                    monkeys[m.onDivisibleFalse].catchThrow(m.items[i])
                }
            }
            m.items = []
        })
    }
    const topInspectors = _.orderBy(processCounts, _.identity, 'desc')
    const monkeyBusiness = topInspectors[0] * topInspectors[1]

    return monkeyBusiness;
}

solve().then((res) => console.log(res));
