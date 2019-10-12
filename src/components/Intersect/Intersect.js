// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from "vue";
import { observe, unobserve } from "./Observer";

const warn = msg => {
	if (!Vue.config.silent) {
		console.warn(msg);
	}
};

export default {
	name: "intersect",
	abstract: true,
	props: {
		threshold: {
			type: Array,
			required: false,
			default: () => [0, 0.2],
		},
		root: {
			type: HTMLElement,
			required: false,
			default: () => null,
		},
		rootMargin: {
			type: String,
			required: false,
			default: () => "0px 0px 0px 0px",
		},
	},
	mounted() {
		this.$nextTick(() => {
			if (this.$slots.default && this.$slots.default.length > 1) {
				warn(
					"[VueIntersect] You may only wrap one element in a <intersect> component.",
				);
			} else if (!this.$slots.default || this.$slots.default.length < 1) {
				warn(
					"[VueIntersect] You must have one child inside a <intersect> component.",
				);
				return;
			}

			observe(
				this.$slots.default[0].elm,
				intersected => {
					if (!intersected) {
						this.$emit("leave");
					} else {
						this.$emit("enter");
					}
					this.$emit("change");
				},
				{
					threshold: this.threshold,
					root: this.root,
					rootMargin: this.rootMargin,
				},
			);
		});
	},
	destroyed() {
		unobserve(this.$slots.default[0].elm);
	},
	render() {
		return this.$slots.default ? this.$slots.default[0] : null;
	},
};
