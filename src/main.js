// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import VueElementQuery from "vue-element-query";

import DefaultLayout from "./layouts/Default.vue";
import "./assets/styles/app.css";

export default function(Vue /* , { router, head, isClient } */) {
	// Set default layout as a global component
	Vue.component("Layout", DefaultLayout);
	Vue.use(VueElementQuery);
}
