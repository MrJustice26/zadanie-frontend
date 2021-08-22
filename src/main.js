
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

document.addEventListener('click', (e) => {
    const pointer = document.querySelector(".pointer")
    pointer?.classList.remove("active")
    setTimeout(() => {
        pointer?.remove()
    }, 300)
    if($dropdown.classList.contains("active")) {
        $dropdown.classList.remove("active")
        return
    }
    if($pointer?.classList.contains("active")){
        $pointer.classList.remove("active")
    }
    if(e.target.classList.contains("list__item")){
        const $pointer = createPointer();
        activeTitle = e.target.textContent
        
        drawPointer($pointer, e.target.textContent)
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

function createPointer(){
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
    window.addEventListener("resize", () => {
        activeTitle && drawPointer($pointer, activeTitle)
    })
    return $pointer;
}

function removePointer(el){
    el.remove()
}

function drawPointer(el, title){
    const eventShow = eventsPlace.filter(event => event.title === title)[0]
    const coords = eventShow['coords']
    const imageMapPosition = $imageMap.getBoundingClientRect()
    const [x, y] = coords

    pointerX = x + imageMapPosition['x']
    pointerY = y + imageMapPosition['y']

    el.style.top = pointerY + "px"
    el.style.left = pointerX + "px"
}


