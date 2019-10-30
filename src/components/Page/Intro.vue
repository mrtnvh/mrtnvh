<template>
	<section class="intro">
		<div class="container">
			<transition name="slide-up-fade" appear>
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
			</transition>
			<div class="intro__subtitle">
				<transition name="slide-up-fade" appear>
					<span :style="animationDelay(1)">
						<a
							href="https://www.credential.net/o040z9qg"
							target="_blank"
							rel="noopener"
						>
							Google Mobile Web Specialist
						</a>
						<span class="mr-space">,</span>
					</span>
				</transition>
				<transition name="slide-up-fade" appear>
					<span :style="animationDelay(2)">
						<a
							href="https://github.com/vanhoofmaarten"
							target="_blank"
							rel="noopener"
						>
							Open Source Contributer
						</a>
						<span class="mr-space">,</span>
					</span>
				</transition>
				<transition name="slide-up-fade" appear>
					<span :style="animationDelay(3)">
						<g-link to="/projects/royce">
							Loud Noise Generator
						</g-link>
						.
					</span>
				</transition>
			</div>
		</div>
	</section>
</template>

<script>
import AnimationMixin from "~/components/Animation/AnimationMixin";

export default {
	mixins: [AnimationMixin],
};
</script>

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
