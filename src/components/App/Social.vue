<template>
	<nav :class="{ social: true, 'social--offCanvas': offCanvas }">
		<button class="reset link" @click="handleMailClick">
			<email />
		</button>
		<a
			v-for="{ to, name, icon } in links"
			:key="to"
			:href="to"
			:class="name"
			target="_blank"
			rel="noopener"
			:data-testid="`navigation-${name}`"
		>
			<!-- eslint-disable-next-line vue/require-component-is -->
			<component :is="icon" />
		</a>
	</nav>
</template>

<script>
import Email from "~/assets/images/email.svg?inline";
import Github from "~/assets/images/github.svg?inline";
import Twitter from "~/assets/images/twitter.svg?inline";
import LinkedIn from "~/assets/images/linkedin.svg?inline";

export default {
	components: {
		Email,
	},

	props: {
		offCanvas: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		links: [
			{
				name: "github",
				to: "https://github.com/vanhoofmaarten/",
				icon: Github,
			},
			{
				name: "twitter",
				to: "https://twitter.com/mrtnvh/",
				icon: Twitter,
			},
			{
				name: "linkedin",
				to: "https://www.linkedin.com/in/mrtnvh/",
				icon: LinkedIn,
			},
		],
	}),

	methods: {
		handleMailClick: () => {
			const mailLinkArray = ["mailto:", "info", "@", "mrtnvh", ".com"];
			window.location.href = mailLinkArray.join("");
		},
	},
};
</script>

<style scoped>
.social {
	&.social--offCanvas {
		padding: var(--grid-gap-y) 0;
	}
}

button.link,
a {
	line-height: 0;
	margin: calc(var(--space) / 2) calc(var(--space));
}

svg {
	height: var(--font-size-base);

	.social--offCanvas & {
		height: var(--font-size-lg);
	}
}
</style>
