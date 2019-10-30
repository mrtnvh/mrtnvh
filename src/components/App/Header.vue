<template>
	<nav class="header container">
		<brand class="brand" />
		<div class="subtitle">
			<transition name="slide-up-fade">
				<div v-if="!isHomepage">
					<span class="mr-space">Front-end developer at</span>
					<span class="whitespace-nowrap">
						<a
							href="https://isaac.nl"
							target="_blank"
							rel="noopener"
							class="isaac mr-space"
							>ISAAC</a
						>in Eindhoven.</span
					>
				</div>
			</transition>
		</div>
		<div v-if="!$eq.small" class="navs">
			<Nav class="nav" />
			<Social class="social" />
		</div>
		<OffCanvasMenu v-else class="offCanvasMenu" />
	</nav>
</template>

<script>
import Brand from "~/components/Brand.vue";
import OffCanvasMenu from "~/components/App/OffCanvasMenu";
import Nav from "~/components/App/Nav";
import Social from "~/components/App/Social";

export default {
	components: {
		Brand,
		OffCanvasMenu,
		Nav,
		Social,
	},
	computed: {
		isHomepage() {
			return this.$route.path === "/";
		},
	},
	eq: {
		breakpoints: {
			small: { maxWidth: 499 },
		},
	},
};
</script>

<style scoped>
.header {
	display: grid;
	align-items: center;
	padding-top: var(--grid-gap-y);
	padding-bottom: var(--grid-gap-y);
	font-size: var(--font-size-sm);
	grid-column-gap: var(--grid-gap-x);
	border-bottom: 1px solid var(--grey);

	@media (min-width: 800px) {
		font-size: var(--font-size-base);
		grid-template-columns: 2fr 4fr;
		grid-template-rows: 1fr 1.5fr;
	}

	@media (min-width: 1400px) {
		display: grid;
		grid-template-columns: 3.2fr 3fr 3fr;
		grid-column-gap: var(--grid-gap-x);
		grid-template-rows: 1fr;
		align-items: end;
	}
}

.brand {
	grid-area: 1 / 1 / 3 / 2;
	margin-left: calc(var(--space) / -3);

	@media (min-width: 1400px) {
		grid-area: 1 / 1 / 3 / 3;
	}

	@media (min-width: 1400px) {
		margin-top: 0;
	}
}

.subtitle {
	grid-area: 1 / 2 / 1 / 3;

	/* @media (min-width: 500px) {
		grid-area: 1 / 3 / 1 / 3;
	} */

	@media (min-width: 1400px) {
		grid-area: 1 / 2/ 1 / 2;
	}
}

.offCanvasMenu {
	grid-area: 1 / 3 / 1 / 3;
	text-align: right;
}

.navs {
	grid-area: 2 / 2 / 2 / 3;
	display: grid;
	grid-auto-flow: row;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: var(--grid-gap-x);
	align-items: center;

	@media (min-width: 1400px) {
		grid-area: 1 / 3 / 1 / 3;
	}
}

.nav {
	display: grid;
	grid-auto-flow: row;
	grid-template-columns: repeat(3, max-content);
	grid-gap: var(--space);
}

.social {
	display: flex;
	justify-content: flex-end;
}

.brand,
.subtitle,
.nav,
.social {
	position: relative;
	z-index: 1;

	@media (min-width: 1400px) {
		grid-area: auto;
		align-self: auto;
	}
}
</style>
