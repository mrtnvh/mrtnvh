<template>
	<nav class="header container">
		<brand class="brand" />
		<div class="subtitle">
			<span>Front-end developer at </span>
			<a
				href="https://isaac.nl"
				target="_blank"
				rel="noopener"
				class="isaac"
				>ISAAC</a
			>
			<span> in Eindhoven</span>
		</div>
		<div class="about">
			<g-link to="/about">About me</g-link>
		</div>
		<div class="social">
			<button @click="handleMailClick" class="reset link">
				<email />
			</button>
			<a href="/" class="github"><github /></a>
			<a href="/" class="twitter"><twitter /></a>
		</div>
	</nav>
</template>

<script>
import Brand from "~/components/Brand.vue";
import Email from "~/assets/images/email.svg";
import Github from "~/assets/images/github.svg";
import Twitter from "~/assets/images/twitter.svg";

export default {
	components: {
		Brand,
		Email,
		Github,
		Twitter,
	},
	methods: {
		handleMailClick: () => {
			const mailLinkArray = ["mailto:", "info", "@", "mrtnvh", ".com"];
			window.location.href = mailLinkArray.join("");
		},
	},
};
</script>

<style scoped>
.header {
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-template-rows: 1fr 1.5fr;
	align-items: center;
	padding-top: var(--grid-gap-y);
	padding-bottom: var(--grid-gap-y);
	font-size: var(--font-size-sm);
	grid-column-gap: var(--grid-gap-x);
	border-bottom: 1px solid var(--grey);

	@media (min-width: 800px) {
		font-size: var(--font-size-base);
	}

	@media (min-width: 1400px) {
		display: grid;
		grid-template-columns: 2fr 2.125fr 0.875fr 1fr;
		grid-template-rows: 1fr;
		align-items: end;
	}
}

.brand {
	grid-area: 1 / 1 / 3 / 3;
	margin-top: calc(var(--space) / -3);

	@media (min-width: 1400px) {
		margin-top: 0;
	}
}

.subtitle {
	grid-area: 1 / 3 / 2 / 7;
	align-self: end;
}

.about {
	grid-area: 2 / 3 / 3 / 5;
}

.social {
	display: flex;
	justify-content: flex-end;
	grid-area: 2 / 5 / 3 / 7;

	button,
	a {
		line-height: 0;
		margin: calc(var(--space) / 2) calc(var(--space));
	}
}

.brand,
.subtitle,
.about,
.social {
	@media (min-width: 1400px) {
		grid-area: auto;
		align-self: auto;
	}
}
</style>
