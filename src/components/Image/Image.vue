<template>
	<picture ref="picture">
		<source :sizes="sizes" :srcset="sourceSetWebp" type="image/webp" />
		<img
			ref="image"
			:src="source"
			:srcset="sourceSet"
			:sizes="sizes"
			:alt="alt"
			class="image fade"
			loading="lazy"
			:width="width"
			:height="height"
		/>
	</picture>
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
			sourceSetWebp: null,
			sizes: "1px",
		};
	},

	created() {
		const { src, srcSet } = getSrcSet({
			src: this.src,
		});

		const { srcSet: srcSetWebp } = getSrcSet({
			src: this.src,
			type: "webp",
		});

		this.source = src;
		this.sourceSet = srcSet;
		this.sourceSetWebp = srcSetWebp;
	},

	mounted() {
		this.sizes = getImageSize({ image: this.$refs.image });
	},
};
</script>

<style scoped>
img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>
