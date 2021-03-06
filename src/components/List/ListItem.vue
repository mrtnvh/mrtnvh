<template>
	<article>
		<component
			:is="
				value.redirect || value.path.startsWith('http')
					? 'a'
					: 'nuxt-link'
			"
			v-bind="{ ...link }"
			class="reset link"
		>
			<figure class="media">
				<Thumbnail
					:src="value.thumbnail"
					:alt="value.title"
					class="image"
					width="1600"
					height="900"
				/>
			</figure>
			<div class="content">
				<h1 class="title outline">
					{{ value.title }}
				</h1>
				<h2 class="subtitle">{{ value.subtitle }}</h2>
			</div>
		</component>
	</article>
</template>

<script>
import Image from "~/components/Image/Image.vue";

export default {
	components: {
		Thumbnail: Image,
	},

	props: {
		value: {
			type: Object,
			required: true,
		},
		index: {
			type: Number,
			default: 0,
		},
	},

	computed: {
		link() {
			if (this.value.redirect) {
				return {
					href: this.value.redirect,
					target: "_blank",
					rel: "nooopener",
				};
			}

			if (this.value.path.startsWith("http")) {
				return {
					href: this.value.path,
					target: "_blank",
					rel: "nooopener",
				};
			}

			return { to: this.value.path };
		},
	},
};
</script>

<style scoped>
article {
	max-width: 100%;
}

.media {
	margin-bottom: 0;
}

.link {
	--link-color: var(--text-color);
	--link-hover-color: var(--text-color);
	--link-text-decoration: none;

	display: block;

	&:hover,
	&:focus {
		--stroke-inner-color: var(--text-color);
		--stroke-color: var(--text-color);
	}
}

.content {
	position: relative;
	/* stylelint-disable-next-line */
	z-index: 1;
	margin-top: calc(var(--space) * -1.375);
	padding: 0 calc(var(--space) * 1.5);
}

.title {
	text-transform: uppercase;
	margin: 0 0 0.5rem 0;
	line-height: 0.85em;
}

.subtitle {
	font-size: var(--font-size-base);
	font-weight: 400;
	margin: 0;
}
</style>
