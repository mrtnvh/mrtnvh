export default ({ image }) => {
	const { width } = image.getBoundingClientRect();
	return `${width}px`;
};
