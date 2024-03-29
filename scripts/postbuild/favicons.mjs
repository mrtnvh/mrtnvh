import fs from 'fs-extra';
import favicons from 'favicons';
import { replaceFilesContent, BUILD_DIRECTORY } from './_utils.mjs';

const source = 'public/favicon.png';
const iconOutPath = '/';

const getConfiguration = (pkg) => ({
  // Path for overriding default icons path. `string`
  path: iconOutPath,

  // Your application's name. `string`
  appName: pkg.name,

  // Your application's short_name. `string`. Optional. If not set, appName will be used
  appShortName: pkg.name,

  // Your application's description. `string`
  appDescription: pkg.description,

  // Your (or your developer's) name. `string`
  developerName: pkg.author.name,

  // Your (or your developer's) URL. `string`
  developerURL: pkg.author.url,

  // Theme color user for example in Android's task switcher. `string`
  theme_color: '#95FF00',

  // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
  display: 'minimal-ui',

  // Start URL when launching the application from a device. `string`
  start_url: '/?homescreen=1',

  // Your application's version string. `string`
  version: pkg.version,

  icons: {
    // Platform Options:
    // - offset - offset in percentage
    // - background:
    //   * false - use default
    //   * true - force use default, e.g. set background for Android icons
    //   * color - set background for the specified icons
    //   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
    //   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
    //   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
    //

    // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    android: true,

    // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    appleIcon: true,

    // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    appleStartup: true,

    // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    coast: false,

    // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    favicons: true,

    // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    firefox: false,

    // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    windows: false,

    // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
    yandex: false,
  },
});

export default async () => {
  const pkg = await fs.readJSON('package.json');
  const { html, images, files } = await favicons(source, getConfiguration(pkg));

  await Promise.all(
    images.map(async ({ name, contents }) => fs.outputFile(`${BUILD_DIRECTORY}${iconOutPath}/${name}`, contents)),
  );

  await Promise.all(
    Object.values(files).map(async ({ name, contents }) => {
      if (name === 'manifest.json' || name === 'manifest.webmanifest') {
        const parsedContents = JSON.parse(contents);
        const purposedContents = {
          ...parsedContents,
          icons: parsedContents.icons.map((icon) => ({
            ...icon,
            purpose: 'any maskable',
          })),
        };
        return fs.outputFile(`${BUILD_DIRECTORY}/${name}`, JSON.stringify(purposedContents));
      }
      return fs.outputFile(`${BUILD_DIRECTORY}/${name}`, contents);
    }),
  );

  await replaceFilesContent('**/*.html', async (content) => {
    const splitAndJoinString = '</head>';
    const [pre, post] = content.split(splitAndJoinString);
    return [[pre, html.join('')].join(''), post].join(splitAndJoinString);
  });
};
