(function () {

    Vue.use(window.VueAwesomeSwiper);

    console.log(window.VueAwesomeSwiper);

    var app = new Vue({
        el: '#app',
        components: {
            LocalSwiper: VueAwesomeSwiper.swiper,
            LocalSlide: VueAwesomeSwiper.swiperSlide,
        },
        data: {
            showWindow: false,
            showFade: false,
            culture: 3100,
            yieldValue: 20,
            count: 3000,
            square: 10,
            amount: 50000,
            langs: [
                {
                    lang: 'ru',
                    langActive: true,
                },
                {
                    lang: 'ua',
                    langActive: false,
                },
                {
                    lang: 'en',
                    langActive: false,
                }
            ],
            swiperOptionA: {
                centeredSlides: true,
                autoplay: {
                    delay: 3500,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: false
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                loop: true,
                speed: 1000,
                effect: 'fade'
            },
        },
        computed: {
            splittedAmount: function () {
                var amount = this.culture * this.square * this.yieldValue * .1 - this.count * this.square;
                var re = /\d{1,3}(?=(\d{3})+(?!\d))/g;
                return String(amount).replace(re, '$&\u00a0');
            },
            swiperA() {
                return this.$refs.awesomeSwiperA.swiper
            }
        },
        methods: {
            activate: function (e) {
                let index = e.target.id[0];
                for (let i = 0; i < this.langs.length; i++) {
                    if (this.langs[i].langActive === true) {
                        this.langs[i].langActive = false
                    }
                }
                this.langs[index].langActive = true;
            },
            closePopup: function(e) {
                let el = e.target;
                let inside = el.closest('#impressum') || el.closest('#impressum_btn');
                if (!inside) {
                    this.showWindow = false;
                }
            },
            validateInput: function (e) {
                var value = e.target.value;
                var re = /^\d{1,}$/;
                var isValid = re.test(value);
                if (!isValid) {
                    this[e.target.id] = value.replace(/\D/g, "");
                    if (value === '') {
                        e.target.style.outline = "1px dashed #f00";
                        e.target.style.outlineOffset = "2px";
                        e.target.placeholder = 'Введите числовое значение'
                    } else {
                        this.showWindow = true;
                    }
                }
            },
            showHidden: function () {
                var hidden = document.querySelectorAll('.hidden');
                var ctx = this;
                [].forEach.call(hidden, function (el) {
                    ctx.showFade = true;
                })
            },
            onSetTranslate() {
                console.log('onSetTranslate');
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                console.log('this is swiper A instance object', this.swiperA);

                var ctx = this;
                document.addEventListener("DOMContentLoaded", function () {
                    ctx.showHidden();
                });
            })
        }
    });

    // проверяем поддержку
    if (!Element.prototype.closest) {
        // реализуем
        Element.prototype.closest = function (css) {
            var node = this;

            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }

    if (!Element.prototype.matches) {
        // определяем свойство
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;

    }
})();

