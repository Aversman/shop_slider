const activeSlide = document.querySelector(".product_slider-content-image");
const prevSlides = document.querySelectorAll('.product_slider-preview--element');
const slideBtnLeft = document.querySelector('#product_slider-btn-left');
const slideBtnRight = document.querySelector('#product_slider-btn-right');
const previewNavigationBtnTop = document.querySelector('#product_slider-preview-prev_btn');
const previewNavigationBtnBottom = document.querySelector('#product_slider-preview-next_btn');

const fullScreenSlider = document.querySelector('.product_slider-fullscreen');
const closeFullScreenSlider = document.querySelector('#product_slider-fullscreen-close_btn');
const fullScreenActiveSlide = document.querySelector('.product_slider-fullscreen--content-display-image');
const fullScreenPreviewSlides = document.querySelectorAll('.product_slider-fullscreen--preview--element');
const fullScreenLeftBtn = document.querySelector('.product_slider-fullscreen--content-left_btn');
const fullScreenRightBtn = document.querySelector('.product_slider-fullscreen--content-right_btn');

function getSwiperSlidesPerView() {
    if (window.innerWidth < 991)
         return 5;
    else
        return 17;
}

const swiper = new Swiper(".my_swiper", {
    slidesPerView: getSwiperSlidesPerView(),
    centeredSlides: false,
    grabCursor: false,
    spaceBetween: 0,
    navigation: {
        nextEl: '.product_slider-fullscreen-preview-next_btn',
        prevEl: '.product_slider-fullscreen-preview-prev_btn',
    }
});

function clearHovers(prevSlides, color) {
    prevSlides.forEach((elem) => {
        elem.style.borderColor = color;
    });
}

function activateSlide(slide) {
    if (activeSlide.style.background === slide.style.background)
        return 0;
    clearHovers(prevSlides, 'transparent');
    slide.style.borderColor = '#83CC00';
    activeSlide.style.opacity = '0';
    setTimeout(() => { activeSlide.style.background = slide.style.background; }, 200);
    setTimeout(() => { activeSlide.style.opacity = '1'; }, 400);
}

function getSlideNumber(slideElement) {
    let slideNum = 0;
    for (let i = 0; i < prevSlides.length; i++) {
        if (slideElement.style.background === prevSlides[i].style.background || slideElement.style.backgroundImage === prevSlides[i].style.background)
            break;
        slideNum++;
    }
    return slideNum;
}

function zoomSlider(slideElement) {
    document.body.style.overflow = 'hidden';
    clearHovers(fullScreenPreviewSlides, '#f9f9f9');
    fullScreenSlider.style.display = 'block';
    fullScreenActiveSlide.style.background = slideElement.style.background;
    const slideNum = getSlideNumber(slideElement);
    fullScreenPreviewSlides[slideNum].style.borderColor = '#83CC00';
}

function mainSliderMoveLeft() {
    const slidersCount = prevSlides.length - 1;
    let num = getSlideNumber(activeSlide);
    if (num === 0)
        num = slidersCount;
    else
        num--;
    activeSlide.style.opacity = '0';
    setTimeout(() => { activeSlide.style.background = prevSlides[num].style.background; }, 200);
    setTimeout(() => { activeSlide.style.opacity = '1'; }, 400);
}

function mainSliderMoveRight() {
    const slidersCount = prevSlides.length - 1;
    let num = getSlideNumber(activeSlide);
    if (num === slidersCount)
        num = 0;
    else
        num++;
    activeSlide.style.opacity = '0';
    setTimeout(() => { activeSlide.style.background = prevSlides[num].style.background; }, 200);
    setTimeout(() => { activeSlide.style.opacity = '1'; }, 400);
}

/* fullScreen Functions Start */
function changeFullScreenSlide(slideElement, slideNum) {
    clearHovers(fullScreenPreviewSlides, '#f9f9f9');
    slideElement.style.borderColor = '#83CC00';
    fullScreenActiveSlide.style.opacity = '0';
    setTimeout(() => { fullScreenActiveSlide.style.background = prevSlides[slideNum].style.background; }, 200);
    setTimeout(() => { fullScreenActiveSlide.style.opacity = '1'; }, 400);
}

function fullScreenMoveRight() {
    const slidersCount = prevSlides.length - 1;
    let num = getSlideNumber(fullScreenActiveSlide);
    if (num === slidersCount)
        num = 0;
    else
        num++;
    changeFullScreenSlide(fullScreenPreviewSlides[num], num);
}

function fullScreenMoveLeft() {
    const slidersCount = prevSlides.length - 1;
    let num = getSlideNumber(fullScreenActiveSlide);
    if (num === 0)
        num = slidersCount;
    else
        num--;
    changeFullScreenSlide(fullScreenPreviewSlides[num], num);
}

/* fullScreen Function End   */


// Default Mode Slider Events
activeSlide.addEventListener('click', () => {
    zoomSlider(activeSlide);
});

prevSlides.forEach((slideElement) => {
    slideElement.addEventListener('mouseover', () => {
        activateSlide(slideElement);
    });
    slideElement.addEventListener('click', () => {
        zoomSlider(slideElement);
    });
});

slideBtnLeft.addEventListener('click', (event) => {
    event.preventDefault();
    mainSliderMoveLeft();
});

slideBtnRight.addEventListener('click', (event) => {
    event.preventDefault();
    mainSliderMoveRight();
});

let slidePreviewPosition = 0;
let allPositions = prevSlides.length - 5;

if (prevSlides.length > 5) {
    previewNavigationBtnBottom.style.display = 'block';
}

previewNavigationBtnBottom.addEventListener('click', (event) => {
    event.preventDefault();
    if (slidePreviewPosition === allPositions)
        return 0;
    else {
        previewNavigationBtnTop.style.display = 'block';
    }
    if (slidePreviewPosition + 1 === allPositions) {
        previewNavigationBtnTop.style.display = 'block';
        previewNavigationBtnBottom.style.display = 'none';
    }
    slidePreviewPosition++;
    const sliderPreviewBLock = document.querySelector('.product_slider-preview-slides');
    sliderPreviewBLock.style.top = `${-1 * 80 * slidePreviewPosition}px`;
});

previewNavigationBtnTop.addEventListener('click', (event) => {
    event.preventDefault();
    if (slidePreviewPosition === 0)
        return 0;
    else {
        previewNavigationBtnBottom.style.display = 'block';
    }
    if (slidePreviewPosition - 1 === 0) {
        previewNavigationBtnTop.style.display = 'none';
        previewNavigationBtnBottom.style.display = 'block';
    }
    slidePreviewPosition--;
    const sliderPreviewBLock = document.querySelector('.product_slider-preview-slides');
    sliderPreviewBLock.style.top = `${-1 * 80 * slidePreviewPosition}px`;
});


let activeSlideXPosition = 0;

activeSlide.addEventListener('touchstart', (event) => {
    activeSlideXPosition = event.touches[0].clientX;
});

activeSlide.addEventListener('touchend', (event) => {
    const currentPosition = event.changedTouches[0].clientX;
    if (Math.abs(activeSlideXPosition - currentPosition) > 90) {
        if (activeSlideXPosition > currentPosition) {
            mainSliderMoveRight();
            return 1;
        }else if (activeSlideXPosition === currentPosition) {
            return 0;
        }
        else {
            mainSliderMoveLeft();
            return 1;
        }
    }
});

let zoomIndex = 1;
fullScreenActiveSlide.addEventListener('click', () => {
    if (window.innerWidth < 991)
        return 0;
    if (zoomIndex) {
        fullScreenActiveSlide.style.cursor = 'zoom-out';
        fullScreenActiveSlide.style.setProperty('background-size', '120%', 'important');
        zoomIndex = 0;
    }
    else {
        fullScreenActiveSlide.style.cursor = 'zoom-in';
        fullScreenActiveSlide.style.setProperty('background-size', 'contain', 'important');
        fullScreenActiveSlide.style.setProperty('background-position-x', 'center', 'important');
        fullScreenActiveSlide.style.setProperty('background-position-y', 'center', 'important');
        fullScreenActiveSlide.style.transition = 'all .3s';
        zoomIndex = 1;
    }
});

fullScreenActiveSlide.addEventListener('mousemove', (event) => {
    if (zoomIndex)
        return 0;
    
    const fullScreenPreviewBlock = document.querySelector('.product_slider-fullscreen--preview');
    const windowCenterX = window.innerWidth / 2;
    const windowCenterY = fullScreenPreviewBlock.offsetHeight + (fullScreenActiveSlide.offsetHeight / 2) - 20;
    const clientX = event.clientX;
    const clientY = event.clientY;

    let positionX = (windowCenterX - clientX) * 2;
    let positionY = (windowCenterY - clientY) * 2;
    fullScreenActiveSlide.style.transition = 'none';
    if (positionX > 300) {
        positionX = 300; 
    }else if (positionX < -300) {
        positionX = -300;
    }
    if (positionY > 100) {
        positionY = 100;
    }
    fullScreenActiveSlide.style.setProperty('background-position-x', `${positionX}px`, 'important');
    fullScreenActiveSlide.style.setProperty('background-position-y', `${positionY}px`, 'important');
});

// FullScreen Events
fullScreenPreviewSlides.forEach((slideElement, index) => {
    slideElement.addEventListener('click', () => {
        changeFullScreenSlide(slideElement, index);
    });
});

fullScreenLeftBtn.addEventListener('click', (event) => {
    event.preventDefault();
    fullScreenMoveLeft();
});

fullScreenRightBtn.addEventListener('click', (event) => {
    event.preventDefault();
    fullScreenMoveRight();
});

closeFullScreenSlider.addEventListener('click', (event) => {
    event.preventDefault();
    document.body.style.overflow = 'initial';
    fullScreenSlider.style.display = 'none';
});

// Drag'n'drop FullScreen slider
let fullScreenActiveSlideXPosition = 0;

fullScreenActiveSlide.addEventListener('touchstart', (event) => {
    fullScreenActiveSlideXPosition = event.touches[0].clientX;
});

fullScreenActiveSlide.addEventListener('touchend', (event) => {
    const currentPosition = event.changedTouches[0].clientX;
    if (Math.abs(fullScreenActiveSlideXPosition - currentPosition) > 90) {
        if (fullScreenActiveSlideXPosition > currentPosition) {
            fullScreenMoveRight();
            fullScreenActiveSlideXPosition = 0;
            return 1;
        }else if (fullScreenActiveSlideXPosition === currentPosition) {
            fullScreenActiveSlideXPosition = 0;
            return 0;
        }
        else {
            fullScreenMoveLeft();
            fullScreenActiveSlideXPosition = 0;
            return 1;
        }
    }
});

activateSlide(prevSlides[0]);