const psFullScreenPreview = document.querySelector('.product_slider-fullscreen--preview');
const psFullScreenActive = document.querySelector('.product_slider-fullscreen--content-display-image');
const psContentPreview = document.querySelector('.product_slider-preview');
const psContentActive = document.querySelector('.product_slider-content-image');

const productSliderConfig = {
    title: 'My slider',
    slides: [
        // image url's
    ]
}

function sliderInit(productSliderConfig) {
    const mainSliderSlides = document.querySelector('.product_slider-preview-slides');
    const mainSliderActiveSlide = document.querySelector('.product_slider-content-image');
    const sliderTitle = document.querySelector('#product_slider-fullscreen-heading-text');
    const slidersCount = document.querySelector('#product_slider-fullscreen--info-btn');
    const fullScreenActiveSlide = document.querySelector('.product_slider-fullscreen--content-display-image');
    const fullScreenPreviewBlock = document.querySelector('.swiper-wrapper');

    sliderTitle.innerHTML = productSliderConfig.title;
    slidersCount.innerHTML = `Фото ${productSliderConfig.slides.length}`;

    // MainSlide init
    for (let i = 0; i < productSliderConfig.slides.length; i++) {
        let div = document.createElement('div');
        div.className = 'product_slider-preview--element';
        div.style.background = `url('${productSliderConfig.slides[i]}')`;
        mainSliderSlides.append(div);
    }
    mainSliderActiveSlide.style.background = `url('${productSliderConfig.slides[0]}')`;

    // FullScreen init
    for (let i = 0; i < productSliderConfig.slides.length; i++) {
        fullScreenPreviewBlock.insertAdjacentHTML('beforeend', `<div class="swiper-slide"><div class="product_slider-fullscreen--preview--element"><div style="background: url('${productSliderConfig.slides[i]}')"></div></div></div>`);
    }
    fullScreenActiveSlide.style.background = `url('${productSliderConfig.slides[0]}')`;
}

sliderInit(productSliderConfig);
