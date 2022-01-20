export const getImageSize = ({ image }) => {
  const { width } = image.getBoundingClientRect();
  return `${width}px`;
};

export const setImagesSizes = () => {
  const images = document.querySelectorAll('img[sizes="1px"]');

  const lazyImageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        const size = getImageSize({ image: lazyImage });
        const sources = lazyImage.parentNode.querySelectorAll('source');
        if (sources) {
          sources.forEach((source) => {
            // eslint-disable-next-line no-param-reassign
            source.sizes = size;
          });
        }

        // eslint-disable-next-line no-param-reassign
        lazyImage.sizes = size;
        lazyImageObserver.unobserve(lazyImage);
      }
    });
  });

  images.forEach((lazyImage) => {
    lazyImageObserver.observe(lazyImage);
    lazyImage.addEventListener(
      `load`,
      () => {
        lazyImage.classList.remove('fade-inactive');
        lazyImage.classList.add('fade-active');
      },
      { once: true },
    );
  });
};
