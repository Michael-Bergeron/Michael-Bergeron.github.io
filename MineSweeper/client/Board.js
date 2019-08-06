import React from 'react'

export default function Board(props) {
  const boxStyle = {
    display: 'inline-block', 
    height: `100%`, 
    minWidth: `${100 / props.board.length}%`, 
    border: '1px solid black', 
    backgroundColor: '#bdbdbd',
    textAlign: 'center',
    fontSize: 15, 
    margin: '0px',
    verticalAlign: 'top'
  }
  const clickedStyle = {
    display: 'inline-block', 
    height: `100%`, 
    minWidth: `${100 / props.board.length}%`, 
    border: '1px solid black', 
    backgroundColor: 'grey',
    textAlign: 'center',
    fontSize: (20 / (props.board.length) * 11), 
    margin: '0px',
    verticalAlign: 'top'
  }
  return (
    <div style = {{padding: '30px', width: '600px', height: '600px'}} className = 'container'>
      {props.virtualBoard.map((row, index1) => 
      <div key = {Math.random()} style = {{marginBottom: '0px', width: '100%', height: `${100 / props.board.length}%`}} className = 'row'>
        {row.map((item, index2) => 
          <>
          {item !== false ? (
            <span key = {Math.random()} onClick = {(e) => props.clickSquare(e)} id = {[index1,index2]} style = {clickedStyle}>
              {item === 'flag' ? (<img id = {[index1,index2]} style = {clickedStyle} src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Minesweeper_flag.svg/1024px-Minesweeper_flag.svg.png'/>) : (<>{item}</>)}
              </span>
          ) : (
            <span key = {Math.random()} onClick = {(e) => props.clickSquare(e)} id = {[index1,index2]} style = {boxStyle}></span>
          )}
        </>
        )}
      </div>
      )}
    </div>
  )
}
