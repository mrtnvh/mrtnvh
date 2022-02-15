import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';
import { devices as playwrightDevices } from 'playwright';

export function getPages() {
  const sitemapFileName = fs
    .readdirSync(`dist`)
    .reduce((acc, fileName) => (fileName.includes('sitemap') ? fileName : acc), '');
  const sitemap = fs.readFileSync(`${process.cwd()}/dist/${sitemapFileName}`, 'utf-8');
  const parser = new XMLParser();
  const sitemapJson = parser.parse(sitemap);
  const pages = sitemapJson.urlset.url.map(({ loc }) => {
    const url = new URL(loc);
    return url.pathname;
  });
  return pages;
}

export const browserTimeout = 30 * 1000;

export const port = 3001;

export const devices = {
  mobile: playwrightDevices['iPhone X'],
  desktop: {
    viewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      isLandscape: true,
    },
    // userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:85.0) Gecko/20100101 Firefox/85.0',
  },
};
