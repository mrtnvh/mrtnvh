<template>
	<intersect @enter="intersected = true" @leave="intersected = false">
		<img
			ref="image"
			:src="source"
			:srcset="sourceSet"
			:sizes="sizes"
			:alt="alt"
			:style="{ opacity: loaded ? 1 : 0 }"
			class="fade"
			@load="loaded = true"
		/>
	</intersect>
</template>

<script>
import Intersect from "~/components/Intersect/Intersect";
import { getSrcSet } from "./cloudinary";
import getImageSize from "./getImageSize";

export default {
	components: { Intersect },

	props: {
		src: {
			type: String,
			required: true,
		},

		alt: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			intersected: false,
			loaded: false,
			source: null,
			sourceSet: null,
			sizes: "1px",
		};
	},

	watch: {
		intersected(intersected) {
			const { src, srcSet } = getSrcSet({
				src: this.src,
			});

			this.source = intersected ? src : null;
			this.sourceSet = intersected ? srcSet : null;
			this.sizes =
				intersected && this.sizes === "1px"
					? getImageSize({ image: this.$refs.image })
					: "1px";

			if (!intersected) this.loaded = intersected;
		},
	},
};
</script>

<style scoped>
img {
	object-fit: cover;
}
</style>
