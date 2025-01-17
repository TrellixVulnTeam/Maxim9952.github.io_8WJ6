window.addEventListener('DOMContentLoaded', () => {
'use strict';

    function tab() {
        let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');
    
    
        function hideTabContent(a){
            for (let i = a; i < tabContent.length; i++) {
                tabContent[i].classList.remove('show');
                tabContent[i].classList.add('hide');
            }
        }
    
        hideTabContent(1);
        function showTabContent(b) {
            if (tabContent[b].classList.contains('hide')) {
                tabContent[b].classList.remove('hide');
                tabContent[b].classList.add('show');
            }
        }
    
        info.addEventListener('click', (e) => {
            let target = e.target;
            if(target && target.classList.contains('info-header-tab')) {
                for(let i = 0; i < tab.length; i++) {
                    if(target == tab[i]) {
                        hideTabContent(0);
                        showTabContent(i);
                        break;
                    }
                }
            }
        });
    } tab();

    function timer() {
        let deadLine = '2021-03-20';

        function getTimeRemaining(endtime) {
            let t = Date.parse(endtime) - Date.parse(new Date()),
                s = Math.floor((t/1000) % 60),
                m = Math.floor((t/1000/60) % 60 ),
                h = Math.floor((t/(1000*60*60)));
    
                return {
                    'total': t,
                    'hours': h,
                    'minutes': m,
                    'seconds': s
                };
        }
    
        function setClock(id, endtime) {
            let timer = document.getElementById(id),
                hours = timer.querySelector('.hours'),
                minutes = timer.querySelector('.minutes'),
                seconds = timer.querySelector('.seconds'),
                timeInterval = setInterval(updateClock, 1000);
    
            function updateClock() {
                let t = getTimeRemaining(endtime);
    
    
                function addZero(num) {
                    if (num < 10) {
                        return '0' + num;
                    } else {
                        return num;
                    }
                }
    
                    hours.textContent = addZero(t.hours);
                    minutes.textContent = addZero(t.minutes);
                    seconds.textContent = addZero(t.seconds);
                    
    
                
    
                if(t.total <= 0) {
                    clearInterval(timeInterval);
                    hours.textContent = '00';
                    minutes.textContent = '00';
                    seconds.textContent = '00';
                }
            }
        }
    
        setClock('timer', deadLine);
    } timer();

    function modalWindow() {
        let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');


        more.addEventListener('click', function() {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    
        close.addEventListener('click', () => {
            overlay.style.display = 'none';
            more.classList.remove('more-splash');
            document.body.style.overflow = '';
        });
    } modalWindow();

    function sendForm() {
        let message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с вами свяжемся!',
            failure: 'Что-то пошло не так!'
        };
    
        let form = document.querySelector('.main-form'),
            doubleForm = document.getElementById('form'),
            input = form.getElementsByTagName('input'),
            statusMessage = document.createElement('div');
    
            statusMessage.classList.add('status');
    
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                form.appendChild(statusMessage);
    
                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader('Content-type', 
                'application/x-www-form-urlencoded');
                let formData = new FormData(form);
                request.send(formData);
    
    
                request.addEventListener('load', function() {
                    if(request.readyState < 4) {
                        statusMessage.innerHTML = message.loading;
                    } else if(request.readyState === 4 &&
                              request.status == 200) {
                        statusMessage.innerHTML = message.success;
                    } else {
                        statusMessage.innerHTML = message.failure;
                    }
                });
    
                for(let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            });
    
            doubleForm.addEventListener('submit', function(e) {
                e.preventDefault();
                doubleForm.appendChild(statusMessage);
    
                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader('Content-type', 
                'application/x-www-form-urlencoded');
                let formData = new FormData(doubleForm);
                request.send(formData);
    
    
                request.addEventListener('load', function() {
                    if(request.readyState < 4) {
                        statusMessage.innerHTML = message.loading;
                    } else if(request.readyState === 4 && 
                              request.status == 200) {
                        statusMessage.innerHTML = message.success;
                    } else {
                        statusMessage.innerHTML = message.failure;
                    }
                });
    
                for(let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            });
    } sendForm();

    function slide() {
        let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');


    function showSlide(n) {

        if(n > slides.length) {
            slideIndex = 1;
        } 
        if(n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    } showSlide();

    function plusSlides(n) {
        showSlide(slideIndex += n);
    }

    function currentSlide(n) {
        showSlide(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
       plusSlides(1); 
    });

    dotsWrap.addEventListener('click', function(e) {
        for(let i = 0; i < dots.length + 1; i++) {
            if(e.target.classList.contains('dot') && e.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });

    setInterval(() => plusSlides(1), 5000);
    } slide();

    function calc() {
        let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;


        totalValue.textContent = 0;

        persons.addEventListener('input', function() {
            personsSum = +this.value;
            total = (daysSum + personsSum)*4000;

            if(restDays.value == '') {
                totalValue.textContent = 0;
            } else {
                totalValue.textContent = total;
            }

            if(daysSum === 0) {
                totalValue.textContent = 0;
            }
            if(personsSum === 0) {
                totalValue.textContent = 0;
            }

        });

        restDays.addEventListener('input', function() {
            daysSum = +this.value;
            total = (daysSum + personsSum)*4000;

            if(persons.value == '') {
                totalValue.textContent = 0;
            } else {
                totalValue.textContent = total;
            }

            if(daysSum === 0) {
                totalValue.textContent = 0;
            }
            if(personsSum === 0) {
                totalValue.textContent = 0;
            }
        });
        
        place.addEventListener('change', function() {
            if(restDays.value == '' || persons.value == '') {
                totalValue.textContent = 0;
            } else {
                let a = total;
                totalValue.textContent = a * 
                this.options[this.selectedIndex].value;
            }
        });
    } calc();
});