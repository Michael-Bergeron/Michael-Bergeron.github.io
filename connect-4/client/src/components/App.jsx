import React, { Component } from 'react';
import Board from './Board.jsx';

export default class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			board: [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]],
			player: 1,
			winner: ''
		}
	}

	componentDidMount() {
		//this.setState({board: newBoard});
		
	}

	handleClick(e) {
		if (this.state.winner !== ''){
			return;
		}
		let indexes = e.target.className.split(', ');
		indexes[0] =parseInt(indexes[0]);
		indexes[1] =parseInt(indexes[1]);
		let tempBoard = this.state.board;
		if (this.state.player === 1){
			tempBoard[indexes[0]][indexes[1]] = 'R';
			tempBoard = this.handleGravity(tempBoard, indexes[0], indexes[1])
			this.setState({player: 2, board: tempBoard})
		} else {
			tempBoard[indexes[0]][indexes[1]] = 'Y';
			tempBoard = this.handleGravity(tempBoard, indexes[0], indexes[1])
			this.setState({player: 1, board: tempBoard})
		}
		this.checkForWinner(this.state.board);
	}

	handleGravity(board, index1, index2) {
		if (index1 === 6){
			return board;
		}
		for (let i = (index1 + 1); i < 6; i++){
			if (board[i][index2] !== 0){
				return board;
			} else {
				board[i][index2] = board[i-1][index2];
				board[i-1][index2] = 0;
			}
		}
		return board;
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
					his.setState({winner: 'Player 2'});
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
			</div>
		)
	}
}