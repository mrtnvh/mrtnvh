import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';
import { devices as playwrightDevices } from 'playwright';

export function getPages(): string[] {
  const sitemapFileName = fs
    .readdirSync(`dist`)
    .reduce((acc, fileName) => (fileName.includes('sitemap-0') ? fileName : acc), '');
  const sitemap = fs.readFileSync(`${process.cwd()}/dist/${sitemapFileName}`, 'utf-8');
  const parser = new XMLParser();
  const sitemapJson = parser.parse(sitemap);
  const pages = sitemapJson.urlset.url
    .map(({ loc }: { loc: string }) => {
      const url = new URL(loc);
      return url.pathname;
    })
    .filter((pathname: string) => !pathname.includes('kitchensink'));
  return pages;
}

export const browserTimeout = 30 * 1000;

export const port = 3001;

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
