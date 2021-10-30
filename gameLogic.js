const field = document.querySelector('#field');
const cells  = document.querySelectorAll('.cell');

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

    if(field){
        field.onclick = function(e){
            if(e.target.classList.contains('cell')){
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
}

function playWithAIEasy(){

    let setOfNums = new Set();
    
    palyerMove();

    if(field){
        field.addEventListener('mouseup', function() {

            let random = getRandomNum(setOfNums.size - 2);
    
            setTimeout(() => {
    
                for(let i = 0; i < cells.length; i++){
                    if(cells[i].innerHTML === ''){
                    setOfNums.add(+cells[i].id.slice(2));
                    }
                    else{
                        setOfNums.delete(+cells[i].id.slice(2));
                    }
                }
    
                if(random >=  setOfNums.size){
                    random = random -2;
                    move(cells[[...setOfNums][random]],localStorage.getItem('enemy'), 'enemy');
                }
                else{
                    move(cells[[...setOfNums][random]],localStorage.getItem('enemy'), 'enemy');
                }
    
            checkWinner('x');
            checkWinner('o');
    
            }, 200);
            
        });
    }
}

function playWithAIHard(){
   
    palyerMove();

    let AIGameTacticNum = getRandomNum(winCombos.length);

    if(field){
        field.addEventListener("mouseup", function() {
            setTimeout(() => {
                if(document.getElementById('id' + winCombos[AIGameTacticNum][0]).textContent === ''){
                        move(cells[winCombos[AIGameTacticNum][0]],localStorage.getItem('enemy'), 'enemy');
                } 
                else if(document.getElementById('id' + winCombos[AIGameTacticNum][1]).textContent === ''){
                    if(checkIfSomeoneWins(localStorage.getItem('player'))){
                        move(cells[checkIfSomeoneWins(localStorage.getItem('player'))], localStorage.getItem('enemy'), 'enemy');
                    } 
                    else if(checkIfSomeoneWins(localStorage.getItem('enemy'))){
                        move(cells[checkIfSomeoneWins(localStorage.getItem('enemy'))], localStorage.getItem('enemy'), 'enemy');
                    }
                    else {
                        move(cells[winCombos[AIGameTacticNum][1]],localStorage.getItem('enemy'), 'enemy');
                    }
                }
                else if(document.getElementById('id' + winCombos[AIGameTacticNum][2]).textContent == ''){
                    if(checkIfSomeoneWins(localStorage.getItem('player'))){
                        move(cells[checkIfSomeoneWins(localStorage.getItem('player'))], localStorage.getItem('enemy'), 'enemy');
                    }
                    else if(checkIfSomeoneWins(localStorage.getItem('enemy'))){
                        move(cells[checkIfSomeoneWins(localStorage.getItem('enemy'))], localStorage.getItem('enemy'), 'enemy');
                    }
                    else {
                        move(cells[winCombos[AIGameTacticNum][2]],localStorage.getItem('enemy'), 'enemy');
                    }
                }
                else {
                    if(checkIfSomeoneWins(localStorage.getItem('player'))){
                        move(cells[checkIfSomeoneWins(localStorage.getItem('player'))], localStorage.getItem('enemy'), 'enemy');
                    }
                    else if(checkIfSomeoneWins(localStorage.getItem('enemy'))){
                        move(cells[checkIfSomeoneWins(localStorage.getItem('enemy'))], localStorage.getItem('enemy'), 'enemy');
                    } else {
                        for(let item of [...cells]){
                            if(item.innerHTML == ''){
                                move(cells[item.id.slice(2)], localStorage.getItem('enemy'), 'enemy');
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
    for(let i = 0 ;  i < winCombos.length; i++){
        console.log(winCombos[i]);
        let a = document.getElementById('id' + winCombos[i][0]);
        let b = document.getElementById('id' + winCombos[i][1]);
        let c = document.getElementById('id' + winCombos[i][2]);
        if(a.innerHTML === sign && b.innerHTML === sign & c.innerHTML === sign){
            gameOver(sign);
        }
        else if(cells[0].textContent !== '' && cells[1].textContent !== '' && cells[2].textContent !== '' && cells[3].textContent !== '' && cells[4].textContent !== '' && cells[5].textContent !== '' && cells[6].textContent !== '' && cells[7].textContent !== '' && cells[8].textContent !== ''){
            gameOver();
        }
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
            return c.id.slice(2);
        } else if(a.innerHTML == sign && c.innerHTML == sign && b.innerHTML == ''){
            return b.id.slice(2);
        } 
        else if(b.innerHTML == sign && c.innerHTML == sign && a.innerHTML == ''){
            return a.id.slice(2);
        }
    }
}

function palyerMove(){
    if(field){
        field.onclick = function(e){
            if(e.target.classList.contains('cell')){
                move(e.target, localStorage.getItem('player'), 'player');
            }
                checkWinner('x');
                checkWinner('o');
        } 
    }
}