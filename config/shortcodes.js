/* eslint-disable import/no-extraneous-dependencies */
const glob = require("glob");
const path = require("path");
const fs = require("fs");

const Image = require("./Image");

const TitleSmall = (titleSmall) =>
  !titleSmall ? "" : `<small>${titleSmall}</small>`;

const Title = (title, titleSmall) =>
  !title
    ? ""
    : `<h2 class="section__title">
				<span class="main outline">${title}</span>
				${TitleSmall(titleSmall)}
			</h2>`;

const Section = (content, title, titleSmall) => `
  <section class="section container">
    <div class="header clear-inner-spacing">${Title(title, titleSmall)}</div>
    ${content}
  </section>
`;

const ListItem = (entry) => {
  let item = entry;
  if (entry.data) {
    item = entry.data;
  }
  const { thumbnail, title, subtitle, url } = item;

  return `
    <article class="list__item">
      <a href="${url || entry.url}" class="reset list__link">
        <figure class="media list__media">
          ${Image(thumbnail, title, "image", 1600, 900)}
        </figure>
        <div class="list__content">
          <h1 class="list__title outline">${title}</h1>
          <h2 class="list__subtitle">${subtitle}</h2>
        </div>
      </a>
    </article>
  `;
};

// const ListItem = ({ url, data: { thumbnail, title, subtitle, ...data } }) => ;

const List = (entries, className) => `
  <div class="grid ${className || ""}">${entries.map(ListItem).join("")}</div>
`;

const yearNow = () => {
  const date = new Date();
  return date.getFullYear().toString();
};

const loadIcons = (config) => {
  const files = glob.sync(path.join(__dirname, "icons/*.svg"));
  files.forEach((file) => {
    const { name } = path.parse(file);
    const content = fs.readFileSync(file, "utf-8");
    config.addShortcode(`${name}`, () => content);
  });
};

module.exports = (config) => {
  config.addPairedShortcode("section", Section);
  config.addShortcode("image", Image);
  config.addShortcode("yearNow", yearNow);
  config.addShortcode("list", List);
  loadIcons(config);
};
