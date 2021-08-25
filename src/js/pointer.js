import {$imageMap} from "./main"

// W eventsDetails znajduje się lista obiektów. W każdym obiekcie znajduje się tytuł wydarzenia oraz jego koordynaty, a ta informacja jest pobrana z każdego elementa, który posiada klasę "area-position"
const $areas = document.querySelectorAll(".area-position")
const eventsDetails = []

export function createPointer(){
    const $pointer = $(`
    <div class="pointer">
        <div class="line">
            <span class="line__top-text">
            </span>
            <span class="line__bottom-text">
            </span>
        </div>
    </div>`)
    
    $("body").append($pointer)
    return $pointer;
}


export function showPointer(el, title){

    // Potrzebne ono jest, gdy obraz mapy się zwiększa bądź się zmniejsza to wtedy my bierzemy współczynnik rozmiaru mapy powiększonnej/pomniejszonej i jej standardowego rozmiaru
    const defaultMapSizes = [1556, 787]
    
    // Potrzebne ono jest na obliczenie x y dla punktu
    const imageMapPosition = $imageMap[0].getBoundingClientRect()

    
    const eventCoords = eventsDetails.filter(event => event.title === title)[0]['coords'] 

    const [coordsX, coordsY] = eventCoords
    const imageMapPositionX = imageMapPosition['x']
    const imageMapPositionY = imageMapPosition['y']
    // Otrzymujemy koordynaty, które uwzględniają jaki jest rozmiar mapy, szerokość/wysokość ekranu
    const pointerX = coordsX + imageMapPositionX
    const pointerY = coordsY + imageMapPositionY

    // Jeżeli mapa nie jest ucięta, to wtedy pokazujemy punkt na mapie bez kręcenia mapy.
    // W przeciwnym wypadku (gdy mapa jest ucięta, chociaż na 2px, to mapa się obraca do punktu.
    if(imageMapPosition['x'] === 0){
        
        const posY = coordsY*(imageMapPosition['height']/defaultMapSizes[1])
        const posX = coordsX*(imageMapPosition['width']/defaultMapSizes[0]) + imageMapPositionX
        el.css("left", posX)
        el.css("top", posY)
    } else {
        moveMap(coordsX, imageMapPosition, defaultMapSizes)
        el.css("left", "50%")
        el.css("top", Math.floor(pointerY*(imageMapPosition['height']/defaultMapSizes[1])) + "px")

    }
    
    
    // Jest przyznaczone dla wyświetlenia linii, ktora jest przyczepiona do punktu z lewej, czy z prawej strony. Działa w ekstra wypadkach, gdy punkty będą znajdować się na końcu mapy

    const lineWidth = 240;
    const distanceBetweenCircleAndLine = 22.4
    

    $(".line").css("cssText", pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "left: 1.4rem" : "right: 1.4rem");
    $(".line__top-text").css("cssText", pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "right: 0;" : "left: 0;");
    $(".line__bottom-text").css("cssText", pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "right: 0;" : "left: 0;");
}


// Otrzymujemy dane wydarzenia, czyli koordynaty i nazwę tego wydarzenia, otrzymując obiekt i ten obiekt wstawiamy do zmiennej eventsDetails.
$areas.forEach(area => {  
    eventsDetails.push(
        {
            title: area.title,
            coords: area.coords.split(",").map(val => +val).slice(0,2)
        }
    )  
})

// Funkcja do przesuwania mapy
function moveMap(coords, imageMapPosition, mapSize){
    $imageMap.css('left', `calc(50% + ${Math.floor(imageMapPosition.width/2-coords*(imageMapPosition.width/mapSize[0]))}px)`)
}