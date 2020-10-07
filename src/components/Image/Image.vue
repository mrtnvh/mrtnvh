<template>
	<img
		ref="image"
		:src="source"
		:srcset="sourceSet"
		:sizes="sizes"
		:alt="alt"
		class="fade"
		loading="lazy"
		:width="width"
		:height="height"
	/>
</template>

<script>
import { getSrcSet } from "./cloudinary";
import getImageSize from "./getImageSize";

export default {
	props: {
		src: {
			type: String,
			required: true,
		},

		alt: {
			type: String,
			required: true,
		},

		width: {
			type: String,
			required: true,
		},

		height: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			source: null,
			sourceSet: null,
			sizes: "1px",
		};
	},

	created() {
		const { src, srcSet } = getSrcSet({
			src: this.src,
		});

		this.source = src;
		this.sourceSet = srcSet;
	},

	mounted() {
		this.sizes = getImageSize({ image: this.$refs.image });
	},
};
</script>

<style scoped>
img {
	object-fit: cover;
}
</style>
