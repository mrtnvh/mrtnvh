<template>
	<component :is="type" :page="page" />
</template>

<script>
import startCase from "lodash/startCase";
import Seo, { titleDefault } from "~/lib/Seo";
import About from "~/components/Page/Type/About.vue";
import Project from "~/components/Page/Type/Project.vue";
import Default from "~/components/Page/Type/Default.vue";

export default {
	async asyncData({ $content, params, error }) {
		const path = `/${params.pathMatch || "index"}`;
		const [page] = await $content({ deep: true }).where({ path }).fetch();

		if (!page) {
			return error({ statusCode: 404 });
		}

		return { page };
	},
	head() {
		const { title, description, subtitle, thumbnail } = this.page;
		const { path } = this.$route;
		const pathParts = this.page.dir
			.split("/")
			.filter((part) => part.length > 0)
			.map(startCase);

		return Seo({
			title,
			titleTemplate: [
				"%s",
				...(pathParts.length > 0 ? pathParts : []),
				titleDefault,
			].join(" \\\\ "),
			description: description || subtitle,
			path,
			image: thumbnail,
		});
	},

	computed: {
		type() {
			const { dir, slug } = this.page;
			if (dir === "/projects") return Project;
			if (dir === "/" && slug === "about") return About;
			return Default;
		},
	},
};
</script>
