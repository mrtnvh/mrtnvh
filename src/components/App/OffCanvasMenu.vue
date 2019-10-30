<template>
	<div>
		<button @click="open = !open" class="reset link menu-toggle">
			<template v-if="!open">
				Menu
			</template>
			<template v-else>
				Close
			</template>
		</button>
		<Portal to="root">
			<div v-if="open" class="offCanvasMenu">
				<Nav class="nav" off-canvas />
				<Social class="social" off-canvas />
			</div>
		</Portal>
	</div>
</template>

<script>
import Nav from "~/components/App/Nav";
import Social from "~/components/App/Social";

export default {
	components: { Social, Nav },
	data: () => ({
		open: false,
	}),
	created() {
		this.$router.afterEach(() => {
			this.open = false;
		});
	},
};
</script>

<style scoped>
.offCanvasMenu {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex-grow: 1;
}
</style>
