import { createPointer, drawPointer } from "./pointer";

const $listItems = $(".list__item")
const $introTitle = $(".intro__title")
const $dropdown = $(".dropdown")

export const $imageMap = $(".user-map")






let activeTitle;



// Dodajemy eventListener na przycisk dropdown'a, gdy użytkownik klika na container, w którym są nadpis PL i strzałka w dół to nasz dropdown się otwiera.
$(".dropdown__btn").on("click", (e) => {
    $dropdown.toggleClass("active")
})

$(document).on('click', (e) => {
    
    const $target = $(e.target)
    

    // Jeżeli użytkownik kliknąl na element z listy i jeżeli aktywny element z listy jest identyczny bądź jest ten samy,
    // to nic się nie dzieje
    if(activeTitle === $target.text()){
        return
    }
    

    // Gdy użytkownik kliknął na element z listy i on jest aktywny i później klika na następny element (nie identycznego do poprzedniego)
    // To usuwamy poprzednią kropkę z informacją o wydarzeniu, na który użytkownik kliknął wcześniej
    const $pointer = $(".pointer")
    $pointer.removeClass("active")
    $pointer.remove()
    // console.log($pointer)
    // $pointer?.forEach(el => {
    //     el.classList.remove("active")
    //     setTimeout(() => {
    //         el.remove()
    //     }, 300)
    // })

    // Resetujemy aktywny tytuł
    activeTitle = ''

    
    // Sprawdzamy, czy użytkownik kliknął na element z listy
    if($target.hasClass("list__item")){

        // Tworzymy punkt do pokazania na naszej mapie
        const $pointer = createPointer();

        // Nadajemy dla activeTitle aktualny tytuł wydarzenia (np. "Paris Air Show")
        activeTitle = $target.text()

        // Nadajemy pozycje dla naszego punkta i również w tej funkcji przesuwamy mapę według osi X w odpowiednie miejsce
        drawPointer($pointer, $target.text())

        // Nadajemy tekst dla naszego tekstu, który znajduje się nad linią i pod linią ( ta linia jest przyczepiona do punktu )
        $(".line__top-text").text($target.text())
        $(".line__bottom-text").text($target.data("subtitle"))

        // W ten moment chowamy tytuł "World ahead", nadając mu klasę w DOM "hide" 
        $introTitle.addClass("hide")

        // Zmieniamy kolor wszystkich elementów z listy.
        $listItems.css('color', `${window.innerWidth > 600 ? "rgba(112, 5, 7, 1)" : "rgba(112, 5, 7, 0)"}`)
        // Nadajemy kolor biały dla aktywnego elementu z listy, czyli element, na który użytkownik kliknął
        window.innerWidth > 600 && ($target.css("color", "#fff"))

        // Pokazujemy nasz punkt na mapie
        $pointer.addClass("active")
    } 
    else {

        // Gdy użytkownik wcześniej kliknął na element z listy i póżniej kliknął gdzieś indziej, to mapa wraca na standardową pozycję,  
        // a elementy z listy wracają w standardowy stan (w stan przed kliknięciem)
        $imageMap.css ("left", "50%");
        $introTitle.removeClass("hide") 
        $listItems.css('color', "#fff")
    }
})

const $mobileNav = $(".nav-mobile__background")

$(".nav__btn").on("click", () => {
    $mobileNav.addClass("active")
})

$(".nav-mobile__btn").on("click", () => {
    $mobileNav.removeClass("active")
})






