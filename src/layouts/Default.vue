<template>
	<div class="layout">
		<header class="header">
			<brand />
			<nav class="nav">Social link</nav>
			<nav class="nav">Social link</nav>
			<nav class="nav">Social link</nav>
		</header>
		<main>
			<slot />
		</main>
		<footer>
			&copy; Maarten Van Hoof
		</footer>
	</div>
</template>

<script>
import Brand from "~/components/Brand.vue";

export default {
	components: {
		Brand,
	},
};
</script>

<style>
body {
	font-family: var(--font-family);
	color: var(--dark);
	background: var(--light);
	margin: 0;
	padding: 0;
	line-height: var(--line-height);
}

.layout {
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 var(--space);
}

main {
	flex-grow: 1;
}

.nav__link {
	margin-left: 20px;
}
</style>
