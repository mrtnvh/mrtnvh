<template>
	<section class="container">
		<h2 v-if="title" class="title">{{ title }}</h2>
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
	},
};
</script>

<style scoped>
.title {
	position: sticky;
	top: 3rem;
	margin-bottom: -3rem;
}
</style>
