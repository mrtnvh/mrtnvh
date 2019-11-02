/* eslint-disable no-param-reassign */
import VueElementQuery from "vue-element-query";
import VuePortal from "portal-vue";
import DefaultLayout from "./layouts/Default.vue";
import "normalize.css";
import "./assets/styles/app.css";

export default function(Vue) {
	/**
	 * Layout
	 */
	Vue.component("Layout", DefaultLayout);

	/**
	 * Plugins
	 */
	Vue.use(VueElementQuery);
	Vue.use(VuePortal);
}
