// mobileNav jest przeznaczony dla nawigacji, która jest dostępna, gdy szerokość ekranu jest mniejsza, niż 768px
// Otrzymujemy element z DOM

const $mobileNav = $(".nav-mobile__background")


// Przy kliknięciu otwiera się nawigacja 
// Element .nav__btn pokazuje się na ekranie, gdy szerokość jest mniejsza, niż 768px
$(".nav__btn").on("click", () => {
    $mobileNav.addClass("active")
})

// W tym przypadku nawigacja zamyka się
$(".nav-mobile__btn").on("click", () => {
    $mobileNav.removeClass("active")
})