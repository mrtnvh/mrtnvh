<template>
	<section class="container">
		<div class="header clear-inner-spacing">
			<h2 v-if="title" :class="['title']">
				<span class="main outline">{{ title }}</span>
				<small>{{ titleSmall }}</small>
			</h2>
		</div>
		<slot />
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

	&:not(:last-child) {
		border-bottom: 1px solid var(--grey);
	}

	@media (min-width: 800px) {
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-column-gap: var(--grid-gap-x);
	}
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
