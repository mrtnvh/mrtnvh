<template>
	<Intersect @enter="intersected = true" @leave="intersected = false">
		<article
			:style="{ transitionDelay: `calc(0.25s * ${index})` }"
			:class="{
				'slide-up-fade': true,
				'slide-up-fade-inactive': !intersected,
			}"
		>
			<g-link :to="value.path" class="reset link">
				<figure class="media">
					<Thumbnail
						:src="value.thumbnail"
						:alt="value.title"
						class="image"
					/>
				</figure>
				<div class="content">
					<h1 class="title outline">
						{{ value.title }}
					</h1>
					<h2 class="subtitle">{{ value.subtitle }}</h2>
				</div>
			</g-link>
		</article>
	</Intersect>
</template>

<script>
import Image from "~/components/Image";
import Intersect from "~/components/Intersect/Intersect";

export default {
	components: {
		Thumbnail: Image,
		Intersect,
	},

	props: {
		value: {
			type: Object,
			required: true,
		},
		index: {
			type: Number,
			default: 0,
		},
	},

	data() {
		return { intersected: false };
	},
};
</script>

<style scoped>
.media {
	margin-bottom: 0;
}

.link {
	--link-color: var(--dark);
	--link-hover-color: var(--dark);
	--link-text-decoration: none;

	display: block;
}

.content {
	position: relative;
	z-index: 1;
	margin-top: calc(var(--space) * -2);
	padding: 0 calc(var(--space) * 1.5);
}

.title {
	text-transform: uppercase;
	margin: 0;
}

.subtitle {
	font-size: var(--font-size-base);
	font-weight: 400;
	margin: 0;
}
</style>
