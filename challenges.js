/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The players can set the winning score as they want
- The first player to reach the points set by the players on GLOBAL score wins the game
- When either one of the dices is 1, the round score becomes zero

*/

var scores, roundScore, activePlayer, preDice; 
var gameIsOn = true;
var winningScore = 100;

init();

document.getElementById('scoreSetBtn').addEventListener('click', function() {
    var input = document.getElementById('score').value;
    if (input) {
        winningScore = input;
        document.getElementById('score').style.display = 'none';
        document.getElementById('scoreSetBtn').style.display = 'none';
        document.getElementById('winningScore').innerHTML = winningScore;
    } else {
        winningScore = 100;
    } 
});

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gameIsOn) {
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        var diceDOM1 = document.getElementById('dice1');
        var diceDOM2 = document.getElementById('dice2');
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png';
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        
        if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.getElementById('current-' + activePlayer).innerHTML = roundScore;
        } else {
            scores[activePlayer] = 0;
            nextPlayer();    
        } 
    
        /* if the player rolls 6 twice in a row, the whole score earned will be gone.
        if (dice === 6 && preDice === 6) {
            scores[activePlayer] = 0;
            document.getElementById('current-' + activePlayer).innerHTML = 0;
            nextPlayer();
        } else if (dice !== 1) {
            roundScore += dice;
            document.getElementById('current-' + activePlayer).innerHTML = roundScore;
        } else {
            nextPlayer();    
        } 
        preDice = dice;
        */
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gameIsOn) {
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).innerHTML = scores[activePlayer];
    
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).innerHTML = 'Winner!';
            hideDices();
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
        
    hideDices();
}

function hideDices() {
    document.getElementById('dice1').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);
                                                    
function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    hideDices();

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