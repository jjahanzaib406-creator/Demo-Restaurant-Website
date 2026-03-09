import "./styles.css";

const reviews = [...document.querySelectorAll(".review")];
const dotsContainer = document.getElementById("carouselDots");
let activeReview = 0;

const setReview = (index) => {
  reviews.forEach((review, i) => {
    review.classList.toggle("active", i === index);
  });
  [...dotsContainer.children].forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
  activeReview = index;
};

reviews.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.setAttribute("aria-label", `Show review ${index + 1}`);
  dot.addEventListener("click", () => setReview(index));
  dotsContainer.appendChild(dot);
});

setReview(0);
setInterval(() => {
  const next = (activeReview + 1) % reviews.length;
  setReview(next);
}, 5500);

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.src || "";
    lightbox.showModal();
  });
});

closeLightbox.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

const onScroll = () => {
  const scrollY = window.scrollY * 0.06;
  document.querySelectorAll(".gallery-item img").forEach((img, index) => {
    const offset = index % 2 === 0 ? scrollY : -scrollY;
    img.style.transform = `translateY(${offset}px) scale(1.05)`;
  });
};

window.addEventListener("scroll", onScroll, { passive: true });

document.querySelector(".reserve-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector("button[type='submit']");
  button.textContent = "Reservation Request Sent";
  button.disabled = true;
});
