<template>
	<Layout>
		<div id="project" class="container">
			<header>
				<div class="sticky">
					<h1 class="title outline">{{ $page.project.title }}</h1>
					<div class="subtitle">{{ $page.project.subtitle }}</div>
				</div>
			</header>
			<figure class="media">
				<g-image
					:src="$page.project.thumbnail"
					:alt="$page.project.title"
					class="thumbnail"
				/>
			</figure>
			<div v-html="$page.project.content" class="body" />
		</div>
	</Layout>
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
import Layout from "~/layouts/Default.vue";

export default {
	components: {
		Layout,
	},
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

.thumbnail {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	object-fit: cover;
	object-position: center center;
}
</style>
