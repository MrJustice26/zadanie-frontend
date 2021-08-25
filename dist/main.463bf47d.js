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
})({"ygHa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPointer = createPointer;
exports.showPointer = showPointer;

var _main = require("./main");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// W eventsDetails znajduje się lista obiektów. W każdym obiekcie znajduje się tytuł wydarzenia oraz jego koordynaty, a ta informacja jest pobrana z każdego elementa, który posiada klasę "area-position"
var $areas = document.querySelectorAll(".area-position");
var eventsDetails = [];

function createPointer() {
  var $pointer = $("\n    <div class=\"pointer\">\n        <div class=\"line\">\n            <span class=\"line__top-text\">\n            </span>\n            <span class=\"line__bottom-text\">\n            </span>\n        </div>\n    </div>");
  $("body").append($pointer);
  return $pointer;
}

function showPointer(el, title) {
  // Potrzebne ono jest, gdy obraz mapy się zwiększa bądź się zmniejsza to wtedy my bierzemy współczynnik rozmiaru mapy powiększonnej/pomniejszonej i jej standardowego rozmiaru
  var defaultMapSizes = [1556, 787]; // Potrzebne ono jest na obliczenie x y dla punktu

  var imageMapPosition = _main.$imageMap[0].getBoundingClientRect();

  var eventCoords = eventsDetails.filter(function (event) {
    return event.title === title;
  })[0]['coords'];

  var _eventCoords = _slicedToArray(eventCoords, 2),
      coordsX = _eventCoords[0],
      coordsY = _eventCoords[1];

  var imageMapPositionX = imageMapPosition['x'];
  var imageMapPositionY = imageMapPosition['y']; // Otrzymujemy koordynaty, które uwzględniają jaki jest rozmiar mapy, szerokość/wysokość ekranu

  var pointerX = coordsX + imageMapPositionX;
  var pointerY = coordsY + imageMapPositionY; // Jeżeli mapa nie jest ucięta, to wtedy pokazujemy punkt na mapie bez kręcenia mapy.
  // W przeciwnym wypadku (gdy mapa jest ucięta, chociaż na 2px, to mapa się obraca do punktu.

  if (imageMapPosition['x'] === 0) {
    var posY = coordsY * (imageMapPosition['height'] / defaultMapSizes[1]);
    var posX = coordsX * (imageMapPosition['width'] / defaultMapSizes[0]) + imageMapPositionX;
    el.css("left", posX);
    el.css("top", posY);
  } else {
    moveMap(coordsX, imageMapPosition, defaultMapSizes);
    el.css("left", "50%");
    el.css("top", Math.floor(pointerY * (imageMapPosition['height'] / defaultMapSizes[1])) + "px");
  } // Jest przyznaczone dla wyświetlenia linii, ktora jest przyczepiona do punktu z lewej, czy z prawej strony. Działa w ekstra wypadkach, gdy punkty będą znajdować się na końcu mapy


  var lineWidth = 240;
  var distanceBetweenCircleAndLine = 22.4;
  $(".line").css("cssText", pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "left: 1.4rem" : "right: 1.4rem");
  $(".line__top-text").css("cssText", pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "right: 0;" : "left: 0;");
  $(".line__bottom-text").css("cssText", pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "right: 0;" : "left: 0;");
} // Otrzymujemy dane wydarzenia, czyli koordynaty i nazwę tego wydarzenia, otrzymując obiekt i ten obiekt wstawiamy do zmiennej eventsDetails.


$areas.forEach(function (area) {
  eventsDetails.push({
    title: area.title,
    coords: area.coords.split(",").map(function (val) {
      return +val;
    }).slice(0, 2)
  });
}); // Funkcja do przesuwania mapy

function moveMap(coords, imageMapPosition, mapSize) {
  _main.$imageMap.css('left', "calc(50% + ".concat(Math.floor(imageMapPosition.width / 2 - coords * (imageMapPosition.width / mapSize[0])), "px)"));
}
},{"./main":"d6sW"}],"TlvA":[function(require,module,exports) {
// mobileNav jest przeznaczony dla nawigacji, która jest dostępna, gdy szerokość ekranu jest mniejsza, niż 768px
// Otrzymujemy element z DOM
var $mobileNav = $(".nav-mobile__background"); // Przy kliknięciu otwiera się nawigacja 
// Element .nav__btn pokazuje się na ekranie, gdy szerokość jest mniejsza, niż 768px

$(".nav__btn").on("click", function () {
  $mobileNav.addClass("active");
}); // W tym przypadku nawigacja zamyka się

$(".nav-mobile__btn").on("click", function () {
  $mobileNav.removeClass("active");
});
},{}],"d6sW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$imageMap = void 0;

var _pointer = require("./pointer");

require("./mobile-nav");

// Otrzymujemy elementy z DOM
var $listItems = $(".list__item");
var $introTitle = $(".intro__title");
var $dropdown = $(".dropdown");
var $imageMap = $(".user-map"); // Jest przydatne dla sprawdzenia, czy użytkownik kliknął 

exports.$imageMap = $imageMap;
var activeTitle; // Dodajemy eventListener na przycisk dropdown'a, gdy użytkownik klika na container, w którym są nadpis PL i strzałka w dół to nasz dropdown się otwiera.

$(".dropdown__btn").on("click", function (e) {
  setTimeout(function () {
    $dropdown.toggleClass("active");
  }, 1);
}); // AddEventListener, gdy użytkownik w coś kliknął na stronie 

$(document).on('click', function (e) {
  var $target = $(e.target); // Sprawdza, czy dropdown jest aktywny i gdy nie klikneliśmy w coś wewnątrz dropdown'a, wtedy go zamykamy

  if (!$target.parents(".dropdown").hasClass("dropdown") && !$target.hasClass("dropdown")) {
    $dropdown.removeClass("active");
  } // Jeżeli użytkownik kliknąl na element z listy i jeżeli aktywny element z listy jest identyczny bądź jest ten samy,
  // to nic się nie dzieje


  if (activeTitle === $target.text()) {
    return;
  } // Gdy użytkownik kliknął na element z listy i on jest aktywny i później klika na następny element (nie identycznego do poprzedniego)
  // To usuwamy poprzednią kropkę z informacją o wydarzeniu, na który użytkownik kliknął wcześniej


  var $pointer = $(".pointer");
  $pointer.removeClass("active");
  $pointer.remove(); // Resetujemy aktywny tytuł

  activeTitle = ''; // Sprawdzamy, czy użytkownik kliknął na element z listy i czy ten element nie posiada klasy hide
  // Jeżeli szerokość ekranu jest większa 768px to użytkownik może kliknąć na inny element z listy
  // Elementy z listy, którzy posiadają klasę hide są schowane, gdy szerokość ekranu jest mniejsza, niż 768px
  // Czyli wtedy ignorujemy klik na element z listy

  if ($target.hasClass("list__item") && (!$target.hasClass("hide") || window.innerWidth >= 768)) {
    // Tworzymy nasz punkt z zawartościami i inicjujemy go w DOM
    var _$pointer = (0, _pointer.createPointer)(); // Nadajemy dla activeTitle aktualny tytuł wydarzenia (np. "Paris Air Show")


    activeTitle = $target.text(); // AddEventListener, gdy użytkownik zmniejsza/zwiększa rozmiar ekran, to punkt, zostaje cały czas na miejscu 

    $(window).on("resize", function () {
      activeTitle && (0, _pointer.showPointer)(_$pointer, activeTitle);
    }); // Nadajemy pozycje dla naszego punkta i również w tej funkcji przesuwamy mapę według osi X w odpowiednie miejsce,
    // albo jeżeli obraz mapy nie jest ucięty (czyli zajmuje szerokość 100%) to pokazujemy punkt na mapie bez samego przesuwania

    (0, _pointer.showPointer)(_$pointer, $target.text()); // Nadajemy tekst dla naszego elementów, które znajdują się w div'e "pointer"

    $(".line__top-text").text($target.text());
    $(".line__bottom-text").text($target.data("subtitle")); // W ten moment chowamy tytuł "World ahead", nadając mu klasę w DOM "hide" 

    $introTitle.addClass("hide"); // Zmieniamy kolor wszystkich elementów z listy, nadając im klasę hide.

    $listItems.addClass("hide"); // Usuwamy klasę hide z elementu, na który kliknęliśmy, by pokazać, że jest aktywny

    window.innerWidth > 768 && $target.removeClass("hide"); // Wyświetlamy nasz punkt na mapie

    _$pointer.addClass("active");
  } else {
    // Gdy użytkownik wcześniej kliknął na element z listy i póżniej kliknął gdzieś indziej, to mapa wraca na standardową pozycję,  
    // a elementy z listy wracają w standardowy stan (w stan przed kliknięciem na element z listy)
    $imageMap.css("left", "50%");
    $introTitle.removeClass("hide");
    $listItems.removeClass("hide");
  }
});
},{"./pointer":"ygHa","./mobile-nav":"TlvA"}]},{},["d6sW"], null)
//# sourceMappingURL=/main.463bf47d.js.map