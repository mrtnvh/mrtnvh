<template>
	<div class="container">
		<h1 class="title">404</h1>
		<p>Page not found.</p>
	</div>
</template>

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
