import { clickHandler, onBlurInput, onFocusInput, updateUsdValue } from ".";
import { noBalanceCSS } from "../cssContents";
import { addTailwindScript } from "../scriptContents";

export const createContainer = () => {
  const popupBackground = document.createElement("div");
  popupBackground.id = "popupBackground";
  popupBackground.addEventListener("click", (event) => {clickHandler(event)});
  popupBackground.addEventListener("input",updateUsdValue);
  popupBackground.addEventListener("onfocus", (e) => onFocusInput(e));
  popupBackground.addEventListener("onblur", (e) => onBlurInput(e));

  const sdkContainer = document.createElement("div");
  sdkContainer.id = "sdkContainer";

  const sheet = document.createElement("style");
  return {popupBackground, sdkContainer, sheet};
}

export const appendContainerToBody = (popupBackground: HTMLDivElement, sdkContainer: HTMLDivElement, sheet: HTMLStyleElement) => {
  sdkContainer.appendChild(popupBackground);
  sheet.innerHTML = noBalanceCSS;
  globalThis.document.body.appendChild(sdkContainer);
  globalThis.document.body.appendChild(sheet);
  const range = document.createRange();
  range.setStart(globalThis.document.body, 0);
  globalThis.document.body.appendChild(
    range.createContextualFragment(addTailwindScript())
  );
}