<template>
	<intersect @enter="intersected = true" @leave="intersected = false">
		<div id="project" class="container">
			<header>
				<div class="sticky">
					<div
						:class="[
							`slide-up-fade`,
							`slide-up-fade-${
								intersected ? 'active' : 'inactive'
							}`,
						]"
					>
						<h1 class="title outline">{{ $page.project.title }}</h1>
						<div class="subtitle">{{ $page.project.subtitle }}</div>
					</div>
				</div>
			</header>
			<figure class="media">
				<Thumbnail
					:src="$page.project.thumbnail"
					:alt="$page.project.title"
					class="image"
				/>
			</figure>
			<div
				v-html="$page.project.content"
				:class="[
					'body',
					`slide-up-fade`,
					`slide-up-fade-${intersected ? 'active' : 'inactive'}`,
				]"
			/>
		</div>
	</intersect>
</template>

<page-query>
query Project($path: String!) {
	project(path: $path) {
		title
		subtitle
		content
		thumbnail
	}
}
</page-query>

<script>
import Image from "~/components/Image";
import IntersectMixin from "~/components/Intersect/IntersectMixin";

export default {
	metaInfo() {
		return {
			titleTemplate: [
				"%s",
				"Projects",
				process.env.GRIDSOME_TITLE_TEMPLATE,
			].join(" \\\\ "),
			title: this.$page.project.title,
		};
	},

	components: {
		Thumbnail: Image,
	},

	mixins: [IntersectMixin],
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
		grid-template-areas: "header media" "header body";
		grid-column-gap: var(--grid-gap-x);
		width: calc(100% - (var(--grid-gap-x)));
	}
}

header {
	grid-area: header;
	margin-bottom: var(--grid-gap-y);

	@media (max-width: 799px) {
		order: 2;
		margin-top: calc(var(--grid-gap) * -2.5);
		margin-left: var(--grid-gap);
	}
}

.sticky {
	position: sticky;
	z-index: var(--project-header-zindex);
	top: var(--project-header-top-position);
}

.title {
	font-size: var(--project-title-size);
	margin: var(--project-title-margin);
	text-transform: uppercase;
	line-height: 0.66em;
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
