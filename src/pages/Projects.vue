<template>
	<div>
		<Section title="Current" title-small="projects">
			<List :value="currentProjects" class="projects" />
		</Section>
		<Section title="Previous" title-small="projects">
			<List :value="previousProjects" class="projects" />
		</Section>
	</div>
</template>

<script>
import Section from "~/components/Page/Section.vue";
import List from "~/components/List/List.vue";

export default {
	metaInfo() {
		return {
			title: "Projects",
			meta: [
				{
					key: "description",
					name: "description",
					content:
						"A selection of my current and previous projects. Work, musical and open source experiences",
				},
			],
		};
	},

	components: { List, Section },

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
