const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");

navToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

primaryNav.addEventListener("click", (event) => {
  if (
    event.target.tagName === "A" &&
    primaryNav.classList.contains("is-open")
  ) {
    primaryNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("click", (event) => {
  const clickedOutside =
    !primaryNav.contains(event.target) && !navToggle.contains(event.target);
  if (clickedOutside && primaryNav.classList.contains("is-open")) {
    primaryNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
    primaryNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

const filterBar = document.querySelector(".filter-bar");
const cards = document.querySelectorAll(".card");

filterBar.addEventListener("click", (event) => {
  const chip = event.target.closest(".filter-chip");
  if (!chip) return;

  filterBar
    .querySelectorAll(".filter-chip")
    .forEach((c) => c.classList.remove("is-active"));
  chip.classList.add("is-active");

  const filter = chip.dataset.filter;

  cards.forEach((card) => {
    const matches = filter === "all" || card.dataset.role === filter;
    card.classList.toggle("is-hidden", !matches);
  });
});
