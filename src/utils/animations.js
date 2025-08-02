function showElement(elm, showClass, hideClass) {
	if (!elm) return;

	elm.hidden = false;
	elm.classList.add(showClass);
	elm.classList.remove(hideClass);

	elm.addEventListener(
		"animationend",
		() => {
			elm.hidden = false;
		},
		{ once: true },
	);
}

function hideElement(elm, showClass, hideClass) {
	if (!elm) return;

	elm.classList.remove(showClass);
	elm.classList.add(hideClass);

	elm.addEventListener(
		"animationend",
		() => {
			elm.hidden = true;
		},
		{ once: true },
	);
}

export { showElement, hideElement };
