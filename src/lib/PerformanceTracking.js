import Perfume from "perfume.js";

const perfume = ($ga) =>
	new Perfume({
		analyticsTracker: (options) => {
			const { metricName, data } = options;
			switch (metricName) {
				case "navigationTiming":
					if (data && data.timeToFirstByte) {
						$ga.event({
							eventCategory: "performance",
							eventAction: "navigationTiming",
							eventValue: data,
						});
					}
					break;
				case "networkInformation":
					if (data && data.effectiveType) {
						$ga.event({
							eventCategory: "performance",
							eventAction: "networkInformation",
							eventValue: data,
						});
					}
					break;
				case "storageEstimate":
					$ga.event({
						eventCategory: "performance",
						eventAction: "storageEstimate",
						eventValue: data,
					});
					break;
				case "fp":
					$ga.event({
						eventCategory: "performance",
						eventAction: "networkInformation",
						eventLabel: "duration",
						eventValue: data,
					});
					break;
				case "fcp":
					$ga.event({
						eventCategory: "performance",
						eventAction: "firstContentfulPaint",
						eventLabel: "duration",
						eventValue: data,
					});
					break;
				case "fid":
					$ga.event({
						eventCategory: "performance",
						eventAction: "firstInputDelay",
						eventLabel: "duration",
						eventValue: data,
					});
					break;
				case "lcp":
					$ga.event({
						eventCategory: "performance",
						eventAction: "largestContentfulPaint",
						eventLabel: "duration",
						eventValue: data,
					});
					break;
				case "lcpFinal":
					$ga.event({
						eventCategory: "performance",
						eventAction: "largestContentfulPaintFinal",
						eventLabel: "duration",
						eventValue: data,
					});
					break;
				case "cls":
					$ga.event({
						eventCategory: "performance",
						eventAction: "cumulativeLayoutShift",
						eventValue: data,
					});
					break;
				case "clsFinal":
					$ga.event({
						eventCategory: "performance",
						eventAction: "cumulativeLayoutShiftFinal",
						eventValue: data,
					});
					break;
				case "tbt":
					$ga.event({
						eventCategory: "performance",
						eventAction: "totalBlockingTime",
						eventLabel: "duration",
						eventValue: data,
					});
					break;
				case "tbt5S":
					$ga.event({
						eventCategory: "performance",
						eventAction: "totalBlockingTime5S",
						eventLabel: "duration",
						eventValue: data,
					});
					break;
				case "tbt10S":
					$ga.event({
						eventCategory: "performance",
						eventAction: "totalBlockingTime10S",
						eventLabel: "duration",
						eventValue: data,
					});
					break;
				case "tbtFinal":
					$ga.event({
						eventCategory: "performance",
						eventAction: "totalBlockingTimeFinal",
						eventLabel: "duration",
						eventValue: data,
					});
					break;
				default:
					$ga.event({
						eventCategory: "performance",
						eventAction: metricName,
						eventLabel: "duration",
						eventValue: data,
					});
					break;
			}
		},
	});

export default ($ga, router) => {
	router.afterEach(() => {
		perfume($ga);
	});
};
