/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer; 
var gameIsOn = true;
var winningScore = 100;

init();

document.getElementById('scoreSetBtn').addEventListener('click', function() {
    winningScore = document.getElementById('score').value;
    document.getElementById('score').style.display = 'none';
    document.getElementById('scoreSetBtn').style.display = 'none';
    document.getElementById('winningScore').innerHTML = winningScore;
});

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gameIsOn) {
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
    
        if (dice !== 1) {
            roundScore += dice; 
            document.getElementById('current-' + activePlayer).innerHTML = roundScore;
            if (dice === 6 && dice === preDice) {
                roundScore = 0;
                document.getElementById('current-' + activePlayer).innerHTML = roundScore;
            }
            preDice = dice;
        } else {
            nextPlayer();    
        } 
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gameIsOn) {
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).innerHTML = scores[activePlayer];
    
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).innerHTML = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gameIsOn = false;
        } else {
            nextPlayer();
        }   
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').innerHTML = 0;
    document.getElementById('current-1').innerHTML = 0;
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
        
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
        
    document.querySelector('.dice').style.display = 'none';   
}

document.querySelector('.btn-new').addEventListener('click', init);
                                                    
function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').innerHTML = 0;
    document.getElementById('score-1').innerHTML = 0;
    document.getElementById('current-0').innerHTML = 0;
    document.getElementById('current-1').innerHTML = 0;
    document.getElementById('name-0').innerHTML = 'Player 1';
    document.getElementById('name-1').innerHTML = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.getElementById('score').style.display = 'inline-block';
    document.getElementById('scoreSetBtn').style.display = 'inline-block';
    gameIsOn = true;
}