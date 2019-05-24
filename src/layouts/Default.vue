<template>
	<div class="layout">
		<app-header />
		<main>
			<slot />
		</main>
		<app-footer />
	</div>
</template>

<script>
import Header from "~/components/App/Header.vue";
import Footer from "~/components/App/Footer.vue";

export default {
	components: {
		AppHeader: Header,
		AppFooter: Footer,
	},
};
</script>

<style>
.layout {
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

main {
	flex-grow: 1;
}
</style>
