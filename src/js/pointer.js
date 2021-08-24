import {$imageMap } from "./main"

const $areas = document.querySelectorAll(".area-position")
const eventsPlace = []

export function createPointer(){
    // Tworzymy nasz element
    const $pointer = document.createElement("div")
    // Nadajemy dla div elementa klasę pointer
    $pointer.classList.add("pointer")
    // Wstawiamy w div kontent HTML
    $pointer.insertAdjacentHTML("afterbegin", `
        <div class="line">
            <span class="line__top-text">
            </span>
            <span class="line__bottom-text">
            </span>
        </div>
    `)
    // Wstawiamy nasz div "pointer" do dokumentu DOM
    document.body.appendChild($pointer)
    
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
    
    const imageMapPosition = $imageMap.getBoundingClientRect()
    const [coordsX, imageMapPositionX, coordsY, imageMapPositionY] = generateCoords(title,imageMapPosition)
    const pointerX = coordsX + imageMapPositionX
    console.log(coordsY)
    const pointerY = coordsY + imageMapPositionY
    moveMap(coordsX, imageMapPosition, defaultMapSizes)
    el.style.left = `50%`
    
    const lineWidth = 240;
    const distanceBetweenCircleAndLine = 22.4
    

    el.querySelector(".line").style.cssText = pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "left: 1.4rem" : "right: 1.4rem";
    el.querySelector(".line__top-text").style.cssText = pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "right: 0;" : "left: 0;";
    el.querySelector(".line__bottom-text").style.cssText = pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "right: 0;" : "left: 0;";
    
    el.style.top = Math.floor(pointerY*(imageMapPosition['height']/defaultMapSizes[1])) + "px"
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
    console.log(imageMapPosition,coords, mapSize)
    $imageMap.style.left = `calc(50% + ${Math.floor(imageMapPosition.width/2-coords*(imageMapPosition.width/mapSize[0]))}px)`
}