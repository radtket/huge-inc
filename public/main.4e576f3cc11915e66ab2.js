!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(0);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var r=function e(){var t=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),i(this,"slugify",function(e){return e.toString().toLowerCase().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"")}),i(this,"checkForSubNav",function(e){return e.length>0&&null!=e&&e}),i(this,"createNavLink",function(e,t){return'<a href="'.concat(e,'">').concat(t,"</a>")}),i(this,"createSubNavItems",function(e,n){var i=t.slugify(e.label),r=document.createElement("ul");r.setAttribute("class","nav-list__subnav"),r.setAttribute("id","items-".concat(i,"-menu")),document.getElementById("items-".concat(i)).appendChild(r);var a=document.getElementById("items-".concat(i,"-menu"));n.forEach(function(e){var n=e.items,i=e.url,r=e.label,s=document.createElement("li");s.className=n?"nav-list__item nav-list__item--hassub":"nav-list__subnav--item",s.innerHTML=t.createNavLink(i,r),a.appendChild(s)})}),i(this,"createNavItems",function(e){e.forEach(function(e){var n=e.items,i=e.url,r=e.label,a=t.slugify(r),s=document.createElement("li");s.className=t.checkForSubNav(n)?"nav-list__item nav-list__item--hassub":"nav-list__item",s.innerHTML=t.createNavLink(i,r),t.checkForSubNav(n)?(s.setAttribute("id","items-".concat(a)),t.nav.appendChild(s),t.createSubNavItems(e,n)):t.nav.appendChild(s)})}),this.nav=document.getElementById("js-nav-root")},a=function(){setTimeout(function(){var e=document.getElementById("loader");e.classList.contains("done")||e.classList.add("done")},1e3)},s=document.querySelector(".site-overlay"),o=function(e){var t=e,n=t.querySelector(".nav-list__subnav");n.style.height="".concat(n.scrollHeight,"px"),window.setTimeout(function(){n.style.height="0"},1),window.setTimeout(function(){t.classList.remove("is-visible"),s.classList.remove("is-visible")},300)},c=function(e){var t=e;return t.classList.contains("is-visible")?o(t):function(e){var t=e,n=t.querySelector(".nav-list__subnav");t.classList.add("is-visible"),n.style.height=function(){n.style.display="block";var e="".concat(n.scrollHeight,"px");return n.style.display="",e}(),s.classList.add("is-visible"),window.setTimeout(function(){n.style.height=""},300)}(t)},u=function(){document.querySelectorAll(".nav-list__item--hassub").forEach(function(e){e.classList.contains("is-visible")&&o(e)})};function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}new function e(){var t=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),l(this,"documentLoad",function(){a(),t.createNav(),t.addClickEvents()}),l(this,"windowResize",function(){var e=t.body.classList,n=document.querySelector(".site-overlay").classList;window.innerWidth>=767&&e.contains("drawer-open")?(e.remove("drawer-open"),u()):window.innerWidth<768&&n.contains("is-visible")&&(n.remove("is-visible"),u())}),l(this,"addClickEvents",function(){document.querySelector(".hamburger-btn").addEventListener("click",function(){return t.body.classList.toggle("drawer-open")}),document.querySelector(".site-overlay").addEventListener("click",function(e){e.target.classList.remove("is-visible"),u()}),document.addEventListener("click",function(e){var t=e.target.parentElement;t.classList.contains("nav-list__item--hassub")&&(e.preventDefault(),t.querySelector(".nav-list__subnav")&&c(t))},!1)}),l(this,"createNav",function(){fetch("/api").then(function(e){return e.json()}).then(function(e){return(new r).createNavItems(e.items)})}),document.onload=this.documentLoad(),window.addEventListener("resize",this.windowResize),this.document=document,this.body=this.document.body}}]);
//# sourceMappingURL=main.4e576f3cc11915e66ab2.js.map