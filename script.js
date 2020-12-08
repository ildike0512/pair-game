'use strict';


const cards = document.querySelectorAll('.memory-card');
const cardsFront = document.querySelectorAll('.front-face');
const cardsBack = document.querySelectorAll('.back-face');

let points = 0;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  } 
 
    // second click
   /*  hasFlippedCard = false; */
    secondCard = this;
   
    checkForMatch();
     }
   
 function checkForMatch(){
     let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

     isMatch ? disableCards() : unflipCards();
    
 }
 
 function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    resetBoard();
    
  }
  
  
  function unflipCards() {
        lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
    }, 1500);
    
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    
  }
    
 
    (function shuffle() {
        cards.forEach(card => {
          let randomPos = Math.floor(Math.random() * 10);
          card.style.order = randomPos;
        });
        
      })();
  
  cards.forEach(card => card.addEventListener('click', flipCard));
  
  const showPoints = (points) => {
    document.querySelector('.akt-points').textContent = points;
}

const checkPair = () => {
    const firstCardIcon = document.querySelector('.memory-card');
    if (firstCardIcon) {
        const firstIconClass = firstCardIcon.className.split(' ');
        const pair = document.querySelectorAll(`.memory-card.flip .${firstIconClass.pop()}`);
        if (pair.length == 2) {
            points++;
            showPoints(points);
            document.querySelectorAll(`.memory-card.flip`).forEach( 
                card => card.classList.add('found') 
            );
        }
    }
}

// Stopper.
let stopperTime = 0;
let stopperIsRunning = false;
setInterval( () => {
    if (!stopperIsRunning) {
        return;
    }
    
    stopperTime++;
    const seconds = padNumbers(stopperTime % 60);
    const minutes = padNumbers(Math.floor(stopperTime / 60) % 60);
    const time = `${[minutes, seconds].join(':')}`;
    const stopperFace = document.querySelector('.time');
    stopperFace.textContent = time;
}, 1000);

 document.querySelector('.time__display').addEventListener('click', () => {
    if (stopperIsRunning) {
        stopperIsRunning = false;
        stopperTime = 0;
    } else {
        stopperIsRunning = true;
    }
    });

