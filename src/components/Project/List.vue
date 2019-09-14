<template>
	<div class="grid">
		<article v-for="project in value" :key="project.id">
			<g-link :to="project.path" class="reset link">
				<figure class="media">
					<g-image
						:src="project.thumbnail"
						:alt="project.title"
						class="thumbnail"
					/>
				</figure>
				<div class="content">
					<h1 class="title outline">
						{{ project.title }}
					</h1>
					<h2 class="subtitle">{{ project.subtitle }}</h2>
				</div>
			</g-link>
		</article>
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
	grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	grid-gap: calc(var(--grid-gap) * 2) var(--grid-gap);
}

.thumbnail {
	width: 100%;
}

.link {
	--link-color: var(--dark);
	--link-hover-color: var(--dark);
	--link-text-decoration: none;
}

.content {
	margin-top: calc(var(--space) * -2.25);
	padding: 0 calc(var(--grid-gap) / 1.5);
}

.title {
	text-transform: uppercase;
	margin: 0;
}

.subtitle {
	font-size: var(--font-size-lg);
	font-weight: 400;
	margin: 0;
}
</style>
