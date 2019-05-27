<template>
	<nav class="header container">
		<brand />
		<div>
			<span>Front-end developer at </span>
			<a href="https://isaac.nl" target="_blank" rel="noopener">ISAAC</a>
			<span> in Eindhoven</span>
		</div>
		<div>
			<a href="/">About me</a>
		</div>
		<div class="social">
			<button @click="handleMailClick" class="reset link"><email /></button>
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
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-top: calc(var(--space) * 2);
	padding-bottom: calc(var(--space) * 2);

	@media (min-width: 1400px) {
		display: grid;
		grid-template-columns: 2fr 2fr 1fr 1fr;
		grid-column-gap: var(--grid-gap);
	}
}

.social {
	display: flex;
	justify-content: flex-end;

	a {
		margin-left: var(--grid-gap);
	}
}

.nav__link {
	margin-left: 20px;
}
</style>
