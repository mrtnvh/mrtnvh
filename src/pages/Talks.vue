<template>
	<div class="container">
		<h1 :class="['title', 'outline']">
			Talks
		</h1>
		<List :value="list" large />
	</div>
</template>

<script>
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

	data: () => ({
		list: [
			{
				title: "Why OpenAPI",
				subtitle: "Dutch version - Tech Tuesdays",
				thumbnail:
					"https://res.cloudinary.com/mrtnvh/image/upload/v1589461696/mrtnvh.com/mrtnvh-play.jpg",
				color: "#000",
				path: "https://youtu.be/lLfgrt-_8sE",
			},
			{
				title: "OpenAPI + Testing",
				subtitle: "Ministry of Testing Eindhoven",
				thumbnail:
					"https://res.cloudinary.com/mrtnvh/image/upload/v1572982689/mrtnvh.com/mot-eindhoven.jpg",
				color: "#000",
				path: "https://mot.mrtnvh.com",
			},
		],
	}),
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
</style>
