<template>
	<transition name="fade" appear>
		<Layout>
			<transition name="fade" mode="out-in">
				<router-view class="fade-short" />
			</transition>
		</Layout>
	</transition>
</template>

<script>
import Layout from "~/layouts/Default.vue";
import Seo from "./lib/Seo";

export default {
	metaInfo() {
		return Seo({ path: this.$route.path });
	},
	components: {
		Layout,
	},
};
</script>

<style scoped>
.fade-short {
	transition-duration: 0.5s;
}
</style>
