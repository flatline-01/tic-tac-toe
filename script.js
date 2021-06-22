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
    localStorage.setItem('gameMode', playWithComputer.toString());
}

callGameModeFunction(playWithComputer.toString(), icons[1]);
callGameModeFunction(playWithPerson.toString(), icons[0]);

addClassForPlayer('o', circle);
addClassForPlayer('x', cross);

toggleSelectedClass(icons[0], icons[1]);
toggleSelectedClass(icons[1], icons[0]);
toggleSelectedClass(icons[2], icons[3]);
toggleSelectedClass(icons[3], icons[2]);


settingsIcon.addEventListener('click', () => settingsList.classList.toggle('hidden'));

closeIcon.addEventListener('click', () => settingsList.classList.add('hidden'));


function callGameModeFunction(func, elem){
    if(localStorage.getItem('gameMode') === func){
        elem.classList.add('selected');
        let play = eval('(' + localStorage.getItem('gameMode') + ')');
        play();
    }
}
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
            localStorage.setItem('gameMode', playWithComputer.toString());
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
function playWithPerson(){
    let  count = 0;

    wrapper.onclick = function(e){
        if(e.target.classList.contains('field')){
            if(count % 2 === 0){
                move(e.target, localStorage.getItem('player'), 'player'); 
                count+=1;
            }
            else{
                move(e.target, localStorage.getItem('enemy'), 'enemy'); 
                count+=1;
            }

            checkWinner('x');
            checkWinner('o');
        }
    }
}

function playWithComputer(){
    let setOfNums = new Set();
    wrapper.onclick = function(e){
        if(e.target.classList.contains('field')){
            move(e.target, localStorage.getItem('player'), 'player');
        }
            checkWinner('x');
            checkWinner('o');
        }
        wrapper.addEventListener("mouseup", function() {

            let random = getRandomNum(setOfNums.size - 2);

            setTimeout(() => {

               for(let i = 0; i < fields.length; i++){
                  if(fields[i].innerHTML === ''){
                    setOfNums.add(+fields[i].id.slice(2));
                  }
                  else{
                      setOfNums.delete(+fields[i].id.slice(2));
                  }
               }

                if(random >=  setOfNums.size){
                    random = random -2;
                    move(fields[[...setOfNums][random]],localStorage.getItem('enemy'), 'enemy');
                }
                else{
                    move(fields[[...setOfNums][random]],localStorage.getItem('enemy'), 'enemy');
                }

            checkWinner('x');
            checkWinner('o');

            }, 200);
           
        });
}

function move(elem, sign, className){
    if(elem.innerHTML !== '') return;
    elem.innerHTML = sign;
    elem.classList.add(className);
}

function getRandomNum(num){
    if(num <= 0){
        return Math.floor(Math.random() * 9); 
    }
    return Math.floor(Math.random() * num);
}

function checkWinner(sign){
    if(fields[0].innerHTML === sign && fields[1].innerHTML === sign && fields[2].innerHTML === sign){
       gameOver(sign);
       return;
    }
    else if(fields[3].innerHTML === sign && fields[4].innerHTML === sign && fields[5].innerHTML === sign){
        gameOver(sign);
        return;
    }
    else if(fields[6].innerHTML === sign && fields[7].innerHTML === sign && fields[8].innerHTML === sign){
        gameOver(sign);
        return;
    }

    else if(fields[0].innerHTML === sign && fields[3].innerHTML === sign && fields[6].innerHTML === sign){
        gameOver(sign);
        return;
    }
    else if(fields[1].innerHTML === sign && fields[4].innerHTML === sign && fields[7].innerHTML === sign){
        gameOver(sign);
        return;
    }
    else if(fields[2].innerHTML === sign && fields[5].innerHTML === sign && fields[8].innerHTML === sign){
        gameOver(sign);
        return;
    }
    else if(fields[0].innerHTML === sign && fields[4].innerHTML === sign && fields[8].innerHTML === sign){
        gameOver(sign);
        return;
    }
    else if(fields[2].innerHTML === sign && fields[4].innerHTML === sign && fields[6].innerHTML === sign){
        gameOver(sign);
        return;
    }
    else if(fields[0].textContent !== '' && fields[1].textContent !== '' && fields[2].textContent !== '' && fields[3].textContent !== '' &&fields[4].textContent !== '' && fields[5].textContent !== '' && fields[6].textContent !== '' && fields[7].textContent !== '' && fields[8].textContent !== ''){
        gameOver();
        return;
    }
}

function gameOver(sign){
    if(sign !== undefined ){
        if(sign === 'x'){
            gameOverMessage.innerHTML = `x win.`;
        }
        else{
            gameOverMessage.innerHTML =`o win.`;
        }
    }
    if(sign === undefined){
        gameOverMessage.innerHTML =`it was a draw.`;
    }
    gameOverWindow.setAttribute('open', 'true');
}

goOutBtn.addEventListener('click', () => {
    window.close();
});

restartBtn.addEventListener('click', () => {
    location.reload();
});