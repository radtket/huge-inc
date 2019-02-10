import "../styles/main.scss";

function addElement() {
	const newDiv = document.createElement("div");
	const newContent = document.createTextNode("TEST: LETS DO THIS! 💪💪💪");
	newDiv.appendChild(newContent);

	const currentDiv = document.getElementById("div1");
	document.body.insertBefore(newDiv, currentDiv);
}

document.body.onload = addElement;
