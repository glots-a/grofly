'use strict'

// Menu Burger==============================
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}
const img = document.querySelector('#logo')

if (window.innerWidth < 423) {
    img.src = "./img/Logo-min.svg"
} else { img.src = "./img/Logo.svg" }

// Reveal sections==============================
const allSections = document.querySelectorAll('.section');


const revealSection = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section');
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('section');
});

// Star raiting==============================


const ratings = document.querySelectorAll('.rating');
if (ratings.length > 0) {
    initRatings();
}


function initRatings() {
    let ratingActive;
    for (let index = 0; index < ratings.length; index++) {
        const rating = ratings[index];
        initRating(rating);
    }
    function initRating(rating) {
        initRatingVars(rating);
        setRatingActiveWidth();
        if (rating.classList.contains('rating_set')) {
            setRating(rating);
        }
    }
    function initRatingVars(rating) {
        ratingActive = rating.querySelector('.rating__active');

    }
    function setRatingActiveWidth(index) {
        const ratingActiveWidth = index / 0.05;
        ratingActive.style.width = `${ratingActiveWidth}%`;
    }
    function setRating(rating) {
        const ratingItems = rating.querySelectorAll('.rating__item');
        for (let index = 0; index < ratingItems.length; index++) {
            const ratingItem = ratingItems[index];
            ratingItem.addEventListener("mouseenter", function (e) {
                initRatingVars(rating);
                setRatingActiveWidth(ratingItem.value);
            });
            ratingItem.addEventListener("mouseleave", function (e) {
                setRatingActiveWidth();
            });
            ratingItem.addEventListener("click", function (e) {
                initRatingVars(rating);
            });
        }
    }
}
// respond field ===========================

const form = document.querySelector('.footer__form')
const respond = document.querySelector('.form__input')
const formButton = document.querySelector('.form__submit')

formButton.addEventListener('click', function (e) {
    e.preventDefault()
    const reqExp = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/g
    console.log(respond.value);

    if (!reqExp.test(respond.value)) {
        respond.classList.add('modal__hidden');

    } else {
        respond.classList.remove('modal__hidden')
    }
    form.reset()
})
//canvas =========================================
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 1152;
canvas.height = 65;
const array = []

const sources = [
    {
        add: '../img/startups/05.png',
        w: 230,
    },
    {
        add: '../img/startups/01.png',
        w: 230,
    },
    {
        add: '../img/startups/02.png',
        w: 230,
    },
    {
        add: '../img/startups/03.png',
        w: 230,

    },
    {
        add: '../img/startups/04.png',
        w: 230,
    },
    {
        add: '../img/startups/05.png',
        w: 230,
    }
]

//....
class Picture {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.image = img;
    }
    update() {
        this.x === canvas.width ? this.x = -230 : this.x += 1
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y)
    }
}
let n = 0
// ...
function imageDraw() {
    sources.forEach((source, index) => {
        const img = new Image()
        img.src = source.add
        img.addEventListener('load', function () {
            let position = source.w * index
            array.push(new Picture(position, 0, img));
        })
    })
}
imageDraw()

//...

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let el of array) {
        el.update()
        el.draw()
    }
    requestAnimationFrame(animate)
}
animate()



