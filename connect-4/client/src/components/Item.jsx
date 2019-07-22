const Item = (props) => {
	const tdStyleRed = {
		height: '50px',
		width: '50px',
		border: '2px solid black',
		'backgroundColor': 'red'
	}
	const tdStyle = {
		height: '50px',
		width: '50px',
		border: '2px solid black'
	}
	const tdStyleYellow = {
		height: '50px',
		width: '50px',
		border: '2px solid black',
		'backgroundColor': 'yellow'
	}
	return (
		<td key = {`${props.index1}, ${props.index2}`} className = {`${props.index1}, ${props.index2}`} 
			style = {props.item === 'R' ? tdStyleRed : props.item === 'Y' ? tdStyleYellow : tdStyle}
			onClick = {(e) => props.handleClick(e)} >
		</td>
		)
}

export default Item;