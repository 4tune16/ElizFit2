const CSS_FLUID_VH = "--fluid-vh";
export function fluidVhSet() {
  const bodyStyle = document.body.style;
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    bodyStyle.setProperty(CSS_FLUID_VH, "100dvh");
  } else {
    bodyStyle.setProperty(CSS_FLUID_VH, "100vh");
  }
}
