<template>
	<transition-group
		:class="{ nav: true, 'nav--offCanvas': offCanvas }"
		:name="offCanvas ? 'slide-up-fade' : ''"
		tag="nav"
		appear
	>
		<nuxt-link
			v-for="(link, index) in links"
			:key="link.title"
			:to="link.to"
			:style="animationDelay(index)"
			:exact="link.to === '/'"
		>
			{{ link.title }}
		</nuxt-link>
	</transition-group>
</template>

<script>
import AnimationMixin from "~/components/Animation/AnimationMixin";

export default {
	mixins: [AnimationMixin],

	props: {
		offCanvas: {
			type: Boolean,
			default: false,
		},
	},

	data: () => ({
		links: [
			{
				to: "/",
				title: "Home",
			},
			{
				to: "/projects",
				title: "Projects",
			},
			{
				to: "/talks",
				title: "Talks",
			},
			{
				to: "/about",
				title: "About me",
			},
		],
	}),
};
</script>

<style scoped>
.nav {
	a {
		white-space: nowrap;
	}

	&.nav--offCanvas {
		font-size: var(--font-size-3xl);
		font-family: var(--headings-font-family);
		font-weight: var(--headings-font-weight);
		text-transform: uppercase;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex-grow: 1;

		a {
			text-decoration: none;
		}
	}
}
</style>
