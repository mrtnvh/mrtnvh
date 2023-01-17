import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupA11yPlugin from '@swup/a11y-plugin';
import SwupScrollPlugin from '@swup/scroll-plugin';

function setBrandSize() {
  document.querySelectorAll('.brand').forEach(($brand) => {
    if (window.location.pathname === '/') {
      $brand.classList.add('brand-large');
    } else {
      $brand.classList.remove('brand-large');
    }
  });
}

function setNavigationActiveLink() {
  document.querySelectorAll('#nav a').forEach((link) => {
    const currentPath = window.location.pathname;
    const linkPath = new URL(link.href).pathname;
    if (currentPath === '/' && linkPath === '/') {
      link.setAttribute('data-page-current', '');
    } else if (currentPath.includes(linkPath) && linkPath !== '/') {
      link.setAttribute('data-page-current', '');
    } else {
      link.removeAttribute('data-page-current');
    }
  });
}

function onContentReplaced() {
  setBrandSize();
  setNavigationActiveLink();
}

const swup = new Swup({
  plugins: [
    // new SwupPreloadPlugin(),
    new SwupHeadPlugin({ persistAssets: true }),
    new SwupA11yPlugin(),
    new SwupScrollPlugin({ doScrollingRightAway: true, animateScroll: false }),
  ],
});

window.plausible =
  window.plausible ||
  // eslint-disable-next-line func-names
  function () {
    // eslint-disable-next-line prefer-rest-params
    (window.plausible.q = window.plausible.q || []).push(arguments);
  };

swup.on('contentReplaced', onContentReplaced);

swup.on('pageView', () => {
  window.plausible('pageview');
});

onContentReplaced();
