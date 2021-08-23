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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var $imageMap = document.querySelector(".user-map");
var $areas = document.querySelectorAll(".area-position");
var eventsPlace = [];
var eventCoordsCalcX;

function createPointer() {
  var $pointer = document.createElement("div");
  $pointer.classList.add("pointer");
  $pointer.insertAdjacentHTML("afterbegin", "\n        <div class=\"line\">\n            <span class=\"line__top-text\">\n            </span>\n            <span class=\"line__bottom-text\">\n            </span>\n        </div>\n    ");
  document.body.appendChild($pointer);
  window.addEventListener("scroll", function () {
    activeTitle && drawPointer($pointer, activeTitle);
  });
  window.addEventListener("resize", function () {
    activeTitle && drawPointer($pointer, activeTitle);
  });
  return $pointer;
}

function drawPointer(el, title) {
  var imageMapPosition = $imageMap.getBoundingClientRect();

  var _generateCoords = generateCoords(title, imageMapPosition),
      _generateCoords2 = _slicedToArray(_generateCoords, 4),
      coordsX = _generateCoords2[0],
      imageMapPositionX = _generateCoords2[1],
      coordsY = _generateCoords2[2],
      imageMapPositionY = _generateCoords2[3];

  var pointerX = coordsX + imageMapPositionX;
  var pointerY = coordsY + imageMapPositionY + window.pageYOffset;
  $imageMap.style.left = "calc(50% + ".concat(imageMapPosition.width / 2 - coordsX, "px)");
  el.style.left = "50%";
  var lineWidth = 240;
  var distanceBetweenCircleAndLine = 22.4;
  el.querySelector(".line").style.cssText = pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "left: 1.4rem" : "right: 1.4rem";
  el.querySelector(".line__top-text").style.cssText = pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "right: 0;" : "left: 0;";
  el.querySelector(".line__bottom-text").style.cssText = pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "right: 0;" : "left: 0;";
  el.style.top = pointerY + "px";
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
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

var _pointer = require("./pointer");

var $listItems = document.querySelectorAll(".list__item");
var $introTitle = document.querySelector(".intro__title");
var $dropdown = document.querySelector(".dropdown");
var desiredColor = "#700507";
var activeTitle;
$dropdown.querySelector(".dropdown__btn").addEventListener("click", function (e) {
  $dropdown.classList.toggle("active");
});
document.addEventListener('click', function (e) {
  // Jeżeli użytkownik kliknąl na element z listy i jeżeli aktywny element z listy jest ten samy,
  // to nic się nie dzieje
  if (activeTitle === e.target.textContent) {
    return;
  }

  var $pointer = document.querySelectorAll(".pointer");
  $pointer === null || $pointer === void 0 ? void 0 : $pointer.forEach(function (el) {
    el.classList.remove("active");
    setTimeout(function () {
      el.remove();
    }, 300);
  });
  activeTitle = '';

  if (e.target.classList.contains("list__item")) {
    var _$pointer = (0, _pointer.createPointer)();

    activeTitle = e.target.textContent;
    (0, _pointer.drawPointer)(_$pointer, e.target.textContent);
    _$pointer.querySelector(".line__top-text").textContent = e.target.textContent;
    _$pointer.querySelector(".line__bottom-text").textContent = e.target.dataset.subtitle;
    $introTitle.classList.add("hide");
    toColor($listItems, desiredColor);
    e.target.style.color = "white";

    _$pointer.classList.add("active");
  } else {
    $introTitle.classList.remove("hide");
    toColor($listItems, "#fff");
  }
});

function toColor(arr, color) {
  arr.forEach(function (item) {
    item.style.color = color;
  });
}
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "20279" + '/');

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