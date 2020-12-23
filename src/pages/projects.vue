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
	components: { List, Section },

	async asyncData({ $content }) {
		const projects = await $content("projects")
			.sortBy("datePublished", "desc")
			.fetch();
		return { projects };
	},

	head: {
		title: "Projects",
		meta: [
			{
				key: "description",
				name: "description",
				content:
					"A selection of my current and previous projects. Work, musical and open source experiences",
			},
		],
	},

	computed: {
		currentProjects() {
			return this.projects.filter(({ current }) => current);
		},

		previousProjects() {
			return this.projects.filter(({ current }) => !current);
		},
	},
};
</script>
