
document.getElementById('generate-button').addEventListener('click', generateRandomNumber);

function generateRandomNumber() {
	let num = Math.floor(Math.random() * 100);
	
	document.getElementById('generated-number').innerHTML = num;
}