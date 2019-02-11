import RenderNav from "./RenderNav";
import PageLoader from "./PageLoader";

import { Toggle, slideUpAllOpenSubNavs } from "./NavDropdown";

class App {
	constructor() {
		document.onload = this.documentLoad();
		window.addEventListener("resize", this.windowResize);
		this.document = document;
		this.body = this.document.body;
	}

	documentLoad = () => {
		PageLoader();
		this.createNav();
		this.addClickEvents();
	};

	windowResize = () => {
		const { classList: bodyClassList } = this.body;
		const siteOverlay = document.querySelector(".site-overlay");
		const { classList: siteOverlayClassList } = siteOverlay;
		if (window.innerWidth >= 767 && bodyClassList.contains("drawer-open")) {
			bodyClassList.remove("drawer-open");
			slideUpAllOpenSubNavs();
		} else if (
			window.innerWidth < 768 &&
			siteOverlayClassList.contains("is-visible")
		) {
			siteOverlayClassList.remove("is-visible");
			slideUpAllOpenSubNavs();
		}
	};

	addClickEvents = () => {
		document
			.querySelector(".hamburger-btn")
			.addEventListener("click", () =>
				this.body.classList.toggle("drawer-open")
			);

		document.querySelector(".site-overlay").addEventListener("click", e => {
			const { classList } = e.target;
			classList.remove("is-visible");
			slideUpAllOpenSubNavs();
		});

		document.addEventListener(
			"click",
			event => {
				const { parentElement } = event.target;
				if (!parentElement.classList.contains("nav-list__item--hassub")) return;
				event.preventDefault();
				const content = parentElement.querySelector(".nav-list__subnav");
				if (!content) return;
				Toggle(parentElement);
			},
			false
		);
	};

	createNav = () => {
		fetch("/api")
			.then(item => item.json())
			.then(res => new RenderNav().createNavItems(res.items));
	};
}

export default App;
