
const $listItems = document.querySelectorAll(".list__item")
const $introTitle = document.querySelector(".intro__title")
const $dropdown = document.querySelector(".dropdown")


const desiredColor = "#700507";

const $areas = document.querySelectorAll(".area-position")
const $imageMap = document.querySelector(".user-map")
const eventsPlace = []

const $pointer = document.querySelector(".pointer");
let activeTitle;
$areas.forEach(area => {  
    eventsPlace.push(
        {
            title: area.title,
            coords: area.coords.split(",").map(val => +val).slice(0,2)
        }
    )  
})
window.addEventListener("resize", () => {
    activeTitle && drawPointer(activeTitle)
})
document.addEventListener('click', (e) => {
    if($dropdown.classList.contains("active")) {
        $dropdown.classList.remove("active")
        return
    }
    if($pointer.classList.contains("active")){
        $pointer.classList.remove("active")
    }
    if(e.target.classList.contains("list__item")){
        activeTitle = e.target.textContent
        drawPointer(e.target.textContent)
        $pointer.querySelector(".line__top-text").textContent = e.target.textContent
        $pointer.querySelector(".line__bottom-text").textContent = e.target.dataset.subtitle
        $introTitle.classList.add("hide")
        toColor($listItems, desiredColor)
        e.target.style.color = "white"
        $pointer.classList.add("active")
    } else if(e.target?.closest(".dropdown")?.classList.contains("dropdown")) {
        $dropdown.classList.toggle("active")
    } 
    else {
        $introTitle.classList.remove("hide") 
        toColor($listItems, "#fff")
    }


})


function toColor(arr, color){
    arr.forEach(item => {
        item.style.color = color;
    })
}

function drawPointer(title){

    const eventShow = eventsPlace.filter(event => event.title === title)[0]
    const coords = eventShow['coords']
    const imageMapPosition = $imageMap.getBoundingClientRect()
    const [x, y] = coords

    pointerX = x + imageMapPosition['x']
    pointerY = y + imageMapPosition['y']

    $pointer.style.top = pointerY + "px"
    $pointer.style.left = pointerX + "px"
    console.log(pointerX, window.innerWidth)
    console.log(pointerY, window.innerHeight)
}


