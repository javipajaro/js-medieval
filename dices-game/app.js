/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores, roundScore, activePlayer, gamePlaying, winningScore, lastDice;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

init();



function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    winningScore = 55;
    
    document.querySelector('.final-score').value = '';
    document.getElementById('goal').textContent = 'Get '+ winningScore + ' to win';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    
    document.getElementById('name-0').textContent = 'json';
    document.getElementById('name-1').textContent = 'jquery';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
}

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying) {
        var dice1 = Math.floor(Math.random() *6) + 1;
        var dice2 = Math.floor(Math.random() *6) + 1;
        // var diceDOM = document.querySelector('.dice');
        // diceDOM.style.display = 'block';
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        // diceDOM.src = 'dice-' + dice + '.png';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
        
        if(dice1 !== 1 && dice2 !== 1){
            roundScore += dice1 + dice2;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }else {
            nextPlayer();
        }
                 
            
    }// no else condition, nothing have to happen if false

});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){

        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        var input= document.querySelector('.final-score').value;
        if(input){
            winningScore = input;
            document.getElementById('goal').textContent = 'Get '+ winningScore + ' to win';

        }
        
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner';
            
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePlaying = false;
        }else{
            nextPlayer();
        }
    }
});




document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer(){
    roundScore = 0;
        document.getElementById('current-' + activePlayer).textContent = '0';
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
}
        