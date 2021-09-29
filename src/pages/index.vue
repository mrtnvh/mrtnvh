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
import Seo from "~/lib/Seo";

export default {
	components: { List, Section, Intro },
	async asyncData({ $content }) {
		const projects = await $content("projects")
			.where({ current: true })
			.sortBy("datePublished", "desc")
			.fetch();
		return { projects };
	},
	head() {
		return Seo();
	},
};
</script>
