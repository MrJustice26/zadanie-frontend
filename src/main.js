
const $listItems = document.querySelectorAll(".list__item")
const $introTitle = document.querySelector(".intro__title")
const desiredColor = "#700507";
document.addEventListener('click', (e) => {
    
    console.log(e.target.closest(".dropdown"))
    if(e.target.classList.contains("list__item")){
        $introTitle.classList.add("hide")
        toColor($listItems, desiredColor)
        e.target.style.color = "white"
    } else if(e.target?.closest(".dropdown")?.classList.contains("dropdown")) {
        e.target?.closest(".dropdown")?.classList.toggle("active")
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

