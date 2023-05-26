import { EVM_CHAINS_NATIVE_TOKEN_MAP } from "../constants/server";

declare let globalThis: any;

export const __capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const requiredUsdValue = (requiredTokenDetail: any, exchangingTokenDetail: any) => {
  const amountRequired = (globalThis.cypherWalletDetails.fromTokenRequiredBalance * requiredTokenDetail.price) - (exchangingTokenDetail.actualBalance * exchangingTokenDetail.price);
  return amountRequired;
}

export const updateUsdValue = (event: any) => {
    const tokenValueElement = document.querySelector("#bp-token-value");
    const price = parseFloat(globalThis.exchangingTokenDetail.price);
    const newValue = (parseFloat(event.target.value) / price).toFixed(6);
    if (tokenValueElement) tokenValueElement.innerHTML = newValue.toString();
}

export const minimizeWindow = (container = document.getElementById("bridge-loading-container")) => {
  event?.stopPropagation();
  const sdkContainer: any = document.getElementById("sdkContainer");
  if (sdkContainer && container) {
    sdkContainer.style.backgroundColor = "transparent";
    sdkContainer.style.backdropFilter = "none";
    sdkContainer.style.zoom = 0.4;
    sdkContainer.style.height = "30%";
    sdkContainer.style.width = "40%";
    sdkContainer.style.top = "70%";
    sdkContainer.style.left = "60%";
    container.classList.remove("lg:w-[30%]");
    container.classList.add("lg:w-[70%]");
  }
}

export const maximizeWindow = (container = document.getElementById("bridge-loading-container")) => {
  const sdkContainer: any = document.getElementById("sdkContainer");
  if(sdkContainer && container && sdkContainer.style.zoom === "0.4"){
    sdkContainer.style.backgroundColor = "rgba(0,0,0,0.4)";
    sdkContainer.style.backdropFilter = "blur(5px)";
    sdkContainer.style.zoom = 1;
    sdkContainer.style.height = "100%";
    sdkContainer.style.width = "100%";
    sdkContainer.style.top = 0;
    sdkContainer.style.left = 0;
    container.classList.remove("lg:w-[70%]");
    container.classList.add("lg:w-[30%]");
  }
}

export const onFocusInput = (e: any) => {
  e.target.placeholder="";
}

export const onBlurInput = (e: any) => {
  e.target.placeholder="0.00";
}

export const noop = (status: boolean) => {
  console.log("🚀 ~ User operation Completed:", status);
};

export const isNativeToken = (tokenContract: string) => {
  return Array.from(EVM_CHAINS_NATIVE_TOKEN_MAP.values()).includes(tokenContract.toLowerCase())
}

export async function timeoutPromise(timeout: number): Promise<never> {
  return new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout));
}
