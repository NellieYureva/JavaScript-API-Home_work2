// Урок 2. События, формы
// Вашей задачей является создание веб-слайдера для отображения изображений на веб-странице. Слайдер должен позволять переключаться между изображениями и отображать их в центре экрана.

// 1. Создайте интерфейс веб-страницы, который включает в себя следующие элементы:

// a. Контейнер для отображения текущего изображения.
// b. Кнопки "Предыдущее изображение" и "Следующее изображение" для переключения между изображениями.
// c. Навигационные точки (индикаторы) для быстрого переключения между изображениями.

// 2. Используйте HTML для создания элементов интерфейса.

// 3. Используйте JavaScript для обработки событий:

// a. При клике на кнопку "Предыдущее изображение" должно отображаться предыдущее изображение.
// b. При клике на кнопку "Следующее изображение" должно отображаться следующее изображение.
// c. При клике на навигационные точки, слайдер должен переключаться к соответствующему изображению.

// 4. Слайдер должен циклически переключаться между изображениями, то есть после последнего изображения должно отображаться первое, и наоборот.

// 5. Добавьте стилизацию для слайдера и элементов интерфейса с использованием CSS для улучшения внешнего вида.


const images = ["1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png","10.png","11.png","12.png","13.png"];

const prevBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');
const autoPlayEl = document.querySelector('.auto-play');
const contentEl = document.querySelector('.content');
const imgEl = document.querySelector('.image-container');
const timeoutInp = document.getElementById('timeout');

let intervalAutoPlay = undefined; // setInterval

function cyclicCounter(initialCount, maxCount) {
    let curCount = initialCount;
    return {
        value: () => {return curCount},
        set: initCount => {return curCount = initCount},
        change: (direction = "+") => {
            if (direction === '+') {
                return curCount = curCount >= maxCount ? 0 : ++curCount;
            } else {
                return curCount = curCount <= 0 ? maxCount : --curCount;
            }
        }
    };
}

function createButtons(rootEl, data) {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('container');
    buttonsContainer.classList.add('d-flex');
    buttonsContainer.classList.add('justify-content-center');
    buttonsContainer.classList.add('flex-wrap');
    buttonsContainer.classList.add('py-3');
    buttonsContainer.classList.add('gap-1');
    data.forEach((element, index) => {
        const newBtn = document.createElement('button');
        newBtn.classList.add('btn');
        newBtn.classList.add('btn-sm');
        newBtn.classList.add('btn-outline-primary');
        newBtn.textContent = index;
        newBtn.setAttribute('data-index', index);
        buttonsContainer.appendChild(newBtn);
    });
    rootEl.append(buttonsContainer);
}

const cyclicCounter1 = cyclicCounter(0, images.length - 1);

const setImage = ind => {
    imgEl.setAttribute('src', `./img/${images[ind]}`);

    const oldBtns = document.querySelectorAll('.active');
    oldBtns.forEach(element => {
        element.classList.remove('active');
    });

    const newBtn = document.querySelector(`[data-index="${ind}"]`);
    newBtn.classList.add('active');
}

function autoPlay(autoplayCheckBox, duration) {
    clearInterval(intervalAutoPlay);

    if (autoplayCheckBox.hasAttribute('checked')) {
        intervalAutoPlay = setInterval(() => {
            setImage(cyclicCounter1.change());
        }, duration);
    }
}

function toogleCheckBoxChecked(checkBox) {
    if (checkBox.hasAttribute('checked')) checkBox.removeAttribute('checked');
    else checkBox.setAttribute('checked', true);
}

// Предыдущая картинка
prevBtn.addEventListener('click', function (e) {
    setImage(cyclicCounter1.change('-'));
});

// Следущая картинка
nextBtn.addEventListener('click', function (e) {
    setImage(cyclicCounter1.change());
});

// Кнопки картинок
contentEl.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
        const index = e.target.dataset['index'];
        setImage(cyclicCounter1.set(index));
    }
});

// После загрузки
window.addEventListener('load', function (e) {
    createButtons(contentEl, images);
    setImage(cyclicCounter1.value());
    autoPlay(autoPlayEl, 1000 * Number(timeoutInp.value));
});

// Кнопка автоплэй
autoPlayEl.addEventListener('change', function (e) {
    toogleCheckBoxChecked(autoPlayEl);
    autoPlay(autoPlayEl, 1000 * Number(timeoutInp.value));
});

// Изменение таймаута автоплэя
timeoutInp.addEventListener('change', function (e) {
    autoPlay(autoPlayEl, 1000 * Number(timeoutInp.value));
});