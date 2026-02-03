export const createSlider = (wrapperClassName) => {
  const sliderWrapper = document.querySelector(`.${wrapperClassName}`);
  const sliderDots = sliderWrapper.querySelector(".slider-dots");
  const leftButton = sliderWrapper.querySelector(".slider-button.left");
  const rightButton = sliderWrapper.querySelector(".slider-button.right");

  let fullWidth = sliderWrapper.scrollWidth;
  let visibleWidth = sliderWrapper.clientWidth;
  let countOfDots = Math.round(fullWidth / visibleWidth);

  /** under: updating variables on resizing */
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        fullWidth = sliderWrapper.scrollWidth;
        visibleWidth = sliderWrapper.clientWidth;
        countOfDots = Math.round(fullWidth / visibleWidth);
      }
    }
  });

  resizeObserver.observe(sliderWrapper);

  const arrOfDots = Array.from({ length: countOfDots }, (_, i) => i);

  const ACTIVE_DOT_CLASS = "active";

  arrOfDots.forEach((i) => {
    const dot = document.createElement("button");
    dot.id = "transformation-id:" + i;
    dot.classList.add("slider-dot");
    if (i === 0) {
      dot.classList.add(ACTIVE_DOT_CLASS);
    }

    sliderDots.appendChild(dot);
  });

  sliderDots.addEventListener("click", (e) => {
    const clickedDotInd = Number(e.target.id.split(":")[1]);
    sliderWrapper.scrollTo({ left: clickedDotInd * visibleWidth });
  });

  // ----------------------------
  const sliderWrapperScrollHandler = (e) => {
    const currentDotInd = Math.round(e.target.scrollLeft / visibleWidth);

    arrOfDots.forEach((_, i) => {
      if (i === currentDotInd) {
        sliderDots.children[i].classList.add(ACTIVE_DOT_CLASS);
      } else {
        sliderDots.children[i].classList.remove(ACTIVE_DOT_CLASS);
      }
    });
  };
  sliderWrapper.addEventListener("scroll", sliderWrapperScrollHandler);

  /* ------------------------------------ */
  const leftButtonClickHandler = (e) => {
    const currentActiveDotIndex = [...sliderDots.children].findIndex((dot) => {
      return dot.classList.contains(ACTIVE_DOT_CLASS);
    });

    if (currentActiveDotIndex === -1) {
      return;
    }

    sliderWrapper.scrollTo({ left: (currentActiveDotIndex - 1) * visibleWidth });
  };

  leftButton.addEventListener("click", leftButtonClickHandler);

  /* ------------------------------------ */
  const rightButtonClickHander = (e) => {
    const currentActiveDotIndex = [...sliderDots.children].findIndex((dot) => {
      return dot.classList.contains(ACTIVE_DOT_CLASS);
    });

    if (currentActiveDotIndex === -1) {
      return;
    }

    sliderWrapper.scrollTo({ left: (currentActiveDotIndex + 1) * visibleWidth });
  };
  rightButton.addEventListener("click", rightButtonClickHander);
};
