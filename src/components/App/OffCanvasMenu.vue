<template>
	<div>
		<button class="reset link menu-toggle" @click="open = !open">
			<template v-if="!open">
				Menu
			</template>
			<template v-else>
				Close
			</template>
		</button>
		<Portal to="root">
			<div v-if="open" :class="$style.offCanvasMenu">
				<Nav class="nav" off-canvas />
				<Social class="social" off-canvas />
			</div>
		</Portal>
	</div>
</template>

<script>
import Nav from "~/components/App/Nav.vue";
import Social from "~/components/App/Social.vue";

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

<style module>
.offCanvasMenu {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex-grow: 1;
	top: calc(var(--project-header-top-position) * 2.5);
	left: 0;
	width: 100%;
	bottom: 0;
	background: var(--light);
	z-index: 100;
	position: fixed;
	border-top: 1px solid var(--grey);
}
</style>
