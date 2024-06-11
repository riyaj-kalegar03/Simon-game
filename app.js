let gameseq = [];
let userseq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

//1 step - start the game by pressing any key
document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    levelup();
  }
});

function gameflash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}
function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

// 2 step - level up & flash
function levelup() {
  userseq = [];
  level++;
  h2.innerText = `level ${level}`;
  //random btn choose
  let ranidx = Math.floor(Math.random() * 3);
  let rancolor = btns[ranidx];
  let ranbtn = document.querySelector(`.${rancolor}`);
  gameseq.push(rancolor);

  gameflash(ranbtn);
}

function checkAns(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length == gameseq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 2000);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userflash(btn);
  let usercolor = btn.getAttribute("id");
  userseq.push(usercolor);
  checkAns(userseq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}
function reset() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
}
