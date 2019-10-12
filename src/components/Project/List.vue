<template>
	<div class="grid">
		<ListItem
			:value="project"
			:index="index"
			v-for="(project, index) in value"
			:key="project.id"
		/>
	</div>
</template>

<script>
import ListItem from "./ListItem";

export default {
	components: {
		ListItem,
	},

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
</style>
