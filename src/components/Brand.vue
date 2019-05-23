<template>
	<g-link to="/" class="brand">
		<div class="name firstname">Maarten</div>
		<div class="name lastname">Van Hoof</div>
	</g-link>
</template>

<script>
export default {};
</script>

<style scoped>
.brand {
	--brand-font-size: 4.5rem;
	--firstname-z-index: 2;
	--lastname-z-index: 1;
	--brand-animation-constant: 0.75rem;

	color: var(--headings-color);
	font-family: var(--headings-font-family);
	font-size: var(--brand-font-size);
	font-weight: var(--headings-font-weight);
	position: relative;
	text-transform: uppercase;
	text-decoration: none;
}

.name {
	white-space: nowrap;
	line-height: 1;
	transition: transform 0.33s cubic-bezier(0.75, -0.5, 0.25, 1.5);
}

.firstname {
	position: relative;
	z-index: var(--firstname-z-index);
	letter-spacing: 0.25rem;

	.brand:hover &,
	.brand:focus & {
		transform: translate(
			calc(var(--brand-animation-constant) * 0.25),
			calc(var(--brand-animation-constant) * -1)
		);
	}
}

.lastname {
	position: absolute;
	top: 50%;
	left: 5%;
	z-index: var(--lastname-z-index);
	color: transparent;
	-webkit-text-stroke: var(--stroke-width) var(--stroke-color);

	.brand:hover &,
	.brand:focus & {
		transform: translate(
			calc(var(--brand-animation-constant) * -1),
			calc(var(--brand-animation-constant) * 1)
		);
	}
}
</style>
