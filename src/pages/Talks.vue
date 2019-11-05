<template>
	<intersect @enter="intersected = true" @leave="intersected = false">
		<div class="container">
			<h1
				:class="['title', 'outline', ...slideUpFadeClass]"
				:style="animationDelay(1)"
			>
				Talks
			</h1>
			<List :value="list" large />
		</div>
	</intersect>
</template>

<script>
import IntersectMixin from "~/components/Intersect/IntersectMixin";
import AnimationMixin from "~/components/Animation/AnimationMixin";
import List from "~/components/List/List";

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

	mixins: [IntersectMixin, AnimationMixin],

	data: () => ({
		list: [
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

	computed: {
		slideUpFadeClass() {
			return [
				`slide-up-fade`,
				`slide-up-fade-${this.intersected ? "active" : "inactive"}`,
			];
		},
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
</style>
