const $imageMap = document.querySelector(".user-map")
const $areas = document.querySelectorAll(".area-position")
const eventsPlace = []

let eventCoordsCalcX;

export function createPointer(){
    const $pointer = document.createElement("div")
    $pointer.classList.add("pointer")
    $pointer.insertAdjacentHTML("afterbegin", `
        <div class="line">
            <span class="line__top-text">
            </span>
            <span class="line__bottom-text">
            </span>
        </div>
    `)
    document.body.appendChild($pointer)
    window.addEventListener("scroll", () => {
        activeTitle && drawPointer($pointer, activeTitle)
    })
    window.addEventListener("resize", () => {
        activeTitle && drawPointer($pointer, activeTitle)
    })
    return $pointer;
}


export function drawPointer(el, title){
    
    
    const imageMapPosition = $imageMap.getBoundingClientRect()
    const [coordsX, imageMapPositionX, coordsY, imageMapPositionY] = generateCoords(title,imageMapPosition)
    
    const pointerX = coordsX + imageMapPositionX
    const pointerY = coordsY + imageMapPositionY + window.pageYOffset
    $imageMap.style.left = `calc(50% + ${imageMapPosition.width/2-coordsX}px)`
    el.style.left = `50%`
    
    const lineWidth = 240;
    const distanceBetweenCircleAndLine = 22.4
    

    el.querySelector(".line").style.cssText = pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "left: 1.4rem" : "right: 1.4rem";
    el.querySelector(".line__top-text").style.cssText = pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "right: 0;" : "left: 0;";
    el.querySelector(".line__bottom-text").style.cssText = pointerX - distanceBetweenCircleAndLine - lineWidth + 59 < 0 ? "right: 0;" : "left: 0;";
    
    el.style.top = pointerY + "px"
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