<template>
	<div class="container">
		<h1 :class="['title', 'outline']">Talks</h1>
		<List :value="talks" large />
	</div>
</template>

<script>
import { format } from "date-fns";
import List from "~/components/List/List.vue";

export default {
	metaInfo() {
		return {
			title: "Talks",
			meta: [
				{
					key: "description",
					name: "description",
					content:
						"Sometimes, I'll get on a stage and talk about the stuff I like. Like rocking out, but with less noise. Afterwards, I'll post my slides here.",
				},
			],
		};
	},

	components: {
		List,
	},

	async asyncData({ $content }) {
		const dateNow = format(new Date(), "yyyyMMdd");
		const talks = await $content("talks")
			.where({ datePublished: { $lte: dateNow } })
			.sortBy("datePublished", "desc")
			.fetch();
		return { talks };
	},
};
</script>

<style scoped>
.container {
	padding-top: var(--grid-gap-y);
	padding-bottom: var(--grid-gap-y);
}

.title {
	font-size: var(--folio-title-size);
	text-transform: uppercase;
	line-height: 0.75em;
	margin-bottom: var(--grid-gap-y);
}

.container >>> img {
	@media (prefers-color-scheme: dark) {
		filter: invert(1) hue-rotate(180deg);
	}
}
</style>
