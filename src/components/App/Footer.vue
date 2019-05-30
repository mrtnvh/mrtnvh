<template>
	<footer class="container">
		&copy; Maarten Van Hoof
	</footer>
</template>

<script>
export default {};
</script>

<style scoped>
footer {
	font-size: var(--font-size-sm);
	padding-top: calc(var(--grid-gap));
	padding-bottom: calc(var(--grid-gap));

	@media (min-width: 800px) {
		font-size: var(--font-size-base);
	}
}
</style>
