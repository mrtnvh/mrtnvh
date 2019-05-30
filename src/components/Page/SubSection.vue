<template>
	<div class="subsection">
		<div class="header">
			<h3 v-if="title" class="title">{{ title }}</h3>
		</div>
		<div class="content">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: "",
		},
	},
};
</script>

<style scoped>
.subsection {
	position: relative;

	@media (min-width: 800px) {
		display: grid;
		grid-template-columns: 2fr 2fr 1fr 1fr;
		grid-column-gap: var(--grid-gap);
	}
}

.content {
	grid-area: auto / 2 / auto / 5;
}

.title {
	position: sticky;
	top: 3rem;
	margin-top: 3rem;
}
</style>
