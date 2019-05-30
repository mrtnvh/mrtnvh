<template>
	<div class="grid">
		<g-link
			v-for="project in value"
			:key="project.id"
			:to="project.path"
			class="reset"
		>
			<figure class="media">
				<g-image
					:src="project.thumbnail"
					:alt="project.title"
					class="thumbnail"
				/>
			</figure>
			<div class="title">
				{{ project.title }}
			</div>
		</g-link>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: Array,
			required: true,
		},
	},
};
</script>

<style scoped>
.grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	grid-gap: var(--grid-gap);
}

.thumbnail {
	width: 100%;
}
</style>
