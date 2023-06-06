/**
 * Load HTML templates on click
 */
document.documentElement.addEventListener('click', (event) => {
  if (event.target.matches('[data-template-id]')) {
    event.preventDefault();
    const { templateId } = event.target.dataset;
    const template = document.getElementById(templateId);
    const templateContent = template.content.cloneNode(true);
    event.target.parentNode.replaceChild(templateContent, event.target);
  }
});

/**
 * Preload internal links
 */
function handleInternalLinkIntersect(entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const newPreLoadLink = document.createElement('link');
    newPreLoadLink.rel = 'prerender';
    newPreLoadLink.href = entry.target.href;
    document.head.appendChild(newPreLoadLink);
  });
}

const internalLinkObserver = new IntersectionObserver(handleInternalLinkIntersect);
[...document.querySelectorAll('a')]
  .filter(({ href }) => href.includes(window.location.origin) && !href.includes('#') && href !== window.location.href)
  .forEach((link) => {
    internalLinkObserver.observe(link);
  });
