import { createSlider } from "./slider.js";

const slider1 = createSlider("about-transformation-wrapper");
const slider2 = createSlider("feedback-motivation-wrapper");
const slider3 = createSlider("feedback-results-wrapper");
const slider4 = createSlider("about-education-wrapper");

// const sliderTransformationWrapper = document.querySelector(".about-transformation-wrapper");
// const sliderTransformationDots = document.querySelector(".about-transformation-dots");
// const leftTransformButton = document.querySelector(".slider-button.left");
// const rightTransformButton = document.querySelector(".slider-button.right");

// // -------------- width variables -----------------
// let fullWidth = sliderTransformationWrapper.scrollWidth;
// let visibleWidth = sliderTransformationWrapper.clientWidth;
// let countOfDots = Math.round(fullWidth / visibleWidth);

// /** under: updating variables on resizing */
// const resizeObserver = new ResizeObserver((entries) => {
//   for (const entry of entries) {
//     if (entry.contentBoxSize) {
//       fullWidth = sliderTransformationWrapper.scrollWidth;
//       visibleWidth = sliderTransformationWrapper.clientWidth;
//       countOfDots = Math.round(fullWidth / visibleWidth);
//     }
//   }
// });

// resizeObserver.observe(sliderTransformationWrapper);

// const arrOfDots = Array.from({ length: countOfDots }, (_, i) => i);

// const ACTIVE_DOT_CLASS = "active";

// arrOfDots.forEach((i) => {
//   const dot = document.createElement("button");
//   dot.id = "transformation-id:" + i;
//   dot.classList.add("slider-dot");
//   if (i === 0) {
//     dot.classList.add(ACTIVE_DOT_CLASS);
//   }

//   sliderTransformationDots.appendChild(dot);
// });

// sliderTransformationDots.addEventListener("click", (e) => {
//   const clickedDotInd = Number(e.target.id.split(":")[1]);
//   sliderTransformationWrapper.scrollTo({ left: clickedDotInd * visibleWidth });
// });
// const sliderTransformationWrapperScrollHandler = (e) => {
//   const currentDotInd = Math.round(e.target.scrollLeft / visibleWidth);

//   arrOfDots.forEach((_, i) => {
//     if (i === currentDotInd) {
//       sliderTransformationDots.children[i].classList.add(ACTIVE_DOT_CLASS);
//     } else {
//       sliderTransformationDots.children[i].classList.remove(ACTIVE_DOT_CLASS);
//     }
//   });
// };
// sliderTransformationWrapper.addEventListener("scroll", sliderTransformationWrapperScrollHandler);

// const leftTransformButtonClickHandler = (e) => {
//   const currentActiveDotIndex = [...sliderTransformationDots.children].findIndex((dot) => {
//     return dot.classList.contains(ACTIVE_DOT_CLASS);
//   });

//   if (currentActiveDotIndex === -1) {
//     return;
//   }

//   sliderTransformationWrapper.scrollTo({ left: (currentActiveDotIndex - 1) * visibleWidth });
// };

// leftTransformButton.addEventListener("click", leftTransformButtonClickHandler);

// const rightTransformButtonClickHander = (e) => {
//   const currentActiveDotIndex = [...sliderTransformationDots.children].findIndex((dot) => {
//     return dot.classList.contains(ACTIVE_DOT_CLASS);
//   });

//   if (currentActiveDotIndex === -1) {
//     return;
//   }

//   sliderTransformationWrapper.scrollTo({ left: (currentActiveDotIndex + 1) * visibleWidth });
// };
// rightTransformButton.addEventListener("click", rightTransformButtonClickHander);
