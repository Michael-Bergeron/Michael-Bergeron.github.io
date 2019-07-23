window.onload = function() {
	let allWinners = [];
	let scoreboard = document.getElementById('scoreboard');
	fetch('http://127.0.0.1:3000/winner').then((results) => results.json()).then((res) => {
		allWinners = res
		scoreboard.innerHTML = 'Scoreboard:'
		scoreboard.appendChild(document.createElement('p')).innerHTML = 'Player:  Wins';
		for (let i = 0; i < allWinners.length; i++) {
			scoreboard.appendChild(document.createElement('p')).innerHTML = allWinners[i].player + ':' + allWinners[i].wins;
		}})
	
	let counter = 0;
	let gameNumber = 0;
	let player1Wins = 0;
	let player2Wins = 0;
	let rotate = true;
	let table = document.getElementById("table");
	let squares = document.getElementsByClassName('square');
	let player1Score = document.getElementById('scoreboard1');
	let player2Score = document.getElementById('scoreboard2');
	let currentPlayer = document.getElementById('currentPlayer');
	let totalGames = document.getElementById('totalGames');
	let restart = document.getElementById('restart');
	let restartHolder = document.getElementById('restartHolder');
	let winner = document.getElementById('winner');
	let player1Name = document.getElementById('player1Name');
	let player2Name = document.getElementById('player2Name');
	let rotateButton = document.getElementById('rotate');

	player1Name.addEventListener('keyup', (e) => {
		for (let i = 0; i < allWinners.length; i++){
			if (e.target.value === allWinners[i].player){
				player1Wins = allWinners[i].wins;
				player1Score.innerHTML = `${player1Name.value} total wins: ${player1Wins}`;
				break;
			}
		}
	});
	
	player2Name.addEventListener('keydown', (e) => {
		for (let i = 0; i < allWinners.length; i++){
			if (e.target.value === allWinners[i].player){
				player2Wins = allWinners[i].wins;
			}
		}
		player2Score.innerHTML = `${player2Name.value} total wins: ${player2Wins}`;
	})

	table.addEventListener("click", (e) => {
		if (counter % 2 === 0){
			e.target.innerHTML = 'X';
			currentPlayer.innerHTML = `${player2Name.value}'s Turn (O)`;
		} else {
			e.target.innerHTML = 'O';
			currentPlayer.innerHTML = `${player1Name.value}'s Turn (X)`;
		}
		counter++;
		let number = Math.floor(Math.random() * 3);
		if (rotate){
			if (number === 1){
				table.style['animation-name'] ='rotate';
			} else if (number === 2){
				table.style['animation-name'] ='reverseRotate';
			}else{
				table.style['animation-name'] ='rotate180';
			}
			setTimeout(() => {rotateBoard(number)}, 1500);
		} else {
			checkForWinner();
		}
	});



	restart.addEventListener('click', () => {
		table.style['animation-name'] ='newBoard';
		setTimeout(() => {
			for (let i = 0; i < squares.length; i++){
				squares[i].innerHTML = '';
			}
		}, 750)
		setTimeout(() => {table.style['animation-name'] ='none'}, 1500)
		restartHolder.style.visibility = 'hidden';
	})

	rotateButton.addEventListener('click', () => {
		if (rotate === true){
			rotateButton.innerHTML = 'Rotate: Disabled';
			rotate = false;
		} else {
			rotateButton.innerHTML = 'Rotate: Enabled';
			rotate = true;
		}
	})

	gameOverStats = (player) => {
		if (player === 1){
			player1Wins++;
			counter = 0;
			currentPlayer.innerHTML = `${player1Name.value}'s Turn (X)`;
			winner.innerHTML = `${player1Name.value} wins!!!`
			fetch('http://127.0.0.1:3000/winner', {
				method: "POST",
				headers: {
				  "Content-Type": "application/json"},
				body: JSON.stringify({player: player1Name.value})
				}).then(()=> console.log('success'))
		} else if (player === 2){
			counter = 1;
			player2Wins++;
			currentPlayer.innerHTML = `${player2Name.value}'s Turn (O)`;
			winner.innerHTML = `${player2Name.value} wins!!!`
			fetch('http://127.0.0.1:3000/winner', {
				method: "POST",
				headers: {
				  "Content-Type": "application/json"},
				body: JSON.stringify({player: player2Name.value})
				}).then(()=> console.log('success'))
		}else {
			winner.innerHTML = `Tie game, play again`
		}
		player1Score.innerHTML = `${player1Name.value} total wins: ${player1Wins}`;
		player2Score.innerHTML = `${player2Name.value} total wins: ${player2Wins}`;
		gameNumber++;
		totalGames.innerHTML = `Total Games Played: ${gameNumber}`
		restartHolder.style.visibility = 'visible';
	}

	testForTie = () => {
		for (let i = 0; i < squares.length; i++){
			if (!squares[i].innerHTML){
				return;
			}
		}
		gameOverStats(3);
	}

	rotateBoard = (number) => {
		table.style['animation-name'] ='none';
		let temp = [];
		if (number === 1) {
			temp[0] = squares[6].innerHTML;
			temp[1] = squares[3].innerHTML;
			temp[2] = squares[0].innerHTML;
			temp[3] = squares[7].innerHTML;
			temp[4] = squares[4].innerHTML;
			temp[5] = squares[1].innerHTML;
			temp[6] = squares[8].innerHTML;
			temp[7] = squares[5].innerHTML;
			temp[8] = squares[2].innerHTML;
		} else if (number === 2){
			temp[0] = squares[2].innerHTML;
			temp[1] = squares[5].innerHTML;
			temp[2] = squares[8].innerHTML;
			temp[3] = squares[1].innerHTML;
			temp[4] = squares[4].innerHTML;
			temp[5] = squares[7].innerHTML;
			temp[6] = squares[0].innerHTML;
			temp[7] = squares[3].innerHTML;
			temp[8] = squares[6].innerHTML;
		} else {
			temp[0] = squares[8].innerHTML;
			temp[1] = squares[7].innerHTML;
			temp[2] = squares[6].innerHTML;
			temp[3] = squares[5].innerHTML;
			temp[4] = squares[4].innerHTML;
			temp[5] = squares[3].innerHTML;
			temp[6] = squares[2].innerHTML;
			temp[7] = squares[1].innerHTML;
			temp[8] = squares[0].innerHTML;
		}
		for (let i = 6; i >= 0; i-=3){
			if (!temp[i]){
				if (temp[i - 3]){
					temp[i] = temp[i-3];
					temp[i-3] = '';
				} else {
					if (temp[i-6]){
						temp[i] = temp[i-6];
						temp[i-6] = '';
						continue;
					}
				}
			} 
		}
		for (let i = 7; i >= 0; i-=3){
			if (!temp[i]){
				if (temp[i - 3]){
					temp[i] = temp[i-3];
					temp[i-3] = '';
				} else {
					if (temp[i-6]){
						temp[i] = temp[i-6];
						temp[i-6] = '';
						continue;
					}
				}
			} 
		}
		for (let i = 8; i >= 0; i-=3){
			if (!temp[i]){
				if (temp[i - 3]){
					temp[i] = temp[i-3];
					temp[i-3] = '';
				} else {
					if (temp[i-6]){
						temp[i] = temp[i-6];
						temp[i-6] = '';
						continue;
					}
				}
			} 
		}

		for (let i = 0; i < temp.length; i++){
			squares[i].innerHTML = temp[i];
		}
		checkForWinner();
	}

	checkForWinner = () => {
		player1Score.innerHTML = `${player1Name.value} total wins: ${player1Wins}`;
		player2Score.innerHTML = `${player2Name.value} total wins: ${player2Wins}`;
		if (squares[0].innerHTML === 'X' && squares[1].innerHTML === 'X' && squares[2].innerHTML === 'X'){
			gameOverStats(1);
		}else if (squares[0].innerHTML === 'O' && squares[1].innerHTML === 'O' && squares[2].innerHTML === 'O'){
			gameOverStats(2);
		}

		else if (squares[3].innerHTML === 'X' && squares[4].innerHTML === 'X' && squares[5].innerHTML === 'X'){
			gameOverStats(1);
		}else if (squares[3].innerHTML === 'O' && squares[4].innerHTML === 'O' && squares[5].innerHTML === 'O'){
			gameOverStats(2);
		}

		else if (squares[6].innerHTML === 'X' && squares[7].innerHTML === 'X' && squares[8].innerHTML === 'X'){
			gameOverStats(1);
		}else if (squares[6].innerHTML === 'O' && squares[7].innerHTML === 'O' && squares[8].innerHTML === 'O'){
			gameOverStats(2);
		}

		else if (squares[0].innerHTML === 'X' && squares[3].innerHTML === 'X' && squares[6].innerHTML === 'X'){
			gameOverStats(1);
		}else if (squares[0].innerHTML === 'O' && squares[3].innerHTML === 'O' && squares[6].innerHTML === 'O'){
			gameOverStats(2);
		}

		else if (squares[1].innerHTML === 'X' && squares[4].innerHTML === 'X' && squares[7].innerHTML === 'X'){
			gameOverStats(1);
		}else if (squares[1].innerHTML === 'O' && squares[4].innerHTML === 'O' && squares[7].innerHTML === 'O'){
			gameOverStats(2);
		}

		else if (squares[2].innerHTML === 'X' && squares[5].innerHTML === 'X' && squares[8].innerHTML === 'X'){
			gameOverStats(1);
		}else if (squares[8].innerHTML === 'O' && squares[5].innerHTML === 'O' && squares[8].innerHTML === 'O'){
			gameOverStats(2);
		}

		else if (squares[0].innerHTML === 'X' && squares[4].innerHTML === 'X' && squares[8].innerHTML === 'X'){
			gameOverStats(1);
		}else if (squares[0].innerHTML === 'O' && squares[4].innerHTML === 'O' && squares[8].innerHTML === 'O'){
			gameOverStats(2);
		}

		else if (squares[2].innerHTML === 'X' && squares[4].innerHTML === 'X' && squares[6].innerHTML === 'X'){
			gameOverStats(1);
		}else if (squares[2].innerHTML === 'O' && squares[4].innerHTML === 'O' && squares[6].innerHTML === 'O'){
			gameOverStats(2);
		}

		testForTie();
	}

}