export default {
	methods: {
		animationDelay: (index) => ({
			transitionDelay: `calc(0.1s * ${index})`,
		}),
	},
};
