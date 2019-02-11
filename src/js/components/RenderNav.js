class RenderNav {
	constructor() {
		this.nav = document.getElementById("js-nav-root");
	}

	slugify = text => {
		return text
			.toString()
			.toLowerCase()
			.replace(/\s+/g, "-") // Replace spaces with -
			.replace(/[^\w\-]+/g, "") // Remove all non-word chars
			.replace(/\-\-+/g, "-") // Replace multiple - with single -
			.replace(/^-+/, "") // Trim - from start of text
			.replace(/-+$/, ""); // Trim - from end of text
	};

	checkForSubNav = childdata => {
		if (childdata.length > 0 && childdata != null) {
			return childdata;
		}
		return false;
	};

	createNavLink = (url, name) => {
		return `<a href="${url}">${name}</a>`;
	};

	createSubNavItems = (parent, childdata) => {
		const parentKeyName = this.slugify(parent.label);

		const items = document.createElement("ul");
		items.setAttribute("class", "nav-list__subnav");
		items.setAttribute("id", `items-${parentKeyName}-menu`);

		const itemsmainurl = document.getElementById(`items-${parentKeyName}`);
		itemsmainurl.appendChild(items);

		const itemsId = document.getElementById(`items-${parentKeyName}-menu`);

		childdata.forEach(item => {
			const { items: hasSubmenu, url, label } = item;

			const line = document.createElement("li");
			line.className = hasSubmenu
				? "nav-list__item nav-list__item--hassub"
				: "nav-list__subnav--item";
			line.innerHTML = this.createNavLink(url, label);
			itemsId.appendChild(line);
		});
	};

	createNavItems = data => {
		data.forEach(navLink => {
			const { items: hasSubmenu, url, label } = navLink;
			const menuKey = this.slugify(label);
			const line = document.createElement("li");
			line.className = this.checkForSubNav(hasSubmenu)
				? "nav-list__item nav-list__item--hassub"
				: "nav-list__item";
			line.innerHTML = this.createNavLink(url, label);
			if (this.checkForSubNav(hasSubmenu)) {
				line.setAttribute("id", `items-${menuKey}`);
				this.nav.appendChild(line);
				this.createSubNavItems(navLink, hasSubmenu);
			} else {
				this.nav.appendChild(line);
			}
		});
	};
}

export default RenderNav;
