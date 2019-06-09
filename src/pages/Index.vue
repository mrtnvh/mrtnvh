<template>
	<Layout>
		<Section title="Current" title-small="projects">
			<Projects v-model="currentProjects" class="projects" />
		</Section>
		<Section title="Previous" title-small="projects">
			<Projects v-model="previousProjects" class="projects" />
		</Section>
	</Layout>
</template>

<script>
import Section from "~/components/Page/Section.vue";
import Projects from "~/components/Project/List.vue";

export default {
	metaInfo: {
		title: "Maarten Van Hoof - Frontend Developer",
		titleTemplate: "",
	},

	components: { Projects, Section },

	computed: {
		projects() {
			return this.$page.projects.edges.map(({ node }) => node);
		},

		currentProjects() {
			return this.projects.filter(({ current }) => current);
		},

		previousProjects() {
			return this.projects.filter(({ current }) => !current);
		},
	},
};
</script>

<page-query>
query {
	projects: allProject {
		edges {
			node {
				title
				subtitle
				thumbnail
				color
				current
			}
		}
	}
}
</page-query>
