const sliderInner = document.querySelector('.slider-inner');
if (sliderInner !== null) {
    var $ = document;

    $.addEventListener('DOMContentLoaded', function () {

        const sliderMe = () => {
            let currentPosition = 0,
                sliderItem = document.querySelectorAll('.slider-item'),
                sliderItemWidth = window
                .getComputedStyle(sliderItem[0])
                .flexBasis.match(/\d+\.?\d+/g),
                sliderInner = $.querySelector('.slider-inner'),

                control = {
                    next: $.querySelector('#next'),
                    slideNext() {
                        currentPosition += parseFloat(sliderItemWidth);
                        if (currentPosition > limitPosition) {
                            currentPosition = 0;
                        }
                        sliderInner.style.right = currentPosition + '%';
                    },
                    prev: $.querySelector('#prev'),
                    slidePrev() {
                        currentPosition -= parseFloat(sliderItemWidth);
                        if (currentPosition < 0) {
                            currentPosition = limitPosition;
                        }
                        sliderInner.style.right = currentPosition + '%';
                    }
                },
                limitPosition = sliderItemWidth * (sliderItem.length - Math.floor(100 / sliderItemWidth));

            control.next.addEventListener('click', control.slideNext)
            control.prev.addEventListener('click', control.slidePrev)

            window.addEventListener("resize", function () {
                currentPosition = 0;
                $.querySelector('.slider-inner').style.right = currentPosition + '%';
            })
        }
        sliderMe();

        window.addEventListener("resize", sliderMe)

    });

}