<template>
	<section class="container">
		<div class="header clear-inner-spacing">
			<h2 v-if="title" class="title">
				<span class="main outline">{{ title }}</span>
				<small>{{ titleSmall }}</small>
			</h2>
		</div>
		<div class="content">
			<slot />
		</div>
	</section>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: "",
		},
		titleSmall: {
			type: String,
			default: "",
		},
	},
};
</script>

<style scoped>
section {
	position: relative;
	padding-top: var(--grid-gap-y);
	padding-bottom: var(--grid-gap-y);
	border-bottom: 1px solid var(--grey);

	@media (min-width: 800px) {
		display: grid;
		grid-template-columns: 2fr 2fr 1fr 1fr;
		grid-column-gap: var(--grid-gap-x);
	}
}

.content {
	grid-area: auto / 2 / auto / 5;
}

.title {
	position: sticky;
	top: 3rem;

	.main,
	small {
		display: block;
	}

	.main {
		margin-bottom: calc(var(--space) / 2);
	}

	small {
		font-size: var(--font-size-sm);
		font-weight: 800;
		letter-spacing: 0.5px;
		text-transform: uppercase;
	}
}
</style>
