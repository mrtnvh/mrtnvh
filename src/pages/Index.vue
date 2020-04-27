<template>
	<div>
		<Intro />
		<Section title="Current" title-small="projects">
			<List v-model="projects" class="projects" />
		</Section>
	</div>
</template>

<script>
import Section from "~/components/Page/Section.vue";
import Intro from "~/components/Page/Intro.vue";
import List from "~/components/List/List.vue";

export default {
	components: { List, Section, Intro },

	computed: {
		projects() {
			return this.$page.projects.edges
				.map(({ node }) => node)
				.filter(({ current }) => current);
		},
	},
};
</script>

<page-query>
	query {
		projects: allProject(sortBy: "datePublished") {
			edges {
				node {
					title
					subtitle
					thumbnail
					color
					current
					path
					datePublished
				}
			}
		}
	}
</page-query>
