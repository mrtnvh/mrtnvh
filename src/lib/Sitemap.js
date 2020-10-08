import NuxtContent from "@nuxt/content";

// eslint-disable-next-line import/prefer-default-export
export const createSitemapRoutes = async () => {
	const { $content } = NuxtContent;
	const pages = await $content({ deep: true }).fetch();
	return pages.map(({ path }) => path);
};
