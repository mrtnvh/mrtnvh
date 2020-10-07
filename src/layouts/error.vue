<template>
	<div class="container">
		<h1 class="title">
			<template v-if="error.statusCode === 404">Page not found</template>
			<template v-else>An error occurred </template>
		</h1>
		<nuxt-link to="/">Go to homepage</nuxt-link>
	</div>
</template>

<script>
export default {
	props: { error: { required: true, type: Object } },
};
</script>

<style scoped>
.container {
	padding-top: var(--grid-gap-y);
	padding-bottom: var(--grid-gap-y);
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex-grow: 1;
}
.title {
	font-size: var(--folio-title-size);
	text-transform: uppercase;
	line-height: 0.75em;
	display: inline-block;
}
</style>
