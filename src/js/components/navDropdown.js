const pageMask = document.querySelector(".site-overlay");
const baseTransitionTime = 300;

// slideDown an element
function slideDown(elem) {
	const element = elem;

	// Get the natural height of the element
	const getHeight = () => {
		element.style.display = "block"; // Make it visible
		const height = `${element.scrollHeight}px`; // Get it's height
		element.style.display = ""; //  slideUp it again
		return height;
	};

	element.classList.add("is-visible"); // Make the element visible
	element.style.height = getHeight(); // Update the max-height

	// Activate Page Mask
	pageMask.classList.add("is-visible");

	// Once the transition is complete, remove the inline max-height so the content can scale responsively
	window.setTimeout(() => {
		element.style.height = "";
	}, baseTransitionTime);
}

// slideUp an element
const slideUp = elem => {
	const element = elem;
	// Give the element a height to change from
	element.style.height = `${element.scrollHeight}px`;

	// Set the height back to 0
	window.setTimeout(() => {
		element.style.height = "0";
	}, 1);

	// When the transition is complete, slideUp it
	window.setTimeout(() => {
		element.classList.remove("is-visible");
		pageMask.classList.remove("is-visible");
	}, baseTransitionTime);
};

// Toggle element visibility
const toggle = elem => {
	const element = elem;
	// If the element is visible, slideUp it : Otherwise, slideDown it
	return element.classList.contains("is-visible")
		? slideUp(elem)
		: slideDown(elem);
};

export const slideUpAllOpenSubNavs = () => {
	const allSubNavs = document.querySelectorAll(".nav-list__subnav");
	for (let i = 0; i < allSubNavs.length; i += 1) {
		if (allSubNavs[i].classList.contains("is-visible")) {
			slideUp(allSubNavs[i]);
		}
	}
};

export default toggle;
