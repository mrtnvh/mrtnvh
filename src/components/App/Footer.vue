<template>
	<footer class="container">
		<div class="copyright">&copy; {{ yearNow }} Maarten Van Hoof</div>
		<div class="buildwith">
			Build with
			<a href="https://gridsome.org/" rel="noopener" target="_blank"
				>Gridsome</a
			>. Hosted on
			<a href="https://www.netlify.com/" rel="noopener" target="_blank"
				>Netlify</a
			>.
		</div>
		<div class="peace"><Peace /></div>
	</footer>
</template>

<script>
import Peace from "~/assets/images/peace.svg";

export default {
	components: {
		Peace,
	},
	computed: {
		yearNow() {
			const date = new Date();
			return date.getFullYear();
		},
	},
};
</script>

<style scoped>
footer {
	font-size: var(--font-size-sm);
	padding-top: var(--grid-gap-y);
	padding-bottom: var(--grid-gap-y);
	display: grid;
	align-items: center;

	@media (min-width: 800px) {
		grid-template-columns: 2fr 3.5fr 0.5fr;
		grid-template-rows: 1fr;
		align-items: end;
		font-size: var(--font-size-base);
	}
}

.copyright {
	@media (max-width: 799px) {
		grid-area: 1 / 1 / 1 / 5;
	}
}

.buildwith {
	@media (max-width: 799px) {
		grid-area: 2 / 1 / 2 / 5;
	}
}

.peace {
	justify-content: flex-end;
	display: flex;
	align-items: center;

	svg {
		height: 1rem;
	}

	@media (max-width: 799px) {
		grid-area: 1 / 6 / 3 / 6;
	}
}
</style>
