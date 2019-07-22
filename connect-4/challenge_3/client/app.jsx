class App extends React.Component {
	constructor(props){
		super(props);
		this.nextClick = this.nextClick.bind(this);
		this.onChange = this.onChange.bind(this);
		this.state = {
			steps: ['checkout', 'FormOne', 'FormTwo', 'FormThree', 'purchase'],
			currentStep: 0,
			customerInfo: {
				id: null,
				name: '',
				email: '',
				password: '',
				address: '',
				address2: '',
				city: '',
				state: '',
				zipCode: '',
				phone: '',
				CC: '',
				exp: '',
				CVV: '',
				billZip: ''
			}
		}

	}
	
	back() {
		let curr = this.state.currentStep;
		curr--;
		this.setState({currentStep: curr})
	}

	checkoutClick() {
		fetch('/newAccount')
		.then((res) => res.json())
		.then((results) => {
			let curr = 1;
			console.log(results)
			let newCustomerInfo = this.state.customerInfo;
			if (results.insertId){
				for (let key in newCustomerInfo){
					newCustomerInfo[key] = ''
				}
				this.setState({customerInfo: newCustomerInfo, currentStep: curr});
			}else {
				for (let key in newCustomerInfo){
					if (results[0][key] !== null){
						newCustomerInfo[key] = results[0][key]}
				}
				if (newCustomerInfo.name !== '' && newCustomerInfo.email !== '' && newCustomerInfo.password !== ''){
					curr = 2;
				}
				if (newCustomerInfo.address !== '' && newCustomerInfo.city !== '' && newCustomerInfo.state !== '' && newCustomerInfo.zipCode !== '' && newCustomerInfo.phone !== ''){
					curr = 3;
				}
				if (newCustomerInfo.CC !== '' && newCustomerInfo.exp !== '' && newCustomerInfo.CVV !== '' && newCustomerInfo.billZip !== ''){
					curr = 4;
				}
				this.setState({customerInfo: newCustomerInfo, currentStep: curr})
			}
		})
	}

	nextClick() {
		const runNext = () => {
			if (curr === 5){
				this.setState({currentStep: 0})
			} else {
				curr++;
				this.setState({currentStep: curr})
			}
			fetch('/updateAccount', {
				method: 'POST',
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(this.state.customerInfo)
			}).then(console.log('success'))
		}
		var curr = this.state.currentStep;
		var info = this.state.customerInfo;
		if (curr === 2) {
			if (info.address === ''){
				alert('fill in address line 1')
			} else if (info.city === ''){
				alert('fill in city')
			} else if(info.state === ''){
				alert('fill in state')
			} else if(info.city === ''){
				alert('fill in city')
			}else if(info.zip === ''){
				alert('fill in zipCode')
			}else if(info.phone === ''){
				alert('fill in phone number')
			}else {
				runNext();
			}
		}
		else if (curr === 1) {
			if (info.name === ''){
				alert('fill in name')
			} else if (info.email === ''){
				alert('fill in email')
			} else if(info.password === ''){
				alert('fill in password')
			} else {
				runNext();
			}
		}
		else if (curr === 3) {
			if (info.CC === ''){
				alert('fill in credit card #')
			} else if (info.CVV === ''){
				alert('fill in CVV')
			} else if(info.exp === ''){
				alert('fill in expiration date')
			} else if(info.billZip === ''){
				alert('fill in billing ZipCoe')
			}else {
				runNext();
			}
		}
	}

	onChange(e) {
		let newCustomerInfo = this.state.customerInfo;
		newCustomerInfo[e.target.className] = e.target.value;
		this.setState({customerInfo: newCustomerInfo})
	}

	restartForm() {
		fetch('/complete', {
			method: 'POST',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({text: 'complete'})
		}).then(()=>{
			console.log('success')
			this.setState({currentStep: 0})}
		)
	}

  render(){
			return (
				<div>
					{this.state.currentStep === 0 ? (<button className = 'checkout' onClick = {this.checkoutClick.bind(this)}>Checkout</button>) : (<div></div>)}
					{this.state.currentStep === 1 ? (<FormOne customerInfo = {this.state.customerInfo} next = {this.nextClick} change = {this.onChange} />) : (<div></div>)}
					{this.state.currentStep === 2 ? (<FormTwo customerInfo = {this.state.customerInfo} next = {this.nextClick} back = {this.back.bind(this)} change = {this.onChange} />) : (<div></div>)}
					{this.state.currentStep === 3 ? (<FormThree customerInfo = {this.state.customerInfo} next = {this.nextClick} back = {this.back.bind(this)} change = {this.onChange} />) : (<div></div>)}
					{this.state.currentStep === 4 ? (<Purchase customerInfo = {this.state.customerInfo} back = {this.back.bind(this)} restartForm= {this.restartForm.bind(this)} />) : (<div></div>)}
				</div>
			)
		}
	}

const FormOne = (props) => {
	return(
		<div>
			<h2>User Information</h2>
			<div>
				Name: <input className = "name" type="text" value = {props.customerInfo.name} onChange = {(e) => {props.change(e)}} /><br></br>
				Email: <input className = "email" type="text" value = {props.customerInfo.email} onChange = {(e) => {props.change(e)}} /><br></br>
				Password: <input className = "password" type="text" value = {props.customerInfo.password} onChange = {(e) => {props.change(e)}} /><br></br>
				<Button next = {props.next} />
			</div>
		</div>
)}

const FormTwo = (props) => {
	return(
		<div>
			<h2>Shipping Information</h2>
			<div>
				Address: <input type="text" className = "address" value = {props.customerInfo.address} onChange = {(e) => {props.change(e)}} /><br></br>
				Address Line2: <input type="text" className = "address2" value = {props.customerInfo.addressLine2} onChange = {(e) => {props.change(e)}} /><br></br>
				City: <input type="text" className = "city" value = {props.customerInfo.city} onChange = {(e) => {props.change(e)}} /><br></br>
				State: <input type="text" className = "state" value = {props.customerInfo.state} onChange = {(e) => {props.change(e)}} /><br></br>
				ZipCode: <input type="number" maxLength="5" className = "zipCode" value = {props.customerInfo.zip} onChange = {(e) => {props.change(e)}} /><br></br>
				Phone: <input type="number" className = "phone" value = {props.customerInfo.phone} onChange = {(e) => {props.change(e)}} /><br></br>
				<Button next = {props.next}/>
				<button onClick = {props.back}>Go Back</button>
			</div>
		</div>
)}

const FormThree = (props) => {
	return(
		<div>
			<h2>Credit Card Information</h2>
			<div>
				Credit Card Number: <input type="number" maxLength="22" className = "CC" value = {props.customerInfo.CC} onChange = {(e) => {props.change(e)}} /><br></br>
				Expiration: <input type="text" className = "exp" value = {props.customerInfo.exp} onChange = {(e) => {props.change(e)}} /><br></br>
				CVV: <input type="number" maxLength="3" className = "CVV" value = {props.customerInfo.CVV} onChange = {(e) => {props.change(e)}} /><br></br>
				Billing ZipCode: <input type="number" maxLength="5" className = "billZip" value = {props.customerInfo.billZip} onChange = {(e) => {props.change(e)}} /><br></br>
				<Button next = {props.next}/>
				<button onClick = {props.back}>Go Back</button>
			</div>
		</div>
)}

const Purchase = (props) => {
	return (
		<div>
			<h2>Confirmation Page</h2>
			<p>Name: {props.customerInfo.name}</p>
			<p>Password: {props.customerInfo.password}</p>
			<p>Email: {props.customerInfo.email}</p>
			<p>Address: {props.customerInfo.address}</p>
			<p>Address Line 2: {props.customerInfo.address2}</p>
			<p>City: {props.customerInfo.city}</p>
			<p>State: {props.customerInfo.state}</p>
			<p>ZipCode: {props.customerInfo.zip}</p>
			<p>Credit Card #: {props.customerInfo.CC}</p>
			<p>CVV: {props.customerInfo.CVV}</p>
			<p>Expiration: {props.customerInfo.exp}</p>
			<p>Billing Zip: {props.customerInfo.billZip}</p>
			<button onClick = {props.restartForm}>Confirm Purchase</button>
			<button onClick = {props.back}>Go Back</button>
		</div>
	)
}

const Button = (props) => {
	return (
		<div>
			<button className = "next" onClick = {props.next}>Next Form</button>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
