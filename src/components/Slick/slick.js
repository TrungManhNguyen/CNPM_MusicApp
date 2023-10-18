import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './App.css'

import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import SliderWrapper from "./_SlickSliderStyle";
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
function App() {

    const swiperSettings = {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
        },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
        },
        modules: [EffectCoverflow, Pagination, Navigation],
        AutoScroll: {
            speed: 1,
        },
    };

    return (
        <div className="container">
            <Swiper
                {...swiperSettings} // Sử dụng tùy chọn tự động chuyển đổi trong Swiper
                className="swiper_container"
            >

                <SwiperSlide>
                    <SwiperSlide>
                        <img src="https://avatar-ex-swe.nixcdn.com/slideshow/2023/09/18/c/0/9/a/1695041007228_org.jpg" alt="slide_image" />

                    </SwiperSlide>
                </SwiperSlide>
                <SwiperSlide>
                    <SwiperSlide>
                        <img src="https://avatar-ex-swe.nixcdn.com/slideshow/2023/09/21/7/f/f/2/1695299978742_org.jpg" alt="slide_image" />

                    </SwiperSlide>
                </SwiperSlide>

                <SwiperSlide>
                    <SwiperSlide>
                        <img src="http://2.bp.blogspot.com/-yNFb_4CDX2I/UZCLpmW0_QI/AAAAAAAAIjU/fLDk70peB0c/s1600/hinh-anh-song-bien-1.jpg" alt="slide_image" />

                    </SwiperSlide>
                </SwiperSlide>
                <SwiperSlide>
                    <SwiperSlide>
                        <img src="https://avatar-ex-swe.nixcdn.com/slideshow/2023/09/22/d/4/4/3/1695391071805_org.jpg" alt="slide_image" />

                    </SwiperSlide>
                </SwiperSlide>
                <SwiperSlide>
                    <SwiperSlide>
                        <img src="https://avatar-ex-swe.nixcdn.com/slideshow/2023/09/21/7/f/f/2/1695306812031_org.jpg" alt="slide_image" />

                    </SwiperSlide>
                </SwiperSlide>

                <SliderWrapper>

                    <div className="slider-controler">
                        {/* <div className="swiper-button-prev slider-arrow">
                            <ion-icon name="arrow-back-outline"></ion-icon>
                        </div>
                        <div className="swiper-button-next slider-arrow">
                            <ion-icon name="arrow-forward-outline"></ion-icon>
                        </div> */}
                        <div className="swiper-pagination"></div>
                    </div>
                </SliderWrapper>
            </Swiper>
        </div >
    );
}

export default App;