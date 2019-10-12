<template>
	<intersect @enter="intersected = true" @leave="intersected = false">
		<img
			:src="source"
			:alt="alt"
			@load="loaded = true"
			:style="{ opacity: loaded ? 1 : 0 }"
			class="fade"
		/>
	</intersect>
</template>

<script>
import Intersect from "~/components/Intersect/Intersect";

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
		};
	},

	watch: {
		intersected(intersected) {
			this.source = intersected ? this.src : null;
			if (!intersected) this.loaded = intersected;
		},
	},
};
</script>

<style scoped>
.wrapper {
	display: flex;
}

img {
	object-fit: cover;
}
</style>
