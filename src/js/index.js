import "../styles/main.scss";

import RenderNav from "./components/RenderNav";
import PageLoader from "./components/PageLoader";
import toggle, { slideUpAllOpenSubNavs } from "./components/NavDropdown";

// Constents
const hamburger = document.querySelector(".hamburger-btn");
const pageMask = document.querySelector(".site-overlay");

document.onload = PageLoader();

// Listen for click events
document.addEventListener(
	"click",
	event => {
		// Make sure clicked element is our toggle
		if (!event.target.classList.contains("toggle")) return;

		// Prevent default link behavior
		event.preventDefault();

		// Get the content
		const content = document.querySelector(event.target.hash);
		if (!content) return;

		// Toggle the content
		toggle(content);
	},
	false
);

hamburger.addEventListener("click", () =>
	document.body.classList.toggle("drawer-open")
);

pageMask.addEventListener("click", e => {
	const { target } = e;
	target.classList.remove("is-visible");
	slideUpAllOpenSubNavs();
});

fetch("/api")
	.then(item => item.json())
	.then(res => new RenderNav().createNavItems(res.items));
