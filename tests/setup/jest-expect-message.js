// https://github.com/mattphillips/jest-expect-message/pull/40

class JestAssertionError extends Error {
	constructor(result, callsite) {
		super(
			typeof result.message === "function"
				? result.message()
				: result.message,
		);
		this.matcherResult = result;

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, callsite);
		}
	}
}

const wrapMatcher = (matcher, customMessage) => {
	const newMatcher = (...args) => {
		try {
			return matcher(...args);
		} catch (error) {
			if (!error.matcherResult) {
				throw error;
			}
			const { matcherResult } = error;

			if (typeof customMessage !== "string" || customMessage.length < 1) {
				throw new JestAssertionError(matcherResult, newMatcher);
			}

			const matcherMessage =
				typeof error.matcherResult.message === "function"
					? error.matcherResult.message()
					: error.matcherResult.message;

			const message = () => `${customMessage}\n\n${matcherMessage}`;

			throw new JestAssertionError(
				{ ...matcherResult, message },
				newMatcher,
			);
		}
	};
	return newMatcher;
};

const wrapMatchers = (matchers, customMessage) => {
	return Object.keys(matchers).reduce((acc, name) => {
		const matcher = matchers[name];

		if (typeof matcher === "function") {
			return {
				...acc,
				[name]: wrapMatcher(matcher, customMessage),
			};
		}

		return {
			...acc,
			[name]: wrapMatchers(matcher, customMessage), // recurse on .not/.resolves/.rejects
		};
	}, {});
};

module.exports = (expect) => {
	// proxy the expect function
	let expectProxy = Object.assign(
		(actual, customMessage) => wrapMatchers(expect(actual), customMessage), // partially apply expect to get all matchers and chain them
		expect, // clone additional properties on expect
	);

	expectProxy.extend = (o) => {
		expect.extend(o); // add new matchers to expect
		expectProxy = Object.assign(expectProxy, expect); // clone new asymmetric matchers
	};

	return expectProxy;
};
