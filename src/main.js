/* eslint-disable no-param-reassign */
import VuePortal from "portal-vue";
import VueElementQuery from "./lib/ElementQuery";
import PerformanceTracking from "./lib/PerformanceTracking";
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
	PerformanceTracking(Vue.$ga, router);
};
