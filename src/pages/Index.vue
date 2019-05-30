<template>
	<Layout>
		<PageSection title="Projects">
			<SubSection title="Current">
				<Projects v-model="currentProjects" class="projects" />
			</SubSection>
			<SubSection title="Previous">
				<Projects v-model="previousProjects" class="projects" />
			</SubSection>
		</PageSection>
	</Layout>
</template>

<script>
import PageSection from "~/components/Page/Section.vue";
import SubSection from "~/components/Page/SubSection.vue";
import Projects from "~/components/Project/List.vue";

export default {
	metaInfo: {
		title: "Maarten Van Hoof - Frontend Developer",
		titleTemplate: "",
	},

	components: { Projects, PageSection, SubSection },

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
