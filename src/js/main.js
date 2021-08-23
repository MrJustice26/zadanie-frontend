import { createPointer, drawPointer } from "./pointer";

const $listItems = document.querySelectorAll(".list__item")
const $introTitle = document.querySelector(".intro__title")
const $dropdown = document.querySelector(".dropdown")


const desiredColor = "#700507";




let activeTitle;


$dropdown.querySelector(".dropdown__btn").addEventListener("click", (e) => {
    $dropdown.classList.toggle("active")
})

document.addEventListener('click', (e) => {


    // Jeżeli użytkownik kliknąl na element z listy i jeżeli aktywny element z listy jest ten samy,
    // to nic się nie dzieje
    if(activeTitle === e.target.textContent){
        return
    }
    
    const $pointer = document.querySelectorAll(".pointer")
    $pointer?.forEach(el => {
        el.classList.remove("active")
        setTimeout(() => {
            el.remove()
        }, 300)
    })
    activeTitle = ''

    
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






