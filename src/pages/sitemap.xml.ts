import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { parse } from 'date-fns';

function parseDate(input: number) {
  return parse(input.toString(), 'yyyyMMdd', new Date());
}

async function getDynamicPaths() {
  const articleEntries = await getCollection('articles');
  const topicEntries = await getCollection('topics');
  return [
    ...articleEntries.map(({ slug: path, data: { datePublished, dateEdited } }) => ({
      path,
      date: dateEdited || datePublished ? parseDate(dateEdited || datePublished) : undefined,
    })),
    ...topicEntries.map(({ slug: path, data: { datePublished } }) => ({
      path,
      date: datePublished ? parseDate(datePublished) : undefined,
    })),
  ];
}

async function getDefaultPaths() {
  return [
    {
      path: '',
    },
    {
      path: 'articles',
    },
    {
      path: 'topics',
    },
    {
      path: 'about',
    },
    {
      path: 'events',
    },
  ];
}

export async function GET(ctx: APIContext) {
  const defaultPaths = await getDefaultPaths();
  const dynamicPaths = await getDynamicPaths();

  const baseUrl = `${ctx.site?.origin}` || 'https://mrtnvh.com';
  const originalSiteMapXML = await fetch(`${baseUrl}/sitemap-0.xml`)
    .then((res) => res.text())
    .then((sitemap) => {
      const parser = new XMLParser();
      return parser.parse(sitemap);
    })
    .catch(() => '');

  const newSiteMapXML = {
    urlset: {
      '@_xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
      ...originalSiteMapXML?.urlset,
      url: [
        ...(originalSiteMapXML?.urlset?.url ? originalSiteMapXML.urlset.url : []),
        ...[...defaultPaths, ...dynamicPaths].map(({ path, date }) => ({
          loc: `${baseUrl}/${path}`,
          ...(date && {
            lastmod: date.toISOString(),
          }),
        })),
      ],
    },
  };

  const builder = new XMLBuilder({
    ignoreAttributes: false,
  });

  // originalSiteMap.urlset.url = [
  //   ...originalSiteMap.urlset.url,
  //   ...dynamicPaths.map(({ path, date }) => ({
  //     loc: `${baseUrl}/${path}`,
  //     lastmod: date.toISOString(),
  //   })),
  // ];

  return new Response(builder.build(newSiteMapXML));
  // return new Response(JSON.stringify(newSiteMapXML, null, 2));
}
