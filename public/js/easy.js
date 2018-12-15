/* global document:true alert:true */
//                        ДО НАЧАЛА ИГРЫ

const artIntCourse = []; // массив сделан. ходов компьт.
const gamersCourse = []; // массив сделан. ходов игрока
const totalArr = [];
let gamer = '';
let artInt = '';
const startButton = document.getElementById('startButton');
const partyO = document.getElementById('partyO');
const partyX = document.getElementById('partyX');
const table = document.getElementById('table');
const resultWin = document.getElementById('result');

const arrMain = [['one1', 'two2', 'three3'], ['four4', 'five5', 'six6'],
  ['seven7', 'eight8', 'nine9'], ['one1', 'four4', 'seven7'],
  ['two2', 'five5', 'eight8'], ['three3', 'six6', 'nine9'],
  ['one1', 'five5', 'nine9'], ['three3', 'five5', 'seven7']];

//                  логика игры

const most = (acc, b) => { // сравнение кто меньше
  let a = acc;
  if (acc > b) {
    a = b;
  }
  return a;
};

const giveLengths = array => array.length;

const isGood = (arrOne, arrTwo) => { // равны ли массивы
  if (arrOne.length !== arrTwo.length) {
    return false;
  }
  const res = [];
  for (let i = 0; i < arrOne.length; i += 1) {
    if (arrOne[i] === arrTwo[i]) {
      res.push(1);
    }
  }
  return res.length === 3;
};

const isSmaller = (arr) => { // функ приним [[],[]] и возвр наим массив
  if (arr.length < 1) {
    return 'very_small';
  }
  const comparing = arr.map(giveLengths).reduce(most);
  const res = arr.filter(i => i.length === comparing);
  if (isGood(res, arr)) {
    return arr;
  }
  return res;
};

const whoSmaller = (arrA, arrB) => {
  const a = arrA[0].length;
  const b = arrB[0].length;
  if (a >= b) {
    return arrB;
  }
  return arrA;
};

const correctSmall = (arrSmallA, arrSmallB) => {
  const arrA = isSmaller(arrSmallA);
  const arrB = isSmaller(arrSmallB);
  if (arrA === 'very_small') {
    return arrB;
  }
  if (arrB === 'very_small') {
    return arrA;
  }
  const smaller = whoSmaller(arrA, arrB);
  return smaller;
};

const delElem = (arr, elem) => {
  function isElem(num) {
    return num !== elem;
  }
  return arr.filter(isElem);
};


const isWin = (arrContender, arrWiner) => arrWiner.some((i) => { // проверяет
  if (isGood(i, arrContender)) { //  [].includes([])
    return true;
  }
  return false;
});

const probableWiner = (arrWin, arrCourses) => { // определят содержет ли
  let res = [];
  return arrWin.some((item) => { // массив ходов игрока массивы возм выигрышей
    item.forEach((i) => {
      if (arrCourses.includes(i)) {
        res.push(i);
      }
    });
    if (isWin(res, arrWin)) {
      return true;
    }
    res = [];
    return false;
  });
};

const delArrs = (arr, elem) => {
  function isArr(num) {
    return !num.includes(elem);
  }
  return arr.filter(isArr);
};

const delArr = (arr, arrelem) => { // функ удаляет масс. содерж. элементы
  let res = arr;
  arrelem.forEach((item) => { res = delArrs(res, item); });
  return res;
};

const delElemTwo = (arr, arrElem) => {
  let result = arr;
  arrElem.forEach((item) => { result = delElem(result, item); });
  return result;
};


const toTal = (arr, arrElem) => { // функ возвр [[],[]]
  const possTotal = []; // в которых нет данных элем
  arr.forEach((itema) => {
    const f = delElemTwo(itema, arrElem);
    if (itema.length !== f.length) {
      possTotal.push(f);
    }
    return possTotal;
  });
  return possTotal;
};


function randomElem(arr) { // случ. элемент массива
  if (typeof arr !== 'object') {
    return arr;
  }
  if (arr.length <= 1) {
    return arr[0];
  }
  const len = arr.length;
  const max = len - 1;
  const min = 0;
  return arr[Math.floor(Math.random() * (max - min + 1)) + min];
}

const crossId = (id, player) => {
  if (totalArr.includes(id)) {
    return;
  }
  totalArr.push(id);
  document.getElementById(id).textContent = player; // функ. получает id и
  if (player === gamer) { // метку и заполняет соотв. клетку
    gamersCourse.push(id);
  } else if (player === artInt) {
    artIntCourse.push(id);
  } else {
    alert('What is wrong crossId');
  }
};

function merg(arr1, arr2) {
  const result = arr1.concat(arr2);
  return result;
}

function consHelper(e) {
  console.log(`gamer ${gamersCourse}`);
  console.log(`artInt ${artIntCourse}`);
  console.log(`total ${totalArr}`);
}

const consLog = document.getElementById('consLog'); // my helper console.log
consLog.addEventListener('click', consHelper); //


const startGame = () => {
  const getPossibleFirstCourse = delArr(arrMain, totalArr);
  const getFirstCourse = randomElem(randomElem(getPossibleFirstCourse));
  if (gamer === 'o') {
    return crossId(getFirstCourse, artInt);
  }
  return console.log(' Ваш ход');
};

//                   НАЧАЛО ИГРЫ, ПЕРВЫЙ ХОД


const isEqual = (arrA, arrB) => (arrA.length === arrB.length);// проверка на равенство

const isNull = fun => (fun ? startGame()
  : console.log('!isNull')); // на равенство null

function coiseArr(e) { // hard beginning game
  isNull(isEqual(gamersCourse, artIntCourse));
}

//                механика игры


function removeButtonsOX(e) {
  partyO.removeEventListener('click', startButtonOn);
  partyO.removeEventListener('click', gamerCoiceO);
  partyX.removeEventListener('click', startButtonOn);
  partyX.removeEventListener('click', gamerCoiceX);
  startButton.removeEventListener('click', removeButtonsOX);
  console.log('off-O  off-X');
}

function handler(e) { // функ. откл. клик в ячейках табл.
  console.log('ready');
  e.stopPropagation();
}

function fi(e) {
  console.log('ФИ');
  startButton.removeEventListener('click', coiseArr);
  startButton.removeEventListener('click', fi);
  table.removeEventListener('click', handler, true); // функ. вкл. клик в ячейках табл.
}

function startButtonOn(e) {
  startButton.addEventListener('click', coiseArr); // up
  startButton.addEventListener('click', fi); // откл. обраб. кнопки Играть
  startButton.addEventListener('click', removeButtonsOX); // откл. кнопки Х О
}

function gamerCoiceX(e) {
  gamer = 'x';
  artInt = 'o';
  partyO.style.borderBottomColor = 'buttonface';
  partyX.style.borderBottomColor = '#7D7F87'; // '#6A81E7';
  console.log('gamer = X');
}

function gamerCoiceO(e) {
  gamer = 'o';
  artInt = 'x';
  partyX.style.borderBottomColor = 'buttonface';
  partyO.style.borderBottomColor = '#7D7F87'; // '#6A81E7';
  console.log('gamer = O');
}


partyO.addEventListener('click', startButtonOn); // вкл кнопку играть
partyO.addEventListener('click', gamerCoiceO); //   присв. игроку "О"

partyX.addEventListener('click', startButtonOn); // вкл кнопку играть
partyX.addEventListener('click', gamerCoiceX); // присв. игроку "Х"

table.addEventListener('click', handler, true); // обработчик кликов в обл. табл.

// красивости игры и вывод результата

const getWinerArr = (arrWin, arrCourses) => { // определят содержет ли
  let res = [];
  arrWin.some((item) => { // массив ходов игрока массивы возм выигрышей
    item.forEach((i) => {
      if (arrCourses.includes(i)) {
        res.push(i);
      }
    });
    if (isWin(res, arrWin)) {
      // console.log(res);
      return res;
    }
    res = [];
    return false;
  });
  return res;
};

const getSwowWiner = (arr) => {
  document.getElementById(arr[0]).style.backgroundColor = '#C7C7D1';
  document.getElementById(arr[1]).style.backgroundColor = '#C7C7D1';
  document.getElementById(arr[2]).style.backgroundColor = '#C7C7D1';
};

function stopGame(value) {
  table.addEventListener('click', handler, true);
  const upper = value.toUpperCase();
  if (value !== 'Draw!') {
    resultWin.textContent = `${upper} Win!`;
    resultWin.style.display = 'block';
    return;
  }
  resultWin.textContent = `${value}`;
  resultWin.style.display = 'block';
}

// ------------------------------>

const whoWiner = (artIntArr, gamerArr) => {
  if (probableWiner(arrMain, artIntArr)) {
    getSwowWiner(getWinerArr(arrMain, artIntCourse));
    return stopGame(artInt);
  }
  if (probableWiner(arrMain, gamerArr)) {
    getSwowWiner(getWinerArr(arrMain, gamersCourse));
    return stopGame(gamer);
  }
  return false;
};

function check(value) {
  const who = whoWiner(artIntCourse, gamersCourse);
  if ((!who && value === 'very_small') || (!who && totalArr.length > 8)) {
    return stopGame('Draw!');
  }
  if (who) {
    return who;
  }
  return false;
}


function getSmall() {
  const ant = delArr(toTal(arrMain, artIntCourse), gamersCourse);
  console.log(`ant ${typeof ant} ${ant} ${ant.length}`);
  const gam = delArr(toTal(arrMain, gamersCourse), artIntCourse);
  console.log(`gam ${gam}`);
  const www = merg(ant, gam);
  console.log(`www ${www} ${www.length}`);
  if ((ant.length < 1 && gam.length > 0) || (ant.length > 0 && gam.length < 1)) {
    return www;
  }
  return ant;
}

function isSmall(valueSmall) {
  const test = isSmaller(valueSmall);
  console.log(`test ${test}`);
  if ((valueSmall !== 'very_small') && (test !== 'very_small')) {
    const rando = randomElem(randomElem(valueSmall));
    console.log(`rando ${rando}`);
    crossId(rando, artInt);
    if (!whoWiner(artIntCourse, gamersCourse)) {
      return console.log(check(valueSmall));
    }
    return console.log(`isSmall  ${ whoWiner(artIntCourse, gamersCourse)}`);
  }
  return console.log(check(valueSmall));
}

function artIntNull() {
  const getOptionOfCourse = delArr(arrMain, totalArr);
  const rando = randomElem(randomElem(getOptionOfCourse));
  console.log(`rando${rando}`);
  crossId(rando, artInt);
  return console.log(`artIntNull  ${ whoWiner(artIntCourse, gamersCourse)}`);
}

function variation() {
  table.removeEventListener('click', handler, true);
  if (artIntCourse.length < 1) {
    return artIntNull();
  }
  const win = whoWiner(artIntCourse, gamersCourse);
  if (win === false) {
    return isSmall(getSmall());
  }
  return console.log(whoWiner(artIntCourse, gamersCourse));
}

function handlerCell(e) {
  if (e.target.id) {
    crossId(e.target.id, gamer);
    table.addEventListener('click', handler, true);
    setTimeout(variation, 1500);
  }
}

table.addEventListener('click', handlerCell);
