const t=document.querySelector("button"),e=t.nextElementSibling,n=function(){document.querySelector("body").style=`background-color: #${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`};t.addEventListener("click",(r=>{const o=setInterval(n,1e3);t.setAttribute("disabled",""),e.addEventListener("click",(e=>{clearInterval(o),t.removeAttribute("disabled")}))}));
//# sourceMappingURL=01-color-switcher.971af40f.js.map