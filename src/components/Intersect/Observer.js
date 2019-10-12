import invariant from "tiny-invariant";

var INSTANCE_MAP = new Map();
var OBSERVER_MAP = new Map();
var ROOT_IDS = new Map();
var consecutiveRootId = 0;

/**
 * Generate a unique ID for the root element
 * @param root
 */

function getRootId(root) {
	if (!root) return "";
	if (ROOT_IDS.has(root)) return ROOT_IDS.get(root);
	consecutiveRootId += 1;
	ROOT_IDS.set(root, consecutiveRootId.toString());
	return ROOT_IDS.get(root) + "_";
}

/**
 * Monitor element, and trigger callback when element becomes inView
 * @param element {HTMLElement}
 * @param callback {Function} Called with inView
 * @param options {Object} InterSection observer options
 * @param options.threshold {Number} Number between 0 and 1, indicating how much of the element should be inView before triggering
 * @param options.root {HTMLElement}
 * @param options.rootMargin {String} The CSS margin to apply to the root element.
 */
export function observe(element, callback, options) {
	if (options === void 0) {
		options = {};
	}

	// IntersectionObserver needs a threshold to trigger, so set it to 0 if it's not defined.
	// Modify the options object, since it's used in the onChange handler.
	if (!options.threshold) options.threshold = 0;
	var _options = options,
		root = _options.root,
		rootMargin = _options.rootMargin,
		threshold = _options.threshold; // Validate that the element is not being used in another <Observer />

	invariant(
		!INSTANCE_MAP.has(element),
		"react-intersection-observer: Trying to observe %s, but it's already being observed by another instance.\nMake sure the `ref` is only used by a single <Observer /> instance.\n\n%s",
		element,
	);
	/* istanbul ignore if */

	if (!element) return; // Create a unique ID for this observer instance, based on the root, root margin and threshold.
	// An observer with the same options can be reused, so lets use this fact

	var observerId =
		getRootId(root) +
		(rootMargin
			? threshold.toString() + "_" + rootMargin
			: threshold.toString());
	var observerInstance = OBSERVER_MAP.get(observerId);

	if (!observerInstance) {
		observerInstance = new IntersectionObserver(onChange, options);
		/* istanbul ignore else  */

		if (observerId) OBSERVER_MAP.set(observerId, observerInstance);
	}

	var instance = {
		callback: callback,
		element: element,
		inView: false,
		observerId: observerId,
		observer: observerInstance,
		// Make sure we have the thresholds value. It's undefined on a browser like Chrome 51.
		thresholds:
			observerInstance.thresholds ||
			(Array.isArray(threshold) ? threshold : [threshold]),
	};
	INSTANCE_MAP.set(element, instance);
	observerInstance.observe(element);
	return instance;
}

/**
 * Stop observing an element. If an element is removed from the DOM or otherwise destroyed,
 * make sure to call this method.
 * @param element {Element}
 */
export function unobserve(element) {
	if (!element) return;
	var instance = INSTANCE_MAP.get(element);

	if (instance) {
		var observerId = instance.observerId,
			observer = instance.observer;
		var root = observer.root;
		observer.unobserve(element); // Check if we are still observing any elements with the same threshold.

		var itemsLeft = false; // Check if we still have observers configured with the same root.

		var rootObserved = false;
		/* istanbul ignore else  */

		if (observerId) {
			INSTANCE_MAP.forEach(function(item, key) {
				if (key !== element) {
					if (item.observerId === observerId) {
						itemsLeft = true;
						rootObserved = true;
					}

					if (item.observer.root === root) {
						rootObserved = true;
					}
				}
			});
		}

		if (!rootObserved && root) ROOT_IDS["delete"](root);

		if (observer && !itemsLeft) {
			// No more elements to observe for threshold, disconnect observer
			observer.disconnect();
		} // Remove reference to element

		INSTANCE_MAP["delete"](element);
	}
}

function onChange(changes) {
	changes.forEach(function(intersection) {
		var isIntersecting = intersection.isIntersecting,
			intersectionRatio = intersection.intersectionRatio,
			target = intersection.target;
		var instance = INSTANCE_MAP.get(target); // Firefox can report a negative intersectionRatio when scrolling.

		if (instance && intersectionRatio >= 0) {
			// If threshold is an array, check if any of them intersects. This just triggers the onChange event multiple times.
			var inView = instance.thresholds.some(function(threshold) {
				return instance.inView
					? intersectionRatio > threshold
					: intersectionRatio >= threshold;
			});

			if (isIntersecting !== undefined) {
				// If isIntersecting is defined, ensure that the element is actually intersecting.
				// Otherwise it reports a threshold of 0
				inView = inView && isIntersecting;
			}

			instance.inView = inView;
			instance.callback(inView, intersection);
		}
	});
}
