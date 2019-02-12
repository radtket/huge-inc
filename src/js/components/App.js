import RenderNav from "./RenderNav";
import PageLoader from "./PageLoader";
import ToggleSlide from "./NavDropdown";

class App {
	constructor() {
		document.onload = this.documentLoad();
		window.addEventListener("resize", this.windowResize);
		this.document = document;
		this.body = this.document.body;
		this.toggleSlide = new ToggleSlide();
	}

	documentLoad = () => {
		PageLoader();
		this.createNav();
		this.addClickEvents();
		this.copyrightDate();
	};

	copyrightDate = () => {
		document.querySelector(
			".copyright"
		).innerHTML = `&copy; ${new Date().getFullYear()} <a href="https://www.hugeinc.com/" target="_blank" rel="external nofollow noopener noreferrer">Huge.</a> All Rights Reserved.`;
	};

	windowResize = () => {
		const { classList: bodyClassList } = this.body;
		const { innerWidth: viewPortSize } = window;
		const siteOverlay = document.querySelector(".site-overlay");
		const { classList: siteOverlayClassList } = siteOverlay;
		const desktopUp = viewPortSize >= 768;
		const mobileDown = viewPortSize < 767;

		if (desktopUp && bodyClassList.contains("drawer-open")) {
			bodyClassList.remove("drawer-open");
			this.toggleSlide.SlideUpAllOpenSubNavs();
		} else if (mobileDown && siteOverlayClassList.contains("is-visible")) {
			siteOverlayClassList.remove("is-visible");
			this.toggleSlide.SlideUpAllOpenSubNavs();
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
			this.toggleSlide.SlideUpAllOpenSubNavs();
		});

		document.addEventListener(
			"click",
			event => {
				const { parentElement } = event.target;
				if (!parentElement.classList.contains("nav-list__item--hassub")) return;
				event.preventDefault();
				const content = parentElement.querySelector(".nav-list__subnav");
				if (!content) return;
				this.toggleSlide.Toggle(parentElement);
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
