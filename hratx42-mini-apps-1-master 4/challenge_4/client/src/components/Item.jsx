const Item = (props) => {
	const tdStyleRed = {
		'borderRadius': '50%',
		height: '75px',
		width: '75px',
		border: '2px solid black',
		'backgroundColor': 'red'
	}
	const tdStyle = {
		height: '78px',
		width: '78px',
		border: '2px solid black',
		backgroundColor: 'blue'
	}
	const tdStyleYellow = {
		height: '75px',
		width: '75px',
		border: '2px solid black',
		'backgroundColor': 'yellow',
		'borderRadius': '50%'
	}
	const blankStyle = {
		height: '75px',
		width: '75px',
		border: '2px solid black',
		'backgroundColor': 'white',
		'borderRadius': '50%'
	}
	return (
		<td style = {tdStyle}>
			<div key = {`${props.index1}, ${props.index2}`} className = {`${props.index1}, ${props.index2}`} 
			style = {props.item === 'R' ? tdStyleRed : props.item === 'Y' ? tdStyleYellow : blankStyle}
			onClick = {(e) => props.handleClick(e)}></div>
		</td>
		)
}

export default Item;