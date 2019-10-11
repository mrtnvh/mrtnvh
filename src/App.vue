<template>
	<Layout>
		<transition name="fade" mode="out-in">
			<router-view />
		</transition>
	</Layout>
</template>

<script>
import Layout from "~/layouts/Default.vue";

export default {
	components: {
		Layout,
	},
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.15s;
	opacity: 1;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
