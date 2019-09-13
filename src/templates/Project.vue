<template>
	<Layout>
		<div id="project" class="container">
			<header>
				<div class="sticky">
					<h1 class="title outline">{{ $page.project.title }}</h1>
					<div class="subtitle">{{ $page.project.subtitle }}</div>
				</div>
			</header>
			<div class="content">
				<figure class="media">
					<g-image
						:src="$page.project.thumbnail"
						:alt="$page.project.title"
						class="thumbnail"
					/>
				</figure>
				<div v-html="$page.project.content" class="body" />
			</div>
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

<style>
#project .body > section {
	margin-bottom: var(--grid-gap);
}
</style>

<style scoped>
.container {
	@media (min-width: 800px) {
		display: grid;
		grid-template-columns: 2fr 2fr 1fr 1fr;
		grid-column-gap: var(--grid-gap);
		padding-top: calc(var(--grid-gap) / 2);
		padding-bottom: calc(var(--grid-gap) / 2);
	}
}

.content {
	grid-area: auto / 2 / auto / 5;
}

.sticky {
	position: sticky;
	top: 3rem;
}

.title {
	font-size: var(--font-size-7xl);
	text-transform: uppercase;
	line-height: var(--line-height-xxs);
}

.media {
	padding-bottom: 56.25%;
	position: relative;
	overflow: hidden;
	margin-bottom: var(--grid-gap);
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
