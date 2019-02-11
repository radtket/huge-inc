const pageMask = document.querySelector(".site-overlay");
const baseTransitionTime = 300;

// slideDown an element
const slideDown = elem => {
	const parentLi = elem;
	const subNav = parentLi.querySelector(".nav-list__subnav");

	// Get the natural height of the subNav
	const getHeight = () => {
		subNav.style.display = "block"; // Make it visible
		const height = `${subNav.scrollHeight}px`; // Get it's height
		subNav.style.display = ""; //  slideUp it again
		return height;
	};

	parentLi.classList.add("is-visible"); // Make the parentLi visible
	subNav.style.height = getHeight(); // Update the max-height

	// Activate Page Mask
	pageMask.classList.add("is-visible");

	// Once the transition is complete, remove the inline max-height so the content can scale responsively
	window.setTimeout(() => {
		subNav.style.height = "";
	}, baseTransitionTime);
};

// slideUp an element
const slideUp = elem => {
	const parentLi = elem;
	const subNav = parentLi.querySelector(".nav-list__subnav");

	// Give the element a height to change from
	subNav.style.height = `${subNav.scrollHeight}px`;

	// Set the height back to 0
	window.setTimeout(() => {
		subNav.style.height = "0";
	}, 1);

	// When the transition is complete, slideUp it
	window.setTimeout(() => {
		parentLi.classList.remove("is-visible");
		pageMask.classList.remove("is-visible");
	}, baseTransitionTime);
};

// Toggle element visibility
export const Toggle = elem => {
	const element = elem;
	// If the element is visible, slideUp it : Otherwise, slideDown it
	return element.classList.contains("is-visible")
		? slideUp(element)
		: slideDown(element);
};

export const slideUpAllOpenSubNavs = () => {
	const allSubNavs = document.querySelectorAll(".nav-list__item--hassub");
	allSubNavs.forEach(subNav => {
		if (subNav.classList.contains("is-visible")) {
			slideUp(subNav);
		}
	});
};
