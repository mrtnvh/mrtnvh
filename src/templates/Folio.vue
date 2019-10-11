<template>
	<Layout>
		<!-- eslint-disable-next-line vue/require-component-is -->
		<component :is="type" :page="{ ...$page.folio }" />
	</Layout>
</template>

<page-query>
query Folio($path: String!) {
	folio(path: $path) {
		title
		subtitle
		content
		thumbnail
		thumbnailAlt
	}
}
</page-query>

<script>
import Layout from "~/layouts/Default.vue";
import About from "~/components/Page/Type/About.vue";

export default {
	components: {
		Layout,
	},
	metaInfo() {
		return {
			titleTemplate: ["%s", process.env.GRIDSOME_TITLE_TEMPLATE].join(
				" \\\\ ",
			),
			title: this.$page.folio.title,
			// description: this.$page.folio.subtitle,
		};
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
