function loading(parent, isLoading = false) {
	const existingLoader = parent.querySelector(".loader");

	if (!isLoading) {
		existingLoader ? existingLoader.remove() : "";
		parent.style.position = "";
		parent.style.overflow = "";
		return;
	}

	if (existingLoader) return;

	const loader = document.createElement("div");
	loader.className = "loader absolute inset-0 z-9999 flex justify-center items-center bg-surface/90 backdrop-blur-xs";
	loader.innerHTML = `<div class="animate-spin size-10 rounded-full border-3 border-solid border-primary border-r-transparent shadow-lg shadow-primary/10"></div>`;

	const parentComputedStyle = getComputedStyle(parent);
	const position = parentComputedStyle.position;
	const overflow = parentComputedStyle.overflow;

	if (!position !== "absolute" && !position !== "relative" && !position !== "fixed") {
		parent.style.position = "relative";
	}

	if (!overflow !== "hidden") {
		parent.style.overflow = "hidden";
	}

	parent.append(loader);
}

export default loading;
