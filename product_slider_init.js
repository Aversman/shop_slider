const productSliderConfig = {
    title: 'My slider',
    slides: [
        'https://xn--b1apmj9c.xn--p1ai/content/img/thumbs/22/61729a3868a84a09993d9a22_merinoscrystal1021green_640.jpeg',
        'https://xn--b1apmj9c.xn--p1ai/content/img/thumbs/9b/61729a3868a84a09993d9c9b_merinoscrystal1021green_640.jpeg',
        'https://xn--b1apmj9c.xn--p1ai/content/img/thumbs/bc/61729a3868a84a09993d99bc_merinoscrystal1021green_640.jpeg',
        'https://xn--b1apmj9c.xn--p1ai/content/img/thumbs/bf/61729a3868a84a09993d99bf_merinoscrystal1021green_640.jpeg',
        'https://xn--b1apmj9c.xn--p1ai/content/img/thumbs/c3/61729a3868a84a09993d99c3_merinoscrystal1021green_640.jpeg',
        'https://xn--b1apmj9c.xn--p1ai/content/img/thumbs/c8/61729a3868a84a09993d99c8_merinoscrystal1021green_640.jpeg',
        'https://xn--b1apmj9c.xn--p1ai/content/img/thumbs/cc/61729a3868a84a09993d99cc_merinoscrystal1021green_640.jpeg'
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