<template>
	<div class="layout">
		<app-header />
		<main v-show="!portalContent">
			<Nuxt />
		</main>
		<app-footer v-show="!portalContent" />
		<PortalTarget name="root" class="portal" @change="handlePortalUpdate" />
	</div>
</template>

<script>
import Seo from "~/lib/Seo";
import pkg from "../../package.json";
import Header from "~/components/App/Header.vue";
import Footer from "~/components/App/Footer.vue";

export default {
	components: {
		AppHeader: Header,
		AppFooter: Footer,
	},
	data() {
		return {
			portalContent: false,
		};
	},
	head() {
		return Seo({ siteUrl: pkg.homepage });
	},
	methods: {
		handlePortalUpdate(newContent) {
			this.portalContent = newContent;
		},
	},
};
</script>

<style>
.layout {
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

main {
	display: flex !important;
	flex-direction: column;
}

main,
.portal {
	flex-grow: 1;
}

.portal {
	display: flex;
	flex-direction: column;
	overflow: hidden;

	&:empty {
		display: none;
	}
}
</style>
