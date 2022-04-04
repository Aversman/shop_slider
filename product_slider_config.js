const activeSlide = document.querySelector(".product_slider-content-image");
const prevSlides = document.querySelectorAll('.product_slider-preview--element');
const slideBtnLeft = document.querySelector('#product_slider-btn-left');
const slideBtnRight = document.querySelector('#product_slider-btn-right');

const fullScreenSlider = document.querySelector('.product_slider-fullscreen');
const closeFullScreenSlider = document.querySelector('#product_slider-fullscreen-close_btn');
const fullScreenActiveSlide = document.querySelector('.product_slider-fullscreen--content-display-image');
const fullScreenPreviewSlides = document.querySelectorAll('.product_slider-fullscreen--preview--element');
const fullScreenLeftBtn = document.querySelector('.product_slider-fullscreen--content-left_btn');
const fullScreenRightBtn = document.querySelector('.product_slider-fullscreen--content-right_btn');

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
        if (slideElement.style.background === prevSlides[i].style.background)
            break;
        slideNum++;
    }
    return slideNum;
}

function zoomSlider(slideElement) {
    clearHovers(fullScreenPreviewSlides, '#f9f9f9');
    fullScreenSlider.style.display = 'block';
    fullScreenActiveSlide.style.background = slideElement.style.background;
    const slideNum = getSlideNumber(slideElement);
    fullScreenPreviewSlides[slideNum].style.borderColor = '#83CC00';
}

function changeFullScreenSlide(slideElement, slideNum) {
    clearHovers(fullScreenPreviewSlides, '#f9f9f9');
    slideElement.style.borderColor = '#83CC00';
    fullScreenActiveSlide.style.opacity = '0';
    setTimeout(() => { fullScreenActiveSlide.style.background = prevSlides[slideNum].style.background; }, 200);
    setTimeout(() => { fullScreenActiveSlide.style.opacity = '1'; }, 400);
}

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
    const slidersCount = prevSlides.length - 1;
    let num = getSlideNumber(activeSlide);
    if (num === 0)
        num = slidersCount;
    else
        num--;
    activeSlide.style.opacity = '0';
    setTimeout(() => { activeSlide.style.background = prevSlides[num].style.background; }, 200);
    setTimeout(() => { activeSlide.style.opacity = '1'; }, 400);
});

slideBtnRight.addEventListener('click', (event) => {
    event.preventDefault();
    const slidersCount = prevSlides.length - 1;
    let num = getSlideNumber(activeSlide);
    if (num === slidersCount)
        num = 0;
    else
        num++;
    activeSlide.style.opacity = '0';
    setTimeout(() => { activeSlide.style.background = prevSlides[num].style.background; }, 200);
    setTimeout(() => { activeSlide.style.opacity = '1'; }, 400);
});


fullScreenPreviewSlides.forEach((slideElement, index) => {
    slideElement.addEventListener('click', () => {
        changeFullScreenSlide(slideElement, index);
    });
});

fullScreenLeftBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const slidersCount = prevSlides.length - 1;
    let num = getSlideNumber(fullScreenActiveSlide);
    if (num === 0)
        num = slidersCount;
    else
        num--;
    changeFullScreenSlide(fullScreenPreviewSlides[num], num);
});

fullScreenRightBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const slidersCount = prevSlides.length - 1;
    let num = getSlideNumber(fullScreenActiveSlide);
    if (num === slidersCount)
        num = 0;
    else
        num++;
    changeFullScreenSlide(fullScreenPreviewSlides[num], num);
});

closeFullScreenSlider.addEventListener('click', (event) => {
    event.preventDefault();
    fullScreenSlider.style.display = 'none';
});

activateSlide(prevSlides[0]);