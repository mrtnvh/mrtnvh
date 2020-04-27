<template>
	<!-- eslint-disable-next-line vue/require-component-is -->
	<component :is="type" :page="{ ...$page.folio }" />
</template>

<page-query>
	query Folio($path: String!) {
		folio(path: $path) {
			title
			description
			subtitle
			content
			thumbnail
			thumbnailAlt
		}
	}
</page-query>

<script>
import About from "~/components/Page/Type/About.vue";
import Seo from "~/lib/Seo";

export default {
	metaInfo() {
		const { title, description, subtitle } = this.$page.folio;
		const { path } = this.$route;
		return Seo({
			title,
			description: description || subtitle,
			path,
		});
	},
	computed: {
		type() {
			switch (this.$page.folio.type) {
				default:
					return About;
			}
		},
	},
};
</script>
