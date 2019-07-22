import React, { Component } from 'react';
import Board from './Board.jsx';
import Scoreboard from './Scoreboard.jsx'

export default class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			board: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]],
			player: 1,
			winner: '',
			player1Name: 'player1',
			player2Name: 'player2',
			scoreboard: []
		}
	}

	componentDidMount() {
		fetch('/winner')
		.then((res) => res.json())
		.then((results) => {this.setState({scoreboard: results})})
	}

	handleClick(e) {
		if (this.state.winner !== ''){
			return;
		}
		let indexes = e.target.className.split(', ');
		indexes[1] =parseInt(indexes[1]);
		this.handleGravity(0, indexes[1])
	}

	handleGravity(index1, column) {
		let nextPlayer = this.state.player;
		let value;
		if (nextPlayer === 1){
			nextPlayer = 2;
			value = 'R';
		}else {
			nextPlayer = 1;
			value = 'Y';
		}
		let board = this.state.board
		let i = index1;
		if(board[i]) {
			if (board[i][column] !== 0){
				this.setState({player: nextPlayer})
				this.checkForWinner(this.state.board);
				return;
			}
			if(i === 0) {
					board[i][column] = value;
					this.setState({board: board}, () => {
							setTimeout(() => {
									this.handleGravity(i + 1, column, value);
							}, 100);
					})
			} else {
					board[i -1][column] = 0;
					board[i][column] = value;
					this.setState({board: board}, () => {
							setTimeout(() => {
									this.handleGravity(i + 1, column, value);
							}, 100);
					})
			}
		} else {
			this.setState({player: nextPlayer})
			this.checkForWinner(this.state.board);
			return;
		}

		// for (let i = (index1 + 1); i < 6; i++){
		// 	if (board[i][index2] !== 0){
		// 		return board;
		// 	} else {
		// 		board[i][index2] = board[i-1][index2];
		// 		board[i-1][index2] = 0;
		// 	}
		// }
		// return board;
	}

	checkForWinner(board) {
		this.checkForHorizontalWinner(board);
		this.checkForVerticalWinner(board);
		this.checkForRightDiagWinner(board);
		this.checkForLeftDiagWinner(board);
	}

	checkForHorizontalWinner(board) {
		for (let i = 0; i < board.length; i++){
			for (let j = 0; j <= 3; j++){
				if (board[i][j] ==='R' && board[i][j+1] ==='R' && board[i][j+2] ==='R' && board[i][j+3] ==='R'){
					this.setState({winner: 'Player 1'})
				} else if(board[i][j] ==='Y' && board[i][j+1] ==='Y' && board[i][j+2] ==='Y' && board[i][j+3] ==='Y'){
					this.setState({winner: 'Player 2'})
				}
			}
		}
	}
	checkForVerticalWinner(board) {
		for (let i = 0; i <= 2; i++){
			for (let j = 0; j < board[i].length; j++){
				if (board[i][j] ==='R' && board[i+1][j] ==='R' && board[i+2][j] ==='R' && board[i+3][j] ==='R'){
					this.setState({winner: 'Player 1'});
				} else if(board[i][j] ==='Y' && board[i+1][j] ==='Y' && board[i+2][j] ==='Y' && board[i+3][j] ==='Y'){
					this.setState({winner: 'Player 2'});
				}
			}
		}
	}
	checkForRightDiagWinner(board) {
		for (let i = 0; i <= 2; i++){
			for (let j = 0; j <= 3;  j++){
				if (board[i][j] ==='R' && board[i+1][j+1] ==='R' && board[i+2][j+2] ==='R' && board[i+3][j+3] ==='R'){
					this.setState({winner: 'Player 1'});
				} else if (board[i][j] ==='Y' && board[i+1][j+1] ==='Y' && board[i+2][j+2] ==='Y' && board[i+3][j+3] ==='Y'){
					this.setState({winner: 'Player 2'});
			}
		}
	}
	}

	checkForLeftDiagWinner(board) {
		for (let i = 0; i <= 2; i++){
			for (let j = 6; j> 2; j--){
				if (board[i][j] ==='R' && board[i+1][j-1] ==='R' && board[i+2][j-2] ==='R' && board[i+3][j-3] ==='R'){
					this.setState({winner: 'Player 1'});
				}else if (board[i][j] ==='Y' && board[i+1][j-1] ==='Y' && board[i+2][j-2] ==='Y' && board[i+3][j-3] ==='Y') {
					this.setState({winner: 'Player 2'});
				}
			}
		}
	}

	restart() {
		this.setState({
				board: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]],
				player: 1,
				winner: ''
		})
	}

	render() {
		return (
			<div>
				<Board board = {this.state.board} handleClick = {this.handleClick.bind(this)} />
				{this.state.winner !== '' ? <div>
																		{this.state.winner} Wins the game!!!
																		<div><button onClick = {this.restart.bind(this)}>Start a new Game</button></div>
																		</div> :<div></div>}
				<Scoreboard data = {this.state.scoreboard} />
			</div>
		)
	}
}