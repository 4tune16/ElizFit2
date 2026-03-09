const CSS_FLUID_VH = "--fluid-vh";

export function addFluidVhListenner() {
  // Кешируем body для скорости
  const bodyStyle = document.body.style;

  // Храним только те данные, которые нельзя вычислить на лету
  let vh = window.innerHeight;
  let dvh = window.visualViewport ? window.visualViewport.height : vh;

  function update() {
    const scrollY = window.scrollY;
    dvh = window.visualViewport ? window.visualViewport.height : vh;
    const diff = vh - dvh;

    let value;
    if (scrollY > diff) {
      value = "100vh";
    } else {
      // Используем шаблонную строку эффективнее
      value = `calc(100vh - ${diff - scrollY}px)`;
    }
    console.log(`vh: ${vh}, dvh: ${dvh}, diff: ${vh - dvh}, scroll: ${window.scrollY}`);

    // setProperty не затирает остальные стили body
    bodyStyle.setProperty(CSS_FLUID_VH, value);
  }

  // Оптимизация через requestAnimationFrame (чтобы не спамить в UI-поток)
  let ticking = false;
  const requestUpdate = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
      ticking = true;
    }
  };

  // Слушатели
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", () => {
      vh = window.innerHeight;
      requestUpdate();
    });
  }

  // Также стоит слушать обычный resize для десктопов и подстраховки
  window.addEventListener("resize", () => {
    vh = window.innerHeight;
    requestUpdate();
  });

  window.addEventListener("scroll", requestUpdate, { passive: true });

  // Начальный запуск
  update();
}

// const CSS_FLUID_VH = "--fluid-vh";

// export function addFluidVhListenner() {
//   const windowActual = {
//     scrollY: window.scrollY,
//     vh: window.innerHeight,
//     dvh: window.visualViewport.height,
//   };

//   let heightOfHeroSection = "100dvh";
//   function update() {
//     const diffVhDvh = windowActual.vh - windowActual.dvh;
//     if (windowActual.scrollY > diffVhDvh) {
//       heightOfHeroSection = "100vh";
//     } else {
//       heightOfHeroSection = `calc(100vh - ${diffVhDvh - windowActual.scrollY}px)`;
//     }
//     document.body.style = `${CSS_FLUID_VH}: ${heightOfHeroSection}`;
//     console.log({ windowActual, heightOfHeroSection });
//   }
//   update();

//   if (window.visualViewport) {
//     window.visualViewport.addEventListener("resize", (event) => {
//       windowActual.dvh = event.target.height;
//       update();
//     });
//   }
//   window.addEventListener("scroll", (event) => {
//     const scrolled = window.scrollY;
//     windowActual.scrollY = scrolled;
//     update();
//   });
// }
