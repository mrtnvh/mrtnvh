/* eslint-disable no-param-reassign */
import VuePortal from "portal-vue";
import VueElementQuery from "./lib/ElementQuery";
import DefaultLayout from "./layouts/Default.vue";
import "normalize.css";
import "./assets/styles/app.css";

export default (Vue, { router }) => {
	/**
	 * Layout
	 */
	Vue.component("Layout", DefaultLayout);

	/**
	 * Plugins
	 */
	Vue.use(VueElementQuery);
	Vue.use(VuePortal);

	/**
	 * Performance tracking
	 */
	if (typeof window !== "undefined") {
		import("./lib/PerformanceTracking").then(
			({ default: PerformanceTracking }) => {
				PerformanceTracking(Vue.$ga, router);
			},
		);
	}
};
