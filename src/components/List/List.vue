<template>
	<div :class="{ grid: true, 'grid--large': large }">
		<ListItem
			:value="item"
			:index="index + 1"
			v-for="(item, index) in value"
			:key="item.id || item.title"
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

		large: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style scoped>
.grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
	grid-gap: var(--grid-gap-y) var(--grid-gap-x);

	@media (min-width: 450px) {
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
	}

	&.grid--large {
		@media (min-width: 900px) {
			grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
		}
	}
}
</style>
