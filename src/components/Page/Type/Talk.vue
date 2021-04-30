<template>
	<article id="talk" class="container">
		<header>
			<div class="sticky">
				<h1 class="title outline">{{ page.title }}</h1>
				<div class="subtitle">{{ page.subtitle }}</div>
			</div>
		</header>
		<aside>
			<table class="table-borderless">
				<tr>
					<td style="width: 6rem">Slides</td>
					<td>
						<a :href="page.slides" target="_blank" rel="noopener">{{
							page.slides
						}}</a>
					</td>
				</tr>
				<tr>
					<td>Demo</td>
					<td>
						<a :href="page.demo" target="_blank" rel="noopener">{{
							page.demo
						}}</a>
					</td>
				</tr>
				<tr>
					<td>Video</td>
					<td>
						<a :href="page.video" target="_blank" rel="noopener">{{
							page.video
						}}</a>
					</td>
				</tr>
			</table>
		</aside>

		<component
			:is="page.videoPreview && page.video ? 'a' : 'figure'"
			:class="{
				media: true,
				'media--video-overlay': page.videoPreview && page.video,
			}"
			v-bind="{
				...(page.videoPreview &&
					page.video && {
						href: page.video,
						target: '_blank',
						rel: 'noopener',
					}),
			}"
		>
			<Thumbnail
				:src="page.videoPreview || page.thumbnail"
				:alt="page.title"
				class="image"
				width="1600"
				height="900"
			/>
		</component>
		<div :class="['body']">
			<nuxt-content :document="page" />
		</div>
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

<style scoped>
.container {
	padding-top: var(--grid-gap-y);
	padding-bottom: var(--grid-gap-y);
	display: flex;
	flex-direction: column;

	@media (min-width: 800px) {
		display: grid;
		grid-template-columns: 30.5% 69.5%;
		grid-template-areas: "header header" "aside media" "aside body";
		grid-column-gap: var(--grid-gap-x);
		width: calc(100% - (var(--grid-gap-x)));
	}
}

header {
	grid-area: header;
	margin-bottom: var(--grid-gap-y);

	@media (max-width: 799px) {
		margin-top: calc(var(--grid-gap) * -2.5);
		margin-left: var(--grid-gap);
	}
}

/* .sticky {
	position: sticky;
	z-index: var(--talk-header-zindex);
	top: var(--talk-header-top-position);
} */

aside {
	grid-area: aside;
}

.title {
	font-size: var(--talk-title-size);
	margin: var(--talk-title-margin);
	text-transform: uppercase;
	line-height: var(--talk-title-line-height);
}

.media {
	grid-area: media;

	@media (max-width: 799px) {
		order: 1;
	}
}

.body {
	grid-area: body;
	order: 3;
}
</style>
