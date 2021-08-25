// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
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
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/pointer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPointer = createPointer;
exports.drawPointer = drawPointer;
exports.generateCoords = generateCoords;

var _main = require("./main");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var $areas = document.querySelectorAll(".area-position");
var eventsPlace = [];

function createPointer() {
  // Tworzymy nasz element
  var $pointer = $("\n    <div class=\"pointer\">\n        <div class=\"line\">\n            <span class=\"line__top-text\">\n            </span>\n            <span class=\"line__bottom-text\">\n            </span>\n        </div>\n    </div>"); // Nadajemy dla div elementa klasę pointer
  // $pointer.addClass("pointer")
  // Wstawiamy w div kontent HTML

  $("body").append($pointer); // Wstawiamy nasz div "pointer" do dokumentu DOM
  // document.body.appendChild($pointer)
  // // Dodajemy 2 eventListenery przy skrolowaniu, bądź przy zmniejszeniu/zwiększeniu ekranu punkt zostaje w tym samym miejscu i nigdzie nie zjeżdża
  // window.addEventListener("scroll", () => {
  //     activeTitle && drawPointer($pointer, activeTitle)
  // })
  // window.addEventListener("resize", () => {
  //     activeTitle && drawPointer($pointer, activeTitle)
  // })

  return $pointer;
}

function drawPointer(el, title) {
  var defaultMapSizes = [1556, 787];

  var imageMapPosition = _main.$imageMap[0].getBoundingClientRect();

  var _generateCoords = generateCoords(title, imageMapPosition),
      _generateCoords2 = _slicedToArray(_generateCoords, 4),
      coordsX = _generateCoords2[0],
      imageMapPositionX = _generateCoords2[1],
      coordsY = _generateCoords2[2],
      imageMapPositionY = _generateCoords2[3];

  var pointerX = coordsX + imageMapPositionX;
  var pointerY = coordsY + imageMapPositionY;
  moveMap(coordsX, imageMapPosition, defaultMapSizes);
  el.css("left", "50%");
  var lineWidth = 240;
  var distanceBetweenCircleAndLine = 22.4;
  $(".line").css("cssText", pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "left: 1.4rem" : "right: 1.4rem");
  $(".line__top-text").css("cssText", pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "right: 0;" : "left: 0;");
  $(".line__bottom-text").css("cssText", pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "right: 0;" : "left: 0;");
  el.css("top", Math.floor(pointerY * (imageMapPosition['height'] / defaultMapSizes[1])) + "px");
}

function generateCoords(title, imageMapPosition) {
  // eventCoords - zmienna, w której znajduje się nazwa eventu i koordynaty (x, y) gdzie dane wydarzenie się odbędzie
  var eventCoords = eventsPlace.filter(function (event) {
    return event.title === title;
  })[0]['coords'];

  var _eventCoords = _slicedToArray(eventCoords, 2),
      coordsX = _eventCoords[0],
      coordsY = _eventCoords[1];

  var x = imageMapPosition.x,
      y = imageMapPosition.y;
  return [coordsX, x, coordsY, y];
}

$areas.forEach(function (area) {
  eventsPlace.push({
    title: area.title,
    coords: area.coords.split(",").map(function (val) {
      return +val;
    }).slice(0, 2)
  });
});

function moveMap(coords, imageMapPosition, mapSize) {
  _main.$imageMap.css('left', "calc(50% + ".concat(Math.floor(imageMapPosition.width / 2 - coords * (imageMapPosition.width / mapSize[0])), "px)"));
}
},{"./main":"js/main.js"}],"js/main.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$imageMap = void 0;

var _pointer = require("./pointer");

var $listItems = $(".list__item");
var $introTitle = $(".intro__title");
var $dropdown = $(".dropdown");
var $imageMap = $(".user-map");
exports.$imageMap = $imageMap;
var activeTitle; // Dodajemy eventListener na przycisk dropdown'a, gdy użytkownik klika na container, w którym są nadpis PL i strzałka w dół to nasz dropdown się otwiera.

$(".dropdown__btn").on("click", function (e) {
  $dropdown.toggleClass("active");
});
$(document).on('click', function (e) {
  var $target = $(e.target); // Jeżeli użytkownik kliknąl na element z listy i jeżeli aktywny element z listy jest identyczny bądź jest ten samy,
  // to nic się nie dzieje

  if (activeTitle === $target.text()) {
    return;
  } // Gdy użytkownik kliknął na element z listy i on jest aktywny i później klika na następny element (nie identycznego do poprzedniego)
  // To usuwamy poprzednią kropkę z informacją o wydarzeniu, na który użytkownik kliknął wcześniej


  var $pointer = $(".pointer");
  $pointer.removeClass("active");
  $pointer.remove(); // console.log($pointer)
  // $pointer?.forEach(el => {
  //     el.classList.remove("active")
  //     setTimeout(() => {
  //         el.remove()
  //     }, 300)
  // })
  // Resetujemy aktywny tytuł

  activeTitle = ''; // Sprawdzamy, czy użytkownik kliknął na element z listy

  if ($target.hasClass("list__item")) {
    // Tworzymy punkt do pokazania na naszej mapie
    var _$pointer = (0, _pointer.createPointer)(); // Nadajemy dla activeTitle aktualny tytuł wydarzenia (np. "Paris Air Show")


    activeTitle = $target.text(); // Nadajemy pozycje dla naszego punkta i również w tej funkcji przesuwamy mapę według osi X w odpowiednie miejsce

    (0, _pointer.drawPointer)(_$pointer, $target.text()); // Nadajemy tekst dla naszego tekstu, który znajduje się nad linią i pod linią ( ta linia jest przyczepiona do punktu )

    $(".line__top-text").text($target.text());
    $(".line__bottom-text").text($target.data("subtitle")); // W ten moment chowamy tytuł "World ahead", nadając mu klasę w DOM "hide" 

    $introTitle.addClass("hide"); // Zmieniamy kolor wszystkich elementów z listy.

    $listItems.css('color', "".concat(window.innerWidth > 600 ? "rgba(112, 5, 7, 1)" : "rgba(112, 5, 7, 0)")); // Nadajemy kolor biały dla aktywnego elementu z listy, czyli element, na który użytkownik kliknął

    window.innerWidth > 600 && $target.css("color", "#fff"); // Pokazujemy nasz punkt na mapie

    _$pointer.addClass("active");
  } else {
    // Gdy użytkownik wcześniej kliknął na element z listy i póżniej kliknął gdzieś indziej, to mapa wraca na standardową pozycję,  
    // a elementy z listy wracają w standardowy stan (w stan przed kliknięciem)
    $imageMap.css("left", "50%");
    $introTitle.removeClass("hide");
    $listItems.css('color', "#fff");
  }
});
var $mobileNav = $(".nav-mobile__background");
$(".nav__btn").on("click", function () {
  $mobileNav.addClass("active");
});
$(".nav-mobile__btn").on("click", function () {
  $mobileNav.removeClass("active");
});
},{"./pointer":"js/pointer.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "24329" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map