<template>
	<div class="grid">
		<article v-for="project in value" :key="project.id">
			<g-link :to="project.path" class="reset link">
				<figure class="media">
					<g-image
						:src="project.thumbnail"
						:alt="project.title"
						class="image"
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
	grid-gap: var(--grid-gap-y) var(--grid-gap-x);
}

.media {
	margin-bottom: 0;
}

.link {
	--link-color: var(--dark);
	--link-hover-color: var(--dark);
	--link-text-decoration: none;

	display: block;
}

.content {
	position: relative;
	z-index: 1;
	margin-top: calc(var(--space) * -2);
	padding: 0 calc(var(--space) * 1.5);
}

.title {
	text-transform: uppercase;
	margin: 0;
}

.subtitle {
	font-size: var(--font-size-base);
	font-weight: 400;
	margin: 0;
}
</style>
