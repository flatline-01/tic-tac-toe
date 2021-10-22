const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];

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

function playWithAIEasy(){
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

function playWithAIHard(){

    wrapper.onclick = function(e){
        if(e.target.classList.contains('field')){
            move(e.target, localStorage.getItem('player'), 'player');
        }
            checkWinner('x');
            checkWinner('o');
    } 

    let AIGameTacticNum = getRandomNum(winCombos.length);

    wrapper.addEventListener("mouseup", function() {
        setTimeout(() => {
            if(document.getElementById('id' + winCombos[AIGameTacticNum][0]).textContent == ''){
                    move(fields[winCombos[AIGameTacticNum][0]],localStorage.getItem('enemy'), 'enemy');
            } 
            else if(document.getElementById('id' + winCombos[AIGameTacticNum][1]).textContent == ''){
                if(checkIfSomeoneWins(localStorage.getItem('player'))){
                    move(fields[checkIfSomeoneWins(localStorage.getItem('player'))], localStorage.getItem('enemy'), 'enemy');
                } 
                else if(checkIfSomeoneWins(localStorage.getItem('enemy'))){
                    move(fields[checkIfSomeoneWins(localStorage.getItem('enemy'))], localStorage.getItem('enemy'), 'enemy');
                }
                else {
                    move(fields[winCombos[AIGameTacticNum][1]],localStorage.getItem('enemy'), 'enemy');
                }
            }
            else if(document.getElementById('id' + winCombos[AIGameTacticNum][2]).textContent == ''){
                if(checkIfSomeoneWins(localStorage.getItem('player'))){
                    move(fields[checkIfSomeoneWins(localStorage.getItem('player'))], localStorage.getItem('enemy'), 'enemy');
                }
                else if(checkIfSomeoneWins(localStorage.getItem('enemy'))){
                    move(fields[checkIfSomeoneWins(localStorage.getItem('enemy'))], localStorage.getItem('enemy'), 'enemy');
                }
                else {
                    move(fields[winCombos[AIGameTacticNum][2]],localStorage.getItem('enemy'), 'enemy');
                }
            }
            else {
                if(checkIfSomeoneWins(localStorage.getItem('player'))){
                    move(fields[checkIfSomeoneWins(localStorage.getItem('player'))], localStorage.getItem('enemy'), 'enemy');
                }
                else if(checkIfSomeoneWins(localStorage.getItem('enemy'))){
                    move(fields[checkIfSomeoneWins(localStorage.getItem('enemy'))], localStorage.getItem('enemy'), 'enemy');
                } else {
                    for(let item of [...fields]){
                        if(item.innerHTML == ''){
                            move(fields[item.id.slice(2)], localStorage.getItem('enemy'), 'enemy');
                            break;
                        }
                    }
                }
            }
            
            checkWinner('x');
            checkWinner('o');

        }, 200);
    });
}

function move(elem, sign, className){
    if(elem.innerHTML === ''){
        elem.innerHTML = sign;
        elem.classList.add(className);
    };
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
        gameOverMessage.innerHTML =`draw.`;
    }
    gameOverWindow.setAttribute('open', 'true');
}

function checkIfSomeoneWins(sign){
    for(let i = 0; i < winCombos.length; i++){
        let a = document.getElementById('id' + winCombos[i][0]);
        let b = document.getElementById('id' + winCombos[i][1]);
        let c = document.getElementById('id' + winCombos[i][2]);
        if(a.innerHTML == sign && b.innerHTML == sign && c.innerHTML == ''){
            console.log(c.id.slice(2));
            return c.id.slice(2);
        } else if(a.innerHTML == sign && c.innerHTML == sign && b.innerHTML == ''){
            console.log(b.id.slice(2));
            return b.id.slice(2);
        } else if(b.innerHTML == sign && c.innerHTML == sign && a.innerHTML == ''){
            console.log(a.id.slice(2));
            return a.id.slice(2);
        } else {
            console.log(null);
        }
    }
}