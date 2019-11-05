<template>
	<Intersect @enter="intersected = true" @leave="intersected = false">
		<article
			:style="animationDelay(index)"
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
import Image from "~/components/Image/Image.vue";
import IntersectMixin from "~/components/Intersect/IntersectMixin";
import AnimationMixin from "~/components/Animation/AnimationMixin";

export default {
	components: {
		Thumbnail: Image,
	},

	mixins: [IntersectMixin, AnimationMixin],

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
};
</script>

<style scoped>
article {
	max-width: 100%;
}

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
	margin-top: calc(var(--space) * -1.375);
	padding: 0 calc(var(--space) * 1.5);
}

.title {
	text-transform: uppercase;
	margin: 0 0 0.5rem 0;
	line-height: 0.85em;
}

.subtitle {
	font-size: var(--font-size-base);
	font-weight: 400;
	margin: 0;
}
</style>
