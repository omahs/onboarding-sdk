export const bridgeLoadingHTML = `'<div onclick="maximizeWindow()" id="bridgeLoadingContainer" class="flex flex-col rounded-[30px] bg-primaryBg py-[25px] w-[30%]">'+
      '<div class="flex flex-row justify-end items-center w-full px-[20px]">'+
        '<img onclick="minimizeWindow(event)" src="https://public.cypherd.io/icons/minimize_icon.png" class="cursor-pointer w-[20px] h-[3px] mr-[10px]">'+
        '<img onclick="closePopup()" src="https://public.cypherd.io/icons/close_icon.svg" class="cursor-pointer">'+
      '</div>'+
      '<div class="flex flex-1 flex-col justify-center self-center items-center px-[30px] w-[72%]">'+
          '<h2 class="text-[20px] text-primaryText text-center font-semibold mt-[40px]">Transaction submitted</h2>'+
          '<p class="text-[16px] text-primaryText text-center mt-[10px]">Your transaction is being processed. This can take upto 5 mins</p>'+
          '<img class="mt-[5px]" src="https://public.cypherd.io/icons/logos/loading.gif" alt="loading gif" width="300" height="300">'+
      '</div>'+
    '</div>'`;

