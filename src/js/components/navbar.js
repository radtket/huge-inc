export default function initNav() {
	fetch("/api")
		.then(item => item.json())
		.then(res => console.log(res));
}
