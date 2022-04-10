const settingsListItems          = document.querySelectorAll('.settings__list__item');
const closeIcon      = document.querySelector('.close-icon');
const settingsBtn    = document.querySelector('.settings-btn');

const gameOverWindow  = document.getElementById('gameOverWindow');
const gameOverMessage = document.getElementById('gameOverWindow-message');
const restartBtn      = document.getElementById('restart-btn');

const cross  = document.getElementById('cross');
const circle = document.getElementById('circle');

const settings = document.getElementById('settings');

const toe = document.getElementById('toe');

window.onload = () => {
    if(!localStorage.getItem('player') && !localStorage.getItem('gameMode')){
        localStorage.setItem('player', 'x');
        localStorage.setItem('enemy', 'o');
        localStorage.setItem('gameMode', 'AIHardMod');
        localStorage.setItem('difficulties', 'hard');
        settingsListItems[1].classList.add('selected');
        settingsListItems[3].classList.add('selected');
        settingsListItems[5].classList.add('selected');
    } else {
        if(localStorage.getItem('gameMode') === 'personMode'){
            settingsListItems[0].classList.add('selected');
            playWithPerson();
        }
        if(localStorage.getItem('gameMode').includes('AI')){
            settingsListItems[1].classList.add('selected');
            if(localStorage.getItem('difficulties') === 'hard'){
                settingsListItems[3].classList.add('selected');
                playWithAIHard();
            } 
            if(localStorage.getItem('difficulties') === 'easy'){
                settingsListItems[2].classList.add('selected');
                playWithAIEasy();
            }  
        } 
        if(localStorage.getItem('player') === 'x'){
            settingsListItems[5].classList.add('selected');
        }
        if(localStorage.getItem('player') === 'o'){
            settingsListItems[4].classList.add('selected');
        }
    }
    
}

toggleSelectedClass(settingsListItems[0], settingsListItems[1]);
toggleSelectedClass(settingsListItems[1], settingsListItems[0]);
toggleSelectedClass(settingsListItems[2], settingsListItems[3]);
toggleSelectedClass(settingsListItems[3], settingsListItems[2]);
toggleSelectedClass(settingsListItems[4], settingsListItems[5]);
toggleSelectedClass(settingsListItems[5], settingsListItems[4]);

settingsBtn.addEventListener('click', () => settings.classList.toggle('hidden'));

closeIcon.addEventListener('click', () => settings.classList.add('hidden'));

function addClassForPlayer(sign, elem){
    if(localStorage.getItem('player') === sign){
        elem.classList.add('selected');
        if(sign === 'o'){
            circle.classList.add('player');
            cross.classList.add('enemy');
        } 
        else {
            cross.classList.add('player');
            circle.classList.add('enemy');
        }
    }
}

function toggleSelectedClass(elem, elem2){
    elem2.addEventListener('click', () => {
        if(elem2 === settingsListItems[4]){
            localStorage.setItem('player', 'o');
            localStorage.setItem('enemy', 'x');
            identifyClasses(circle, cross);
        }
        elem.classList.remove('selected');
        elem2.classList.add('selected');
    });
    elem.addEventListener('click', () => {
        if(elem === settingsListItems[5]){
            localStorage.setItem('player', 'x');
            localStorage.setItem('enemy', 'o');
            identifyClasses(cross, circle);
        }
        if(elem === settingsListItems[0]){
            localStorage.setItem('gameMode', 'personMode');
            location.reload();
        }
        if(elem === settingsListItems[1] && settingsListItems[2].classList.contains('selected') || elem ===  settingsListItems[2] && settingsListItems[1].classList.contains('selected')){
            localStorage.setItem('gameMode', 'AIEasyMod');
            localStorage.setItem('difficulties', 'easy');
            location.reload();
        }
        if(elem === settingsListItems[1] && settingsListItems[3].classList.contains('selected')  || elem ===  settingsListItems[3] && settingsListItems[1].classList.contains('selected')){
            localStorage.setItem('gameMode', 'AIHardMode');
            localStorage.setItem('difficulties', 'hard');
            location.reload();
        }
        if(elem === settingsListItems[2]){
            localStorage.setItem('difficulties', 'easy');
        }
        if(elem === settingsListItems[3]){
            localStorage.setItem('difficulties', 'hard');
        }
        elem2.classList.remove('selected');
        elem.classList.add('selected');
    });
}

function identifyClasses(el, el2){
    if(el.classList.contains('enemy')){
        el.classList.remove('enemy');
    }
    if(el2.classList.contains('player')){
        el2.classList.remove('player');
    }
    el.classList.add('player');
    el2.classList.add('enemy');
}

if(restartBtn){
    restartBtn.addEventListener('click', () => {
        location.reload();
    });
}