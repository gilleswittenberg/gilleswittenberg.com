!function(t,e){"use strict";if(!/no-js/.test(e.body.className)){var n=e.querySelector("#email"),i=n.textContent.replace(/\s/g,"").replace("[at]","@").replace("[dot]","."),a=e.createElement("a");a.textContent=i,a.setAttribute("title",n.getAttribute("title")),a.setAttribute("href","mailto:"+i),n.parentNode.replaceChild(a,n);var s={articles:e.querySelectorAll("article"),button:e.querySelector("aside > button")},l=[],o=[];Array.prototype.forEach.call(s.articles,(function(t,e){l.push(e),o.push(t.getAttribute("id"))}));var c={expanded:{state:[],has:function(t){return this.state.indexOf(t)>-1},hasAll:function(){var t=!0;return l.forEach(function(e){this.has(e)||(t=!1)}.bind(this)),t},set:function(t){this.has(t)||this.state.push(t)},unset:function(t){if(this.has(t)){var e=this.state.indexOf(t);this.state.splice(e,1)}},setAll:function(){l.forEach(function(t){this.set(t)}.bind(this))}},lastExpanded:null,dispatch:function(t,e){switch(t){case"EXPAND_ALL":this.expanded.setAll();break;case"TOGGLE_EXPANDED":this.lastExpanded=null,this.expanded.has(e.index)?this.expanded.unset(e.index):(this.expanded.set(e.index),this.lastExpanded=e.index)}d.all()}},d={all:function(){this.expanded(),this.button(),this.scrollTo(),this.locationHash()},expanded:function(){Array.prototype.forEach.call(s.articles,(function(t,e){c.expanded.has(e)?t.classList.add("-is-expanded"):t.classList.remove("-is-expanded")}))},button:function(){c.expanded.hasAll()?s.button.classList.add("-is-hidden"):s.button.classList.remove("-is-hidden")},scrollTo:function(){if(null!==c.lastExpanded){var n=s.articles[c.lastExpanded].getBoundingClientRect(),i=t.innerHeight||e.documentElement.clientHeight;n.bottom<=i||t.scrollBy(0,n.bottom-i)}},locationHash:function(){!function(e){if(t.history&&"function"==typeof t.history.replaceState){var n=e?"#"+e:"";t.history.replaceState(void 0,void 0,n)}}(null===c.lastExpanded?null:o[c.lastExpanded])}};Array.prototype.forEach.call(s.articles,(function(t,e){t.querySelector("h3 a").addEventListener("click",(function(t){t.preventDefault(),c.dispatch("TOGGLE_EXPANDED",{index:e})}))})),s.button.addEventListener("click",(function(){c.dispatch("EXPAND_ALL")}));var r=t.location.hash.replace(/^#/,""),h=o.indexOf(r);h=h>-1?h:0,c.dispatch("TOGGLE_EXPANDED",{index:h})}}(window,document);