const PageLoader = () => {
	setTimeout(() => {
		const preloader = document.getElementById("loader");
		if (!preloader.classList.contains("done")) {
			preloader.classList.add("done");
		}
	}, 1000);
};

export default PageLoader;
