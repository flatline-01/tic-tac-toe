const wrapper = document.querySelector('#wrapper');
const fields  = document.querySelectorAll('.field');

const settingsList = document.getElementById('settings-list');

const icons          = document.querySelectorAll('.icon');
const closeIcon      = document.querySelector('.close-icon');
const settingsIcon   = document.getElementById('settings-icon');

const gameOverWindow  = document.getElementById('gameOverWindow');
const gameOverMessage = document.getElementById('gameOverWindow-message');
const goOutBtn        = document.getElementById('goOut-btn');
const restartBtn      = document.getElementById('restart-btn');

const cross  = document.getElementById('cross');
const circle = document.getElementById('circle');
const crossSVGElems  = [...cross.children[0].children];
const circleSVGElems  = [...circle.children];

if(!localStorage.getItem('player') && !localStorage.getItem('gameMode')){
    localStorage.setItem('player', 'o');
    localStorage.setItem('enemy', 'x');
    localStorage.setItem('gameMode', playWithAIHard.toString());
}

addClassForPlayer('o', circle);
addClassForPlayer('x', cross);

toggleSelectedClass(icons[0], icons[1]);
toggleSelectedClass(icons[1], icons[0]);
toggleSelectedClass(icons[2], icons[3]);
toggleSelectedClass(icons[3], icons[2]);

settingsIcon.addEventListener('click', () => settingsList.classList.toggle('hidden'));

closeIcon.addEventListener('click', () => settingsList.classList.add('hidden'));

function addClassForPlayer(sign, elem){
    if(localStorage.getItem('player') === sign){
        elem.classList.add('selected');
        if(sign === 'o'){
            circle.classList.add('player');
            circleSVGElems.forEach(i => i.classList.add('player'));
            cross.classList.add('enemy');
            crossSVGElems.forEach(i => i.classList.add('enemy'));
        } 
        else {
            cross.classList.add('player');
            crossSVGElems.forEach(i => i.classList.add('player'));
            circle.classList.add('enemy');
            circleSVGElems.forEach(i => i.classList.add('enemy'));
        }
    }
}

function toggleSelectedClass(elem, elem2){
    elem2.addEventListener('click', () => {
        if(elem2 === icons[3]){
            localStorage.setItem('player', 'o');
            localStorage.setItem('enemy', 'x');
            identifyClasses(circle, cross, circleSVGElems, crossSVGElems);
        }
        elem.classList.remove('selected');
        elem2.classList.add('selected');
    });
    elem.addEventListener('click', () => {
        if(elem === icons[2]){
            localStorage.setItem('player', 'x');
            localStorage.setItem('enemy', 'o');
            identifyClasses(cross, circle, crossSVGElems, circleSVGElems);
        }
        if(elem === icons[0]){
            localStorage.setItem('gameMode', playWithPerson.toString());
            location.reload();
        }
        if(elem === icons[1]){
            localStorage.setItem('gameMode', playWithAIHard.toString());
            location.reload();
        }
        elem2.classList.remove('selected');
        elem.classList.add('selected');
    });
}

function identifyClasses(el, el2, children, children2){
    if(el.classList.contains('enemy')){
        el.classList.remove('enemy');
        children.forEach(i => i.classList.remove('enemy'));
    }
    if(el2.classList.contains('player')){
        el2.classList.remove('player');
        children2.forEach(i => i.classList.remove('player'));
    }
    el.classList.add('player');
    children.forEach(i => i.classList.add('player'));
    el2.classList.add('enemy');
    children2.forEach(i => i.classList.add('enemy'));
}

goOutBtn.addEventListener('click', () => {
    window.close();
});

restartBtn.addEventListener('click', () => {
    location.reload();
});