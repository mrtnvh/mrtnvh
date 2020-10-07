<template>
	<article id="default_page" class="container">
		<header>
			<div class="sticky">
				<h1 class="title outline">{{ page.title }}</h1>
				<div class="subtitle">{{ page.subtitle }}</div>
			</div>
		</header>
		<nuxt-content :class="['body']" :document="page" />
	</article>
</template>

<script>
import mixins from "./mixins";

export default {
	mixins: [mixins],
};
</script>

<style scoped>
.container {
	padding-top: var(--grid-gap-y);
	padding-bottom: var(--grid-gap-y);
	display: flex;
	flex-direction: column;
}
</style>
