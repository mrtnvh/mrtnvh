<template>
	<div>
		<Intro />
		<Section title="Current" title-small="projects">
			<Projects v-model="currentProjects" class="projects" />
		</Section>
	</div>
</template>

<script>
import Section from "~/components/Page/Section.vue";
import Intro from "~/components/Page/Intro.vue";
import Projects from "~/components/Project/List.vue";

export default {
	components: { Projects, Section, Intro },

	computed: {
		projects() {
			return this.$page.projects.edges.map(({ node }) => node);
		},

		currentProjects() {
			return this.projects.filter(({ current }) => current);
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
