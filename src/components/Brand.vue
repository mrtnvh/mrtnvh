<template>
	<g-link :class="{ desktop: $eq.desktop }" to="/" class="brand">
		<div class="name firstname">Maarten</div>
		<div class="name lastname">Van Hoof</div>
	</g-link>
</template>

<script>
export default {
	eq: {
		breakpoints: {
			desktop: { minWidth: 300 },
		},
	},
};
</script>

<style scoped>
.brand {
	--brand-font-size: 5vw;
	--firstname-z-index: 2;
	--firstname-letter-spacing: 0.25vw;
	--lastname-z-index: 1;
	--brand-animation-constant: 10%;

	color: var(--headings-color);
	font-family: var(--headings-font-family);
	font-size: var(--brand-font-size);
	font-weight: var(--headings-font-weight);
	position: relative;
	text-transform: uppercase;
	text-decoration: none;

	&::before,
	&::after {
		display: none;
	}

	@media (min-width: 950px) {
		--brand-font-size: 3.75rem;
	}
}

.name {
	white-space: nowrap;
	line-height: 1;
	transition: transform 0.33s;
	transition-timing-function: var(--animation-timing-function);
}

.firstname {
	position: relative;
	z-index: var(--firstname-z-index);
	letter-spacing: var(--firstname-letter-spacing);
	transform: translate(0, -25%);

	.brand:hover &,
	.brand:focus & {
		transform: translate(
			calc(var(--brand-animation-constant) * 0),
			calc(var(--brand-animation-constant) * -3.75)
		);
	}
}

.lastname {
	position: absolute;
	top: 0;
	left: 1%;
	z-index: var(--lastname-z-index);
	color: transparent;
	-webkit-text-stroke: var(--stroke-width) var(--stroke-color);
	transform: translate(
		calc(var(--brand-animation-constant) * 1),
		calc(var(--brand-animation-constant) * 3)
	);

	.brand:hover &,
	.brand:focus & {
		transform: translate(0, calc(var(--brand-animation-constant) * 5));
	}
}
</style>
