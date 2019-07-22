import Item from './Item.jsx'

const Column = (props) => {
    return (
		<tbody>
			<tr>
				{props.col.map((item, i) =>
					<Item key = {`${i}`} item = {item} index1 = {props.index1} index2 = {i} handleClick = {props.handleClick} />
				)}
			</tr>
			</tbody>
    )
}

export default Column;