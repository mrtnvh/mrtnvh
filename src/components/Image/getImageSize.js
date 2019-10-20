export default ({ image }) => {
	const { naturalWidth, naturalHeight } = image;
	const { height, width } = image.getBoundingClientRect();
	const imageWidthRatio = naturalWidth / naturalHeight;

	const roundedWidth = Math.max(width, height * imageWidthRatio);

	const result = `${Number.isNaN(roundedWidth) ? width : roundedWidth}px`;
	return result;
};
