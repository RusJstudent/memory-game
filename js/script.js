'use strict';

const list = document.querySelectorAll('.flex-item');
const field = document.querySelector('.field');

const images = ['cheeseburger.png', 'fries.png', 'hotdog.png', 
'ice-cream.png', 'milkshake.png', 'pizza.png'];
const defaultSrc = 'images/blank.png';
const emptySrc = 'images/white.png';

correctPathTo(images);
double(images);
mixUp(images);

let opened1 = {
    open: false,
}
let opened2 = {
    open: false,
}

const timeToShow = 500;
let score = 0;
let totalScore = localStorage.getItem('score') || 0;
const scoreElem = document.querySelector('.score h2');
scoreElem.textContent = 'Score: ' + totalScore;

field.addEventListener('click', handler);

function handler(e) {
    let current = e.target.closest('img');
    if (!current || !field.contains(current)) return;

    if (opened2.open) return;
    if (current.dataset.open) return;

    if (!opened1.open) {
        let num = +current.dataset.number;
        opened1.num = num;
        opened1.path = images[num];
        current.setAttribute('src', images[num]);
        opened1.open = true;
    } else {
        let num = +current.dataset.number;
        opened2.num = num;
        opened2.path = images[num];
        current.setAttribute('src', images[num]);
        opened2.open = true;
        if (opened1.path === opened2.path) {
            list[opened1.num].firstElementChild.setAttribute('data-open', true);
            list[opened2.num].firstElementChild.setAttribute('data-open', true);
            list[opened1.num].firstElementChild.setAttribute('src', emptySrc);
            list[opened2.num].firstElementChild.setAttribute('src', emptySrc);
            opened1.open = false;
            opened2.open = false;
            score++;
            totalScore++;
            localStorage.setItem('score', totalScore);
            scoreElem.textContent = 'Score: ' + totalScore;

            if (score === 6) setTimeout(() => gameCompleted());
        } else {
            setTimeout(() => {
                list[opened1.num].firstElementChild.setAttribute('src', defaultSrc);
                list[opened2.num].firstElementChild.setAttribute('src', defaultSrc);
                opened1.open = false;
                opened2.open = false;
            }, timeToShow);
        }
    }
}

field.ondragstart = () => false;

function correctPathTo(images) {
    for (let i = 0; i < images.length; i++) {
        let startWith = 'images/';
        images[i] = startWith + images[i];
    }
}

function double(images) {
    images.push(...images);
}

function mixUp(images) {
    for (let i = images.length - 1; i > 9; i--) {
        let random = Math.floor( Math.random() * i );
        [images[i], images[random]] = [images[random], images[i]];
    }
}

function gameCompleted() {
    alert('good job!');

    let button = document.createElement('button');
    scoreElem.after(button);
    button.classList.add('button');
    button.textContent = 'Play again';

    button.onclick = function() {
        location.reload();
    }
}