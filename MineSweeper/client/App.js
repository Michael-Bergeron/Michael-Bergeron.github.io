import React, { Component } from 'react';
import Board from './Board';
import { Button } from 'react-materialize'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      boardSize: 10,
      board: [], 
      virtualBoard: [],
      gameOver: '',
      setFlag: false
    }
  }
  componentDidMount() {
    this.makeBoard()
  }

  makeBoard() {
    if (this.state.boardSize < 10){
      this.state.boardSize = 10
      this.setState({boardSize: 10})
    }
    if (this.state.boardSize > 30){
      this.state.boardSize = 30
      this.setState({boardSize: 30})
    }
    let board = [];
    let virtualBoard = [];
    for (let i = 0; i < this.state.boardSize; i++){
      let row = [];
      let vRow = [];
      for (let j = 0; j < this.state.boardSize; j++){
        row.push(0)
        vRow.push(false)
      }
      board.push(row);
      virtualBoard.push(vRow)
    }
    for (let i = 0; i < (.2 * this.state.boardSize * this.state.boardSize) ; i++){
      let bomb = [Math.floor(Math.random() * this.state.boardSize), Math.floor(Math.random() * this.state.boardSize)];
      if (board[bomb[0]][bomb[1]] === -1){
        i--;
      } else {
        board[bomb[0]][bomb[1]] = -1;
      }
    }
    for (let i = 0; i < board[0].length; i++){
      for (let j = 0; j < board[i].length; j++){
        if (board[i][j] !== -1){
          if (board[i][j+1] && board[i][j+1] === -1){
            board[i][j]++
          }
          if (board[i][j-1] && board[i][j-1] === -1){
            board[i][j]++
          }
          if (board[i-1] && board[i-1][j+1] === -1){
            board[i][j]++
          }
          if (board[i-1] && board[i-1][j-1] === -1){
            board[i][j]++
          }
          if (board[i+1] && board[i+1][j+1] === -1){
            board[i][j]++
          }
          if (board[i+1] && board[i+1][j-1] === -1){
            board[i][j]++
          }
          if (board[i+1] && board[i+1][j] === -1){
            board[i][j]++
          }
          if (board[i-1] && board[i-1][j] === -1){
            board[i][j]++
          }
        }
      }
    }
    console.log(board)
    this.setState({board, virtualBoard})
  }

  clickSquare(e) {
    let virtualBoard = this.state.virtualBoard;
    let pos = e.target.id.split(',');
    if (this.state.setFlag){
      console.log(virtualBoard[pos[0]][pos[1]])
      if (virtualBoard[pos[0]][pos[1]] === 'flag'){
        virtualBoard[pos[0]][pos[1]] = false;
      } else {virtualBoard[pos[0]][pos[1]] = 'flag'}
      this.setState({virtualBoard})
    } else {
    if (virtualBoard[pos[0]][pos[1]] === ''){
      return;
    }
    if (this.state.board[pos[0]][pos[1]] === -1){
      this.setState({gameOver: 'You Lose, try again'})
      return;
    }
    if (this.state.board[pos[0]][pos[1]] === 0){
      this.checkCascade(virtualBoard, [parseInt(pos[0]), parseInt(pos[1])]);
    } else {
      virtualBoard[pos[0]][pos[1]] = this.state.board[pos[0]][pos[1]]
    }
    this.setState({virtualBoard}, () => {this.checkForWinner()})
    }
  }

  checkCascade(virtualBoard, pos) {
    if (this.state.board[pos[0]][pos[1]] === 0){
      //let node = document.getElementById(`${pos[0]},${pos[1]}`);
      //node.innerHTML = '';
      virtualBoard[pos[0]][pos[1]] = '';
      if (this.state.board[pos[0] - 1] && this.state.board[pos[0] - 1][pos[1] - 1] === 0 && virtualBoard[pos[0] - 1][pos[1] - 1] === false) {
        this.checkCascade(virtualBoard, [pos[0] - 1, pos[1] - 1])
      } if (this.state.board[pos[0] - 1] && this.state.board[pos[0] - 1][pos[1]] === 0 && virtualBoard[pos[0] - 1][pos[1]] === false) {
        this.checkCascade(virtualBoard, [pos[0] - 1, pos[1]])
      } if (this.state.board[pos[0] - 1] && this.state.board[pos[0] - 1][pos[1] + 1] === 0 && virtualBoard[pos[0] - 1][pos[1] + 1] === false) {
        this.checkCascade(virtualBoard, [pos[0] - 1, pos[1] + 1])
      } if (this.state.board[pos[0]][pos[1] - 1] === 0 && virtualBoard[pos[0]][pos[1] - 1] === false) {
        this.checkCascade(virtualBoard, [pos[0], pos[1] - 1])
      } if (this.state.board[pos[0]][pos[1] + 1] === 0 && virtualBoard[pos[0]][pos[1] + 1] === false) {
        this.checkCascade(virtualBoard, [pos[0], pos[1] + 1])
      } if (this.state.board[pos[0] + 1] && this.state.board[pos[0] + 1][pos[1] - 1] === 0 && virtualBoard[pos[0] + 1][pos[1] - 1] === false) {
        this.checkCascade(virtualBoard, [pos[0] + 1, pos[1] - 1])
      } if (this.state.board[pos[0] + 1] && this.state.board[pos[0] + 1][pos[1] + 1] === 0 && virtualBoard[pos[0] + 1][pos[1] + 1] === false) {
        this.checkCascade(virtualBoard, [pos[0] + 1, pos[1] + 1])
      } if (this.state.board[pos[0] + 1] && this.state.board[pos[0] + 1][pos[1]] === 0 && virtualBoard[pos[0] + 1][pos[1]] === false) {
        this.checkCascade(virtualBoard, [pos[0] + 1, pos[1]])
      }
      this.openAround(virtualBoard, pos);
    }
    return;
  }

  openAround(virtualBoard, pos) {
    if (this.state.board[pos[0] - 1]){
      virtualBoard[pos[0] - 1][pos[1]] = this.state.board[pos[0] - 1][pos[1]];
      if (this.state.board[pos[0] - 1][pos[1]] === 0){
        virtualBoard[pos[0] - 1][pos[1]] = '';
          }
    }
    if (this.state.board[pos[0] - 1] && this.state.board[pos[0] - 1][pos[1] - 1]){
      virtualBoard[pos[0] - 1][pos[1] - 1] = this.state.board[pos[0] - 1][pos[1] - 1];
      if (this.state.board[pos[0] - 1][pos[1] - 1] === 0){
        virtualBoard[pos[0] - 1][pos[1] - 1] = '';
          }
    }
    if (this.state.board[pos[0] - 1] && this.state.board[pos[0] - 1][pos[1] + 1]){
      virtualBoard[pos[0] - 1][pos[1] + 1] = this.state.board[pos[0] - 1][pos[1] + 1];
      if (this.state.board[pos[0] - 1][pos[1] + 1] === 0){
        virtualBoard[pos[0] - 1][pos[1] + 1] = '';
          }
    }
    if (this.state.board[pos[0] + 1] && this.state.board[pos[0] + 1][pos[1] - 1]){
      virtualBoard[pos[0] + 1][pos[1] - 1] = this.state.board[pos[0] + 1][pos[1] - 1];
      if (this.state.board[pos[0] + 1][pos[1] - 1] === 0){
        virtualBoard[pos[0] + 1][pos[1] - 1] = '';
          }
    }
    if (this.state.board[pos[0] + 1]){
      virtualBoard[pos[0] + 1][pos[1]] = this.state.board[pos[0] + 1][pos[1]];
      if (this.state.board[pos[0] + 1][pos[1]] === 0){
        virtualBoard[pos[0] + 1][pos[1]] = '';
          }
    }
    if (this.state.board[pos[0] + 1] && this.state.board[pos[0] + 1][pos[1] + 1]){
      virtualBoard[pos[0] + 1][pos[1] + 1] = this.state.board[pos[0] + 1][pos[1] + 1];
      if (this.state.board[pos[0] + 1][pos[1] + 1] === 0){
        virtualBoard[pos[0] + 1][pos[1] + 1] = '';
          }
    }
    if (this.state.board[pos[0][pos[1] - 1]]){
      virtualBoard[pos[0]][pos[1] - 1] = this.state.board[pos[0]][pos[1] - 1];
      if (this.state.board[pos[0]][pos[1] - 1] === 0){
        virtualBoard[pos[0]][pos[1] - 1] = '';
          }
    }
    if (this.state.board[pos[0][pos[1] + 1]]){
      virtualBoard[pos[0]][pos[1] + 1] = this.state.board[pos[0]][pos[1] + 1];
      if (this.state.board[pos[0]][pos[1] + 1] === 0){
        virtualBoard[pos[0]][pos[1] + 1] = '';
          }
    }
  }

  checkForWinner() {
    for (let i = 0; i < this.state.board.length; i++){
      for (let j = 0; j < this.state.board[i].length; j++){
        if (this.state.virtualBoard[i][j] === false  && this.state.board[i][j] !== -1){
          return;
        }
      }
    }
    this.setState({gameOver: 'You Win!!!'})
  }

  reset() {
    this.setState({gameOver: '', board: []})
    this.makeBoard();
  }

  changeBoardSize(e) {
    this.setState({boardSize: e.target.value})
  }

  flagClick() {
    if (this.state.setFlag){this.setState({setFlag: false})}
    else {this.setState({setFlag: true})}
  }

  render() {
    return (
      <div>
        <Button waves='light' onClick = {()=> this.reset()}>Reset Game</Button>
        <input type = 'number' min = '10' max = '30' onChange = {(e)=> this.changeBoardSize(e)} style = {{paddingLeft: '20px', width: '150px'}}></input><span>10 to 30</span>
        <div style = {{position: 'absolute', top: '100px', left: '50px'}}>
          <div>Click to place flag on mine</div>
          <img onClick = {() => this.flagClick()} style = {{width: '40px', height: '40px'}} src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Minesweeper_flag.svg/1024px-Minesweeper_flag.svg.png'></img>
          {this.state.setFlag ? (<div>Set flag now</div>) : (<></>)}
        </div>
        <Board virtualBoard = {this.state.virtualBoard} board = {this.state.board} clickSquare = {this.clickSquare.bind(this)}/>
        {this.state.gameOver === '' ? (<></>) : (<h1 style={{height: '300px', width: '300px', position: 'absolute', top: '200px', left: '500px', backgroundColor: 'white', opacity: '.6', border: '1px solid black'}}>{this.state.gameOver}</h1>)}
      </div>
    )
  }
}
