const isDesktop = window.matchMedia("@media (min-width: 700px)").matches;

// E-mail
const handleMailClick = () => {
  const mailLinkArray = ["mailto:", "info", "@", "mrtnvh", ".com"];
  window.location.href = mailLinkArray.join("");
};

document.querySelector("#email").addEventListener("click", handleMailClick);

// Images
if (isDesktop) {
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
}

// OffCanvasMenu
let isOffCanvasMenuOpen = false;
const $offCanvasMenuToggle = document.querySelector("#offcanvasmenuToggle");
const $body = document.querySelector("body");
const $nav = document.querySelector("#nav").cloneNode(true);
const $social = document.querySelector("#social").cloneNode(true);

const $offCanvasMenu = document.createElement("div");
$offCanvasMenu.id = "offCanvasMenu";
$nav.classList.add("nav--offCanvas");
$social.classList.add("social--offCanvas");
$offCanvasMenu.classList.add("offCanvasMenu");
$offCanvasMenu.setAttribute("data-testid", "offcanvasmenu");
$offCanvasMenu.append($nav, $social);

$offCanvasMenuToggle.addEventListener("click", (event) => {
  event.preventDefault();

  if (!isOffCanvasMenuOpen) {
    $body.append($offCanvasMenu);
    $offCanvasMenuToggle.textContent = "Close";
    isOffCanvasMenuOpen = true;
  } else {
    $body.removeChild($offCanvasMenu);
    $offCanvasMenuToggle.textContent = "Menu";
    isOffCanvasMenuOpen = false;
  }
});
