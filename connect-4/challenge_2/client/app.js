window.onload = () => {

	let button = document.getElementById('submitButton');
	let textarea = document.getElementById('textarea');
	let form = document.getElementById('inputForm');
	let resultForm = document.getElementById('resultForm');
	let fileName = document.getElementById('fileName');
	let pickFile = document.getElementById('pickFile');
	let fileToSend;
	let download = document.getElementById('download');
	let downloadLink = document.getElementById('downloadLink');

	axios.get('/asdf')
	.then((res)=> console.log(res))

	pickFile.addEventListener('change', function(e) {
		const formData = new FormData();
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsText(file)
	
		reader.addEventListener('loadend', function(e) {
			fileToSend = e.target.result;
		})
	})
	
	button.addEventListener('click', function() {
		fetch('http://localhost:3000/csv', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"},
			body: fileToSend
		}).then((res) => res.json())
		.then((results) => {
			resultForm.appendChild(document.createElement('p')).innerHTML = results.text;
			downloadLink.style.visibility = "visible";
			let newtext = results.text.split('<br>').join('\n');
			downloadLink.href += newtext;
		})
	})
};