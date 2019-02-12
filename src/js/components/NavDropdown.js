class ToggleSlide {
	constructor() {
		this.pageMask = document.querySelector(".site-overlay");
		this.baseTransitionTime = 300;
	}

	Toggle = elem => {
		const element = elem;
		// If the element is visible, SlideUp it : Otherwise, SlideDown it
		return element.classList.contains("is-visible")
			? this.SlideUp(element)
			: this.SlideDown(element);
	};

	// SlideDown an element
	SlideDown = elem => {
		const parentLi = elem;
		const subNav = parentLi.querySelector(".nav-list__subnav");

		// Get the natural height of the subNav
		const getHeight = () => {
			subNav.style.display = "block"; // Make it visible
			const height = `${subNav.scrollHeight}px`; // Get it's height
			subNav.style.display = ""; //  SlideUp it again
			return height;
		};

		parentLi.classList.add("is-visible"); // Make the parentLi visible
		subNav.style.height = getHeight(); // Update the max-height

		// Activate Page Mask
		this.pageMask.classList.add("is-visible");

		// Once the transition is complete, remove the inline max-height so the content can scale responsively
		window.setTimeout(() => {
			subNav.style.height = "";
		}, this.baseTransitionTime);
	};

	// SlideUp an element
	SlideUp = elem => {
		const parentLi = elem;
		const subNav = parentLi.querySelector(".nav-list__subnav");

		// Give the element a height to change from
		subNav.style.height = `${subNav.scrollHeight}px`;

		// Set the height back to 0
		window.setTimeout(() => {
			subNav.style.height = "0";
		}, 1);

		// When the transition is complete, SlideUp it
		window.setTimeout(() => {
			parentLi.classList.remove("is-visible");
			this.pageMask.classList.remove("is-visible");
		}, this.baseTransitionTime);
	};

	SlideUpAllOpenSubNavs = () => {
		const allSubNavs = document.querySelectorAll(".nav-list__item--hassub");
		allSubNavs.forEach(subNav => {
			if (subNav.classList.contains("is-visible")) {
				this.SlideUp(subNav);
			}
		});
	};
}

export default ToggleSlide;
