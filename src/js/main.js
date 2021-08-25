import { createPointer, showPointer } from "./pointer";
import './mobile-nav';

// Otrzymujemy elementy z DOM
const $listItems = $(".list__item")
const $introTitle = $(".intro__title")
const $dropdown = $(".dropdown")
export const $imageMap = $(".user-map")





// Jest przydatne dla sprawdzenia, czy użytkownik kliknął 
let activeTitle;




// Dodajemy eventListener na przycisk dropdown'a, gdy użytkownik klika na container, w którym są nadpis PL i strzałka w dół to nasz dropdown się otwiera.
$(".dropdown__btn").on("click", (e) => {
    setTimeout(() => {
        $dropdown.toggleClass("active")
    }, 1)
})


// AddEventListener, gdy użytkownik w coś kliknął na stronie 
$(document).on('click', (e) => {

    const $target = $(e.target)

    

    // Sprawdza, czy dropdown jest aktywny i gdy nie klikneliśmy w coś wewnątrz dropdown'a, wtedy go zamykamy
    if(!$target.parents(".dropdown").hasClass("dropdown") && !$target.hasClass("dropdown")) {
        $dropdown.removeClass("active")
    }
    
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

    

    // Resetujemy aktywny tytuł
    activeTitle = ''

    
    // Sprawdzamy, czy użytkownik kliknął na element z listy i czy ten element nie posiada klasy hide
    // Jeżeli szerokość ekranu jest większa 768px to użytkownik może kliknąć na inny element z listy
    // Elementy z listy, którzy posiadają klasę hide są schowane, gdy szerokość ekranu jest mniejsza, niż 768px
    // Czyli wtedy ignorujemy klik na element z listy
    if($target.hasClass("list__item") && (!$target.hasClass("hide") || window.innerWidth >= 768)){

        // Tworzymy nasz punkt z zawartościami i inicjujemy go w DOM
        const $pointer = createPointer();
        
        // Nadajemy dla activeTitle aktualny tytuł wydarzenia (np. "Paris Air Show")
        activeTitle = $target.text()

        // AddEventListener, gdy użytkownik zmniejsza/zwiększa rozmiar ekran, to punkt, zostaje cały czas na miejscu 
        $(window).on("resize", () => {
            activeTitle && showPointer($pointer, activeTitle)
        })

        

        // Nadajemy pozycje dla naszego punkta i również w tej funkcji przesuwamy mapę według osi X w odpowiednie miejsce,
        // albo jeżeli obraz mapy nie jest ucięty (czyli zajmuje szerokość 100%) to pokazujemy punkt na mapie bez samego przesuwania
        showPointer($pointer, $target.text())

        // Nadajemy tekst dla naszego elementów, które znajdują się w div'e "pointer"
        $(".line__top-text").text($target.text())
        $(".line__bottom-text").text($target.data("subtitle"))

        // W ten moment chowamy tytuł "World ahead", nadając mu klasę w DOM "hide" 
        $introTitle.addClass("hide")


        // Zmieniamy kolor wszystkich elementów z listy, nadając im klasę hide.
        $listItems.addClass("hide")
        
        // Usuwamy klasę hide z elementu, na który kliknęliśmy, by pokazać, że jest aktywny
        window.innerWidth > 768 && $target.removeClass("hide")

        // Wyświetlamy nasz punkt na mapie
        $pointer.addClass("active")
    } 
    else {

        // Gdy użytkownik wcześniej kliknął na element z listy i póżniej kliknął gdzieś indziej, to mapa wraca na standardową pozycję,  
        // a elementy z listy wracają w standardowy stan (w stan przed kliknięciem na element z listy)
        $imageMap.css ("left", "50%");
        $introTitle.removeClass("hide") 
        $listItems.removeClass("hide")

    }
})










