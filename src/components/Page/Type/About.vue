<template>
	<article id="folio" class="container">
		<h1 :class="['title', 'outline']">
			{{ page.title }}
		</h1>
		<div :class="['subtitle', 'intro']">
			{{ page.subtitle }}
		</div>
		<div :class="['media-container']">
			<figure class="media">
				<Thumbnail
					:src="page.thumbnail"
					:alt="page.title"
					class="image"
					width="800"
					height="800"
				/>
			</figure>
		</div>
		<nuxt-content :class="['body']" :document="page" />
	</article>
</template>

<script>
import mixins from "./mixins";
import Image from "~/components/Image/Image.vue";

export default {
	components: {
		Thumbnail: Image,
	},
	mixins: [mixins],
};
</script>

<style>
#folio .body > section {
	margin-bottom: var(--grid-gap);
}
</style>

<style scoped>
.container {
	padding-top: var(--grid-gap-y);
	padding-bottom: var(--grid-gap-y);
	display: grid;
	grid-template-columns: 1fr;
	grid-row-gap: var(--grid-gap-y);

	@media (min-width: 800px) {
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-template-rows: auto auto 1fr;
		grid-column-gap: var(--grid-gap-x);
	}
}

.title {
	font-size: var(--folio-title-size);
	text-transform: uppercase;
	line-height: 0.75em;
	margin-bottom: 0;

	@media (min-width: 800px) {
		grid-area: 1 / 1 / 2 / 3;
	}
}

.subtitle {
	@media (min-width: 800px) {
		grid-area: 2 / 1 / 2 / 2;
	}
}

.media-container {
	@media (min-width: 800px) {
		grid-area: 2 / 1 / 4 / 2;
	}
}

.media {
	position: sticky;
	z-index: var(--folio-header-zindex);
	top: var(--folio-header-top-position);
	padding-bottom: 100%;
	margin-bottom: 0;
}

.body {
	@media (min-width: 800px) {
		grid-area: 2 / 2 / 4 / 3;
	}
}
</style>
