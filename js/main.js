// Cache DOM Elements

const body = document.querySelector("body");
const menuButton = document.querySelector(".header__menu");
const sideNav = document.querySelector(".nav");
const navClose = document.querySelector(".nav__close");
const parallax = document.querySelector(".overlay-img");
const reloadOverlay = document.querySelector(".reload-overlay");
const scrollTop = document.querySelector(".scroll-top");
const homeButton = document.querySelector(".home-button");

const scrollButton = document.querySelectorAll(".scroll-to-section");

let imgContainer = document.querySelectorAll(".img-container");
let sections = document.querySelectorAll("section");





// Functions

// Toggle menu open and close
const menuToggle = () => sideNav.classList.toggle("nav--open");

// Close menu if clicked outside
const menuClose = e => {
    const menuPos = sideNav.getBoundingClientRect();

    if(e.x < menuPos.left && menuPos.left < document.documentElement.clientWidth && !e.target.classList.contains("scroll-to-section")) sideNav.classList.remove("nav--open");
}

// Add a parallax effect to the image behind the home area
const createParallax = () => parallax.style.backgroundPositionY = `${window.pageYOffset * 0.5}px`; 

// Scroll to respective section when button is clicked
function scrollPage() {
    document.querySelector(`#${this.dataset.section}`).scrollIntoView({behavior: "smooth", block: "start"});
    
    setTimeout(() => {
        sideNav.classList.remove("nav--open");
    }, 1000);
}

// Check if element is in view of the window
function isInView(elem) {
    let docBottom = document.documentElement.scrollTop + document.documentElement.clientHeight;
    let elemTop = elem.getBoundingClientRect().top + document.documentElement.scrollTop;

    return ((elemTop + (elem.offsetHeight / 16)) <= docBottom);
}





// Event Listeners

body.addEventListener("click", menuClose);

// [homeButton, scrollTop].forEach(elem => elem.addEventListener("click", () => body.scrollIntoView({behavior: "smooth", block: "start"})));

[menuButton, navClose].forEach(elem => elem.addEventListener("click", menuToggle));

scrollButton.forEach(elem => elem.addEventListener("click", scrollPage));

window.addEventListener("scroll", function() {

    createParallax();

    if(document.documentElement.scrollTop >= 100) {
        menuButton.classList.add("header__menu--black");

        if(window.innerWidth <= 600) {
            menuButton.querySelector(".header__menu-icon").style.backgroundColor = "#ffffff";
        }
    } else {
        menuButton.classList.remove("header__menu--black");

        if(window.innerWidth <= 600) {
            menuButton.querySelector(".header__menu-icon").style.backgroundColor = "#000000";
        }
    }

    if(((document.documentElement.scrollTop + document.documentElement.clientHeight) >  (document.documentElement.clientHeight * 1.5))) {
        scrollTop.style.visibility = "visible";
        scrollTop.style.opacity = "1";
    } else {
        scrollTop.style.visibility = "hidden";
        scrollTop.style.opacity = "0";
    }

    sections.forEach(sec => {
        [...sec.children].forEach(elem => {
            if(isInView(elem)) elem.classList.add("animate-in");
        });
    });
});

window.addEventListener("beforeunload", function() {
    reloadOverlay.style.zIndex = "1000";
    body.style.overflowY = "hidden";
    window.scrollTo(0, 0);
});

window.addEventListener("load", function() {
    setTimeout(() => {
        reloadOverlay.style.zIndex = "-1000";
        reloadOverlay.querySelector(".reload-overlay__logo").style.display = "none";
    }, 2000);
    setTimeout(() => {
        body.style.overflowY = "visible";
    }, 5000);
});

