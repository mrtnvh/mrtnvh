// E-mail
const handleMailClick = () => {
  const mailLinkArray = ["mailto:", "info", "@", "mrtnvh", ".com"];
  window.location.href = mailLinkArray.join("");
};

document.querySelector("#email").addEventListener("click", handleMailClick);

// Images
document.querySelectorAll("img").forEach((img) => {
  const { width } = img.getBoundingClientRect();
  img.setAttribute("sizes", `${width}px`);

  if (img.parentElement.tagName === "PICTURE") {
    img.parentElement.querySelectorAll("source").forEach((source) => {
      source.setAttribute("sizes", `${width}px`);
    });
  }

  img.addEventListener("load", () => {
    const source = new URL(img.src);
    if (!source.searchParams.has("size_set")) {
      source.searchParams.append("size_set", true);
      img.setAttribute("src", `${img.src}?size_set=true`);
      img.classList.add("loaded");
    }
  });
});
