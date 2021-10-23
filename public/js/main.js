import Swup from "swup";
import SwupPreloadPlugin from "@swup/preload-plugin";
import { setImagesSizes } from "./setImagesSizes";

function init() {
	setImagesSizes();
}

const swup = new Swup({
	plugins: [new SwupPreloadPlugin()],
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
