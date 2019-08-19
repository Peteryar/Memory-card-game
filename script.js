let cards = document.querySelectorAll(".card");
let game = document.body;
let cardHolder = document.getElementById('game');
let moves = document.getElementById('moves');
let timeUp = document.getElementById('timeup-modal');
let movesCount = 0;
let ready = document.getElementById('ready');
let timerElem = document.getElementById('timer');
let successCount = 0;
let gameStart;
var timer = 0;
let startTimer;
let animate;
let readyCount =6;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
cardsColorIndex = 16;
let cardsColor = ['#6812b3','#19b543','black', '#12eefd', '#12eefd','black','#6812b3','#19b543', 'orange','orange','#ccec1280', '#ccec1280', 'brown','brown','violet','violet']

function flipCard(){
        if(lockBoard) return;
        if(this === firstCard) return;
       this.classList.add('flip');
        if(!hasFlippedCard){
        firstCard = this;
        hasFlippedCard = true;

        return;
        }
         secondCard = this;
         checkForMatch();
         
         
}
/*function animateMatch(){
        console.log(counter++);
        firstCard.style.backgroundColor = 'green';
        secondCard.style.backgroundColor ='green';
        }

function matchedOrNotAni (){
        let animate = setInterval(animate, 500);
}
*/

function checkForMatch(){
        movesCount++
        moves.innerHTML = movesCount;
       let isMatched = firstCard.firstElementChild.style.backgroundColor === secondCard.firstElementChild.style.backgroundColor;
       if(isMatched){
               successCount++;
               disableCards();
               winGame();
       }else{
               unflipCard()
       }
}
function winGame(){
    let winModal = document.getElementById('win-modal'); 
    if(successCount ===8){
            clearInterval(startTimer);
            winModal.style = 'height:200px; position:fixed; left:0; right:0; z-index: 9999; display:block';
            cardHolder.style =
      "justify-content:center;height:70%; width: 90%; margin:0 auto; display: flex;flex-wrap:wrap; -webkit-filter: blur(5px);-moz-filter: blur(5px);-o-filter: blur(5px);position: fixed;left: 0;right: 0;z-index: 1;-ms-filter: blur(5px); filter: blur(5px);";
    }
}


function disableCards(){
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        resetBoard();
      }
function unflipCard(){
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
// timer implementation
function countTimer(){
        timer++;
        if (timer === 120){
               clearInterval(startTimer)
               cardHolder.style =
         "justify-content:center;height:70%; width: 90%; margin:0 auto; display: flex;flex-wrap:wrap; -webkit-filter: blur(5px);-moz-filter: blur(5px);-o-filter: blur(5px);position: fixed;left: 0;right: 0;z-index: 1;-ms-filter: blur(5px); filter: blur(5px);";
         timeUp.style.display = 'block';
        }
        timerElem.innerHTML = timer;
        readyCount--
        ready.innerHTML =`<h1>Get ready ...</h1>
        <h1>${readyCount}</h1>`
        
}
// timer function
function startCountTimer(){
        shuffleCardsColor(cardsColor);
        startTimer = setInterval(countTimer, 1000); 
        showCardsColor()
        
}
// displaying cards for  5secs
function showCardsColor(){
        ready.style.display ='block';
        Array.from(cards).forEach(function(card){
        cardsColorIndex--
        card.firstElementChild.style.backgroundColor = cardsColor[cardsColorIndex];
        card.classList.add('flip');
        setTimeout(function(){
                card.classList.remove('flip');
                card.addEventListener("click", flipCard)
                ready.style.display = "none";
        }, 5000)

})
}
//shufflingCards color
function shuffleCardsColor (cards){
        let temp, newPos;
        for(i=cards.length-1; i>=0; i--){
          newPos = Math.floor(Math.random() * (i+1));
          temp = cards[i];
          cards[i] = cards[newPos];
          cards[newPos] =temp;     
        }
}

//starting game
game.onload = startCountTimer();
// retryButton.onclick = ()=>{
//         startCountTimer();
// }



