import React, {Component} from "react"
import Column from "./Column.jsx"

const Board = (props) => {
	const style = {
		backgroundColor: 'blue'
	}
	return (
		<div>Board
			<table style= {style}>
				{props.board.map((col, i) => 
					<Column key = {`${i}`} col = {col} index1 = {i} handleClick = {props.handleClick} />
				)}
			</table>
		</div>
	)
}

export default Board;