import { XMLParser } from 'fast-xml-parser';
import { devices as playwrightDevices } from 'playwright';

export const port = process.env.PORT ? Number(process.env.PORT) : 3000;
export const baseURL = process.env.CI_BASEURL || `http://localhost:${3000}`;

export async function getPages(): Promise<string[]> {
  const sitemap = await fetch(`${baseURL}/sitemap.xml`).then((res) => res.text());
  const parser = new XMLParser();
  const sitemapJson = parser.parse(sitemap);
  console.log(sitemapJson);
  const pages = sitemapJson.urlset.url
    .map(({ loc }: { loc: string }) => {
      const url = new URL(loc);
      return url.pathname;
    })
    .filter((pathname: string) => !pathname.includes('kitchensink'));
  return pages;
}

export const browserTimeout = 30 * 1000;

export const devices: Record<'mobile' | 'desktop', any> = {
  mobile: playwrightDevices['iPhone X'],
  desktop: {
    ...playwrightDevices['Desktop Chrome'],
    viewport: {
      width: 1440,
      height: 900,
    },
  },
};
