"use strict";var precacheConfig=[["/Nepal_RJS/index.html","518958b9c5ee07b707fb1f13171d89a6"],["/Nepal_RJS/static/css/main.acb96daa.css","d24d7ad12c6b84b87bf28b958ef66006"],["/Nepal_RJS/static/js/main.f0521cbf.js","dbfeb516d4d9119571442de60093d8dc"],["/Nepal_RJS/static/media/Locker.9b39c6b8.png","9b39c6b8734f7d53a5b35301aae67701"],["/Nepal_RJS/static/media/Logo.a9837b3c.png","a9837b3c52ff741f9aaa23422d6031e1"],["/Nepal_RJS/static/media/LogoLighter.78c430ad.png","78c430ad78f685eedd3edef1fe57d0e3"],["/Nepal_RJS/static/media/checkCircle.ce566a44.svg","ce566a44107c1419a3f1ddc0a95f03fb"],["/Nepal_RJS/static/media/exerciseInfo.25ec04c7.svg","25ec04c73dd0c75a3f2be7882da1b1d8"],["/Nepal_RJS/static/media/history.6b22ff2e.svg","6b22ff2e0aaa4882f5be38d0e0a56f52"],["/Nepal_RJS/static/media/home.2f40e0b0.svg","2f40e0b0bd0c1a65d6fb304af1a54224"],["/Nepal_RJS/static/media/homeSel.08a11d14.svg","08a11d1417af19efaf9995647157bbbd"],["/Nepal_RJS/static/media/immediate-fat-loss.5f69d4e0.jpg","5f69d4e08b7bdc916b980e07d73f289c"],["/Nepal_RJS/static/media/me.74c28ff9.svg","74c28ff9ca5d427c699bb0b5e09200d7"],["/Nepal_RJS/static/media/meSel.e3974887.svg","e3974887700cdb7737dcc53ad9c23e0c"],["/Nepal_RJS/static/media/plan.d23235d0.svg","d23235d0de5e9f2e9371a8e2086bfc95"],["/Nepal_RJS/static/media/planSel.38e51058.svg","38e51058ec9ccb7e170850236c038583"],["/Nepal_RJS/static/media/sampleImage.5de1f122.jpeg","5de1f122a44109d834d7275830e19018"],["/Nepal_RJS/static/media/workout.4e74ddca.svg","4e74ddca1847af3a69af2475c27b75e0"],["/Nepal_RJS/static/media/workoutSel.7cffe939.svg","7cffe93989f752f3255b676b137a67dc"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),r.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],n=new URL(a,self.location),r=createCacheKey(n,hashParamName,t,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,n),e=urlsToCacheKeys.has(t));var r="/Nepal_RJS/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});