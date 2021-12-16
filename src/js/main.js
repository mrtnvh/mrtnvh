import Swup from "swup";
import SwupPreloadPlugin from "@swup/preload-plugin";
import SwupHeadPlugin from "@swup/head-plugin";
import { setImagesSizes } from "./setImagesSizes.js";

function init() {
	setImagesSizes();
}

const swup = new Swup({
	plugins: [new SwupPreloadPlugin(), new SwupHeadPlugin()],
});

window.plausible =
	window.plausible ||
	// eslint-disable-next-line func-names
	function () {
		// eslint-disable-next-line prefer-rest-params
		(window.plausible.q = window.plausible.q || []).push(arguments);
	};

swup.on("contentReplaced", init);
swup.on("pageView", () => {
	window.plausible("pageview");
});

init();
