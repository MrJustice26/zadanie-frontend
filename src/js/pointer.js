import {$imageMap } from "./main"

const $areas = document.querySelectorAll(".area-position")
const eventsPlace = []

export function createPointer(){
    // Tworzymy nasz element
    const $pointer = $(`
    <div class="pointer">
        <div class="line">
            <span class="line__top-text">
            </span>
            <span class="line__bottom-text">
            </span>
        </div>
    </div>`)
    // Nadajemy dla div elementa klasę pointer
    // $pointer.addClass("pointer")
    // Wstawiamy w div kontent HTML
    $("body").append($pointer)
    // Wstawiamy nasz div "pointer" do dokumentu DOM
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


export function drawPointer(el, title){
    const defaultMapSizes = [1556, 787]
    
    const imageMapPosition = $imageMap[0].getBoundingClientRect()
    const [coordsX, imageMapPositionX, coordsY, imageMapPositionY] = generateCoords(title,imageMapPosition)
    const pointerX = coordsX + imageMapPositionX
    const pointerY = coordsY + imageMapPositionY
    moveMap(coordsX, imageMapPosition, defaultMapSizes)
    el.css("left", "50%")
    
    const lineWidth = 240;
    const distanceBetweenCircleAndLine = 22.4
    

    $(".line").css("cssText", pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "left: 1.4rem" : "right: 1.4rem");
    $(".line__top-text").css("cssText", pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "right: 0;" : "left: 0;");
    $(".line__bottom-text").css("cssText", pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "right: 0;" : "left: 0;");
    
    el.css("top", Math.floor(pointerY*(imageMapPosition['height']/defaultMapSizes[1])) + "px")
}

export function generateCoords(title, imageMapPosition){

    // eventCoords - zmienna, w której znajduje się nazwa eventu i koordynaty (x, y) gdzie dane wydarzenie się odbędzie
    const eventCoords = eventsPlace.filter(event => event.title === title)[0]['coords'] 
    const [coordsX, coordsY] = eventCoords
    
    const {x, y} = imageMapPosition
    
    return [coordsX, x , coordsY, y]
}

$areas.forEach(area => {  
    eventsPlace.push(
        {
            title: area.title,
            coords: area.coords.split(",").map(val => +val).slice(0,2)
        }
    )  
})

function moveMap(coords, imageMapPosition, mapSize){
    $imageMap.css('left', `calc(50% + ${Math.floor(imageMapPosition.width/2-coords*(imageMapPosition.width/mapSize[0]))}px)`)
}