import { createPointer, drawPointer } from "./pointer";
import { toColor } from "./utils";

const $listItems = document.querySelectorAll(".list__item")
const $introTitle = document.querySelector(".intro__title")
const $dropdown = document.querySelector(".dropdown")

export const $imageMap = document.querySelector(".user-map")






let activeTitle;



// Dodajemy eventListener na przycisk dropdown'a, gdy użytkownik klika na container, w którym są nadpis PL i strzałka w dół to nasz dropdown się otwiera.
$dropdown.querySelector(".dropdown__btn").addEventListener("click", (e) => {
    $dropdown.classList.toggle("active")
})

document.addEventListener('click', (e) => {
    
    

    // Jeżeli użytkownik kliknąl na element z listy i jeżeli aktywny element z listy jest identyczny bądź jest ten samy,
    // to nic się nie dzieje
    if(activeTitle === e.target.textContent){
        return
    }
    

    // Gdy użytkownik kliknął na element z listy i on jest aktywny i później klika na następny element (nie identycznego do poprzedniego)
    // To usuwamy poprzednią kropkę z informacją o wydarzeniu, na który użytkownik kliknął wcześniej
    const $pointer = document.querySelectorAll(".pointer")
    $pointer?.forEach(el => {
        el.classList.remove("active")
        setTimeout(() => {
            el.remove()
        }, 300)
    })

    // Resetujemy aktywny tytuł
    activeTitle = ''

    
    // Sprawdzamy, czy użytkownik kliknął na element z listy
    if(e.target.classList.contains("list__item")){

        // Tworzymy punkt do pokazania na naszej mapie
        const $pointer = createPointer();

        // Nadajemy dla activeTitle aktualny tytuł wydarzenia (np. "Paris Air Show")
        activeTitle = e.target.textContent

        // Nadajemy pozycje dla naszego punkta i również w tej funkcji przesuwamy mapę według osi X w odpowiednie miejsce
        drawPointer($pointer, e.target.textContent)

        // Nadajemy tekst dla naszego tekstu, który znajduje się nad linią i pod linią ( ta linia jest przyczepiona do punktu )
        $pointer.querySelector(".line__top-text").textContent = e.target.textContent
        $pointer.querySelector(".line__bottom-text").textContent = e.target.dataset.subtitle

        // W ten moment chowamy tytuł "World ahead", nadając mu klasę w DOM "hide" 
        $introTitle.classList.add("hide")

        // Utylita, zmieniająca kolor wszystkich elementów z listy na odpowiedni, który podaliśmy jako drugi argument.
        toColor($listItems, window.innerWidth > 600 ? "rgba(112, 5, 7, 1)" : "rgba(112, 5, 7, 0)")

        // Nadajemy kolor biały dla aktywnego elementu z listy, czyli element, na który użytkownik kliknął
        window.innerWidth > 600 && (e.target.style.color = "white")

        // Pokazujemy nasz punkt na mapie
        $pointer.classList.add("active")
    } 
    else {

        // Gdy użytkownik wcześniej kliknął na element z listy i póżniej kliknął gdzieś indziej, to mapa wraca na standardową pozycję,  
        // a elementy z listy wracają w standardowy stan (w stan przed kliknięciem)
        $imageMap.style.left = "50%";
        $introTitle.classList.remove("hide") 
        toColor($listItems, "#fff")
    }
})

const $mobileNav = document.querySelector(".nav-mobile__background")

document.querySelector(".nav__btn").addEventListener("click", () => {
    $mobileNav.classList.add("active")
})

document.querySelector(".nav-mobile__btn").addEventListener("click", () => {
    $mobileNav.classList.remove("active")
})






