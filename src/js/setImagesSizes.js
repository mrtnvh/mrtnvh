export const getImageSize = ({ image }) => {
	const { width } = image.getBoundingClientRect();
	return `${width}px`;
};

export const setImagesSizes = () => {
	const images = document.querySelectorAll('img[sizes="1px"]');
	images.forEach((image) => {
		const size = getImageSize({ image });
		// eslint-disable-next-line no-param-reassign
		image.sizes = size;
		image.addEventListener(`load`, (event) => {
			image.classList.remove("fade-inactive");
			image.classList.add("fade-active");
		});

		const sources = image.parentNode.querySelectorAll("source");
		if (sources) {
			sources.forEach((source) => {
				// eslint-disable-next-line no-param-reassign
				source.sizes = size;
			});
		}
	});
};
