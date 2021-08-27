// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"lDN0V":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "69f74e7f31319ffd";
module.bundle.HMR_BUNDLE_ID = "f2072ad94645a5bb";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F1() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                } // Render the fancy html overlay
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
            document.body.appendChild(overlay);
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>\n          ").concat(stack, "\n        </pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>' + hint + '</div>';
            }).join(''), "\n        </div>\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') {
        reloadCSS();
        return;
    }
    var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
    if (deps) {
        var fn = new Function('require', 'module', 'exports', asset.output);
        modules[asset.id] = [
            fn,
            deps
        ];
    } else if (bundle.parent) hmrApply(bundle.parent, asset);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    return getParents(module.bundle.root, id).some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"38Jk0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "$imageMap", ()=>$imageMap
);
var _pointer = require("./pointer");
var _mobileNav = require("./mobile-nav");
// Otrzymujemy elementy z DOM
const $listItems = $(".list__item");
const $introTitle = $(".intro__title");
const $dropdown = $(".dropdown");
const $imageMap = $(".user-map");
// Jest przydatne dla sprawdzenia, czy użytkownik kliknął 
let activeTitle;
// Dodajemy eventListener na przycisk dropdown'a, gdy użytkownik klika na container, w którym są nadpis PL i strzałka w dół to nasz dropdown się otwiera.
$(".dropdown__btn").on("click", (e)=>{
    setTimeout(()=>{
        $dropdown.toggleClass("active");
    }, 1);
});
// AddEventListener, gdy użytkownik w coś kliknął na stronie 
$(document).on('click', (e)=>{
    const $target = $(e.target);
    // Sprawdza, czy dropdown jest aktywny i gdy nie klikneliśmy w coś wewnątrz dropdown'a, wtedy go zamykamy
    if (!$target.parents(".dropdown").hasClass("dropdown") && !$target.hasClass("dropdown")) $dropdown.removeClass("active");
    // Jeżeli użytkownik kliknąl na element z listy i jeżeli aktywny element z listy jest identyczny bądź jest ten samy,
    // to nic się nie dzieje
    if (activeTitle === $target.text()) return;
    // Gdy użytkownik kliknął na element z listy i on jest aktywny i później klika na następny element (nie identycznego do poprzedniego)
    // To usuwamy poprzednią kropkę z informacją o wydarzeniu, na który użytkownik kliknął wcześniej
    const $pointer = $(".pointer");
    $pointer.removeClass("active");
    setTimeout(()=>{
        $pointer.remove();
    }, 300);
    // Resetujemy aktywny tytuł
    activeTitle = '';
    // Sprawdzamy, czy użytkownik kliknął na element z listy i czy ten element nie posiada klasy hide
    // Jeżeli szerokość ekranu jest większa 768px to użytkownik może kliknąć na inny element z listy
    // Elementy z listy, którzy posiadają klasę hide są schowane, gdy szerokość ekranu jest mniejsza, niż 768px
    // Czyli wtedy ignorujemy klik na element z listy
    if ($target.hasClass("list__item") && (!$target.hasClass("hide") || window.innerWidth >= 768)) {
        // Tworzymy nasz punkt z zawartościami i inicjujemy go w DOM
        const $pointer1 = _pointer.createPointer();
        // Nadajemy dla activeTitle aktualny tytuł wydarzenia (np. "Paris Air Show")
        activeTitle = $target.text();
        // AddEventListener, gdy użytkownik zmniejsza/zwiększa rozmiar ekran, to punkt, zostaje cały czas na miejscu 
        $(window).on("resize", ()=>{
            activeTitle && _pointer.showPointer($pointer1, activeTitle);
        });
        // Nadajemy pozycje dla naszego punkta i również w tej funkcji przesuwamy mapę według osi X w odpowiednie miejsce,
        // albo jeżeli obraz mapy nie jest ucięty (czyli zajmuje szerokość 100%) to pokazujemy punkt na mapie bez samego przesuwania
        _pointer.showPointer($pointer1, $target.text());
        // Nadajemy tekst dla naszego elementów, które znajdują się w div'e "pointer"
        $(".line__top-text").text($target.text());
        $(".line__bottom-text").text($target.data("subtitle"));
        // W ten moment chowamy tytuł "World ahead", nadając mu klasę w DOM "hide" 
        $introTitle.addClass("hide");
        // Zmieniamy kolor wszystkich elementów z listy, nadając im klasę hide.
        $listItems.addClass("hide");
        // Usuwamy klasę hide z elementu, na który kliknęliśmy, by pokazać, że jest aktywny
        window.innerWidth > 768 && $target.removeClass("hide");
        // Wyświetlamy nasz punkt na mapie
        $pointer1.addClass("active");
    } else {
        // Gdy użytkownik wcześniej kliknął na element z listy i póżniej kliknął gdzieś indziej, to mapa wraca na standardową pozycję,  
        // a elementy z listy wracają w standardowy stan (w stan przed kliknięciem na element z listy)
        $imageMap.css("left", "50%");
        $introTitle.removeClass("hide");
        $listItems.removeClass("hide");
    }
});

},{"./pointer":"doltY","./mobile-nav":"lnBU7","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"doltY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createPointer", ()=>createPointer
);
parcelHelpers.export(exports, "showPointer", ()=>showPointer
);
var _main = require("./main");
// W eventsDetails znajduje się lista obiektów. W każdym obiekcie znajduje się tytuł wydarzenia oraz jego koordynaty, a ta informacja jest pobrana z każdego elementa, który posiada klasę "area-position"
const $areas = document.querySelectorAll(".area-position");
const eventsDetails = [];
function createPointer() {
    const $pointer = $(`\n    <div class="pointer">\n        <div class="line">\n            <span class="line__top-text">\n            </span>\n            <span class="line__bottom-text">\n            </span>\n        </div>\n    </div>`);
    $("body").append($pointer);
    return $pointer;
}
function showPointer(el, title) {
    // Potrzebne ono jest, gdy obraz mapy się zwiększa bądź się zmniejsza to wtedy my bierzemy współczynnik rozmiaru mapy powiększonnej/pomniejszonej i jej standardowego rozmiaru
    const defaultMapSizes = [
        1556,
        787
    ];
    // Potrzebne ono jest na obliczenie x y dla punktu
    const imageMapPosition = _main.$imageMap[0].getBoundingClientRect();
    const eventCoords = eventsDetails.filter((event)=>event.title === title
    )[0]['coords'];
    const [coordsX, coordsY] = eventCoords;
    const imageMapPositionX = imageMapPosition['x'];
    const imageMapPositionY = imageMapPosition['y'];
    // Otrzymujemy koordynaty, które uwzględniają jaki jest rozmiar mapy, szerokość/wysokość ekranu
    const pointerX = coordsX + imageMapPositionX;
    const pointerY = coordsY + imageMapPositionY;
    // Jeżeli mapa nie jest ucięta, to wtedy pokazujemy punkt na mapie bez kręcenia mapy.
    // W przeciwnym wypadku (gdy mapa jest ucięta, chociaż na 2px, to mapa się obraca do punktu.
    if (imageMapPosition['x'] === 0) {
        const posY = coordsY * (imageMapPosition['height'] / defaultMapSizes[1]);
        const posX = coordsX * (imageMapPosition['width'] / defaultMapSizes[0]) + imageMapPositionX;
        el.css("left", posX);
        el.css("top", posY);
    } else {
        moveMap(coordsX, imageMapPosition, defaultMapSizes);
        el.css("left", "50%");
        el.css("top", Math.floor(pointerY * (imageMapPosition['height'] / defaultMapSizes[1])) + "px");
    }
    // Jest przyznaczone dla wyświetlenia linii, ktora jest przyczepiona do punktu z lewej, czy z prawej strony. Działa w ekstra wypadkach, gdy punkty będą znajdować się na końcu mapy
    const lineWidth = 240;
    const distanceBetweenCircleAndLine = 22.4;
    $(".line").css("cssText", pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "left: 1.4rem" : "right: 1.4rem");
    $(".line__top-text").css("cssText", pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "right: 0;" : "left: 0;");
    $(".line__bottom-text").css("cssText", pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "right: 0;" : "left: 0;");
}
// Otrzymujemy dane wydarzenia, czyli koordynaty i nazwę tego wydarzenia, otrzymując obiekt i ten obiekt wstawiamy do zmiennej eventsDetails.
$areas.forEach((area)=>{
    eventsDetails.push({
        title: area.title,
        coords: area.coords.split(",").map((val)=>+val
        ).slice(0, 2)
    });
});
// Funkcja do przesuwania mapy
function moveMap(coords, imageMapPosition, mapSize) {
    _main.$imageMap.css('left', `calc(50% + ${Math.floor(imageMapPosition.width / 2 - coords * (imageMapPosition.width / mapSize[0]))}px)`);
}

},{"./main":"38Jk0","@parcel/transformer-js/src/esmodule-helpers.js":"JacNc"}],"JacNc":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule') return;
        // Skip duplicate re-exports when they have the same value.
        if (key in dest && dest[key] === source[key]) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"lnBU7":[function(require,module,exports) {
// mobileNav jest przeznaczony dla nawigacji, która jest dostępna, gdy szerokość ekranu jest mniejsza, niż 768px
// Otrzymujemy element z DOM
const $mobileNav = $(".nav-mobile__background");
// Przy kliknięciu otwiera się nawigacja 
// Element .nav__btn pokazuje się na ekranie, gdy szerokość jest mniejsza, niż 768px
$(".nav__btn").on("click", ()=>{
    $mobileNav.addClass("active");
});
// W tym przypadku nawigacja zamyka się
$(".nav-mobile__btn").on("click", ()=>{
    $mobileNav.removeClass("active");
});

},{}]},["lDN0V","38Jk0"], "38Jk0", "parcelRequire54fc")

//# sourceMappingURL=index.4645a5bb.js.map
