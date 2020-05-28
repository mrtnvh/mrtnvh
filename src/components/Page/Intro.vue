<template>
	<section class="intro">
		<div class="container">
			<p>
				<span>Front-end developer at </span>
				<a
					href="https://isaac.nl"
					target="_blank"
					rel="noopener"
					class="isaac"
					>ISAAC</a
				>
				<span> in Eindhoven, The Netherlands.</span>
			</p>
			<div class="intro__subtitle">
				<a
					href="https://www.credential.net/o040z9qg"
					target="_blank"
					rel="noopener"
				>
					Google Mobile Web Specialist
				</a>
				<span class="mr-space">,</span>

				<a
					href="https://github.com/vanhoofmaarten"
					target="_blank"
					rel="noopener"
				>
					Open Source Contributer
				</a>
				<span class="mr-space">,</span>

				<g-link to="/projects/royce">
					Loud Noise Generator
				</g-link>
				.
			</div>
		</div>
	</section>
</template>

<style scoped>
.intro {
	background: var(--dark);
	padding: var(--grid-gap-y) 0;

	&,
	a {
		color: var(--light);
	}
}

.intro__subtitle {
	font-size: var(--font-size-base);
	font-weight: var(--font-weight-normal);
	line-height: var(--line-height-lg);
}
</style>
