const Scoreboard = (props) => {
    const style = {
        border: "2px solid black"
    }
    props.data.sort((function(a, b) {
        if(a.total < b.total) { return -1; }
        if(a.total > b.total) { return 1; }
        return 0;
        }))
    return (
        <div>
            <table style = {style}><tbody>
                <tr><td>Name:   Total Wins:</td></tr>
                {props.data.map(item => 
                    <tr key = {item.name}>
                        <td style = {style}>{item.name}, {item.total}</td>
                    </tr>)}
                    </tbody>
            </table>
        </div>
      )
}
 
export default Scoreboard;