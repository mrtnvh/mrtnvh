export const getImageSize = ({ image }) => {
  const { width } = image.getBoundingClientRect();
  return `${width}px`;
};

export const setImagesSizes = () => {
  const images = document.querySelectorAll('img[sizes="1px"]');
  images.forEach((image) => {
    image.addEventListener(
      `load`,
      () => {
        image.classList.remove('fade-inactive');
        image.classList.add('fade-active');
      },
      { once: true },
    );

    const size = getImageSize({ image });
    const sources = image.parentNode.querySelectorAll('source');
    if (sources) {
      sources.forEach((source) => {
        // eslint-disable-next-line no-param-reassign
        source.sizes = size;
      });
    }

    // eslint-disable-next-line no-param-reassign
    image.sizes = size;
  });
};
