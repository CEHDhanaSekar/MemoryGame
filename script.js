let gameboard = document.getElementById('gameboard');
let chance = document.getElementById('chance');
let diffcultLevel = document.getElementById('diff-level');
let defaultChance = 20;
let numofchance = defaultChance;
let gameOVer = false;
let matched = 0
let cardsArray = [
    {
        name :"car",
        icon :`<i class="fa-solid fa-car"></i>`
    },
    {
        name :"helicopter",
        icon :`<i class="fa-solid fa-helicopter"></i>`
    },
    {
        name :"motorcycle",
        icon :`<i class="fa-solid fa-motorcycle"></i>`
    },
    {
        name :"train",
        icon :`<i class="fa-solid fa-train-subway"></i>`
    },
    {
        name :"bicycle",
        icon :`<i class="fa-solid fa-bicycle"></i>`
    },
    {
        name :"van",
        icon :`<i class="fa-solid fa-van-shuttle"></i>`
    },
    {
        name :"car",
        icon :`<i class="fa-solid fa-car"></i>`
    },
    {
        name :"helicopter",
        icon :`<i class="fa-solid fa-helicopter"></i>`
    },
    {
        name :"motorcycle",
        icon :`<i class="fa-solid fa-motorcycle"></i>`
    },
    {
        name :"train",
        icon :`<i class="fa-solid fa-train-subway"></i>`
    },
    {
        name :"bicycle",
        icon :`<i class="fa-solid fa-bicycle"></i>`
    },
    {
        name :"van",
        icon :`<i class="fa-solid fa-van-shuttle"></i>`
    }
]

suffleCards()

function suffleCards(){
    for(let i=cardsArray.length-1;i>=0;i--){
        const randIndex = Math.floor(Math.random()*(i+1));
        [cardsArray[i],cardsArray[randIndex]] = [cardsArray[randIndex],cardsArray[i]]
    }
    displayCards()
}

function restartGame(num) {
    if(gameOVer) {
        location.reload();
    }
    else if(num > 0 && !gameOVer){
        defaultChance = num;
        switch(num){
            case 20:
                diffcultLevel.innerText = "easy"
                break;
            case 15:
                diffcultLevel.innerText = "medium"
                break;
            case 10:
                diffcultLevel.innerText = "hard"
                break;
        }
    }
    numofchance = defaultChance;
    chance.innerHTML = `Flip Chance : ${numofchance}`;
    gameboard.innerHTML = "";
    suffleCards();
}

function displayCards(){
    cardsArray.forEach((cur_el,index,arr)=>{
        const card =  document.createElement('div')
        card.classList.add('active')
        card.classList.add('backside')
        card.setAttribute('id',index)
        gameboard.appendChild(card)
        card.addEventListener('click',flipcard)
    })
}
let checkcards = []
function flipcard(){
    if(checkcards.length<2 && this.classList.contains('active') && this.classList.contains('backside')){
        const cardID = this.getAttribute('id');
        this.classList.remove('backside')
        this.innerHTML = cardsArray[cardID].icon;
        checkcards.push(this)
        if(checkcards.length == 2){
            setTimeout(checkMatch,1500)
        }
    }
}

function checkMatch(){
    if(numofchance>0)
        numofchance-=1
    chance.innerHTML = `Flip Chance : ${numofchance}`
    const card1 = checkcards[0].getAttribute('id')
    const card2 = checkcards[1].getAttribute('id')
    if(cardsArray[card1].name === cardsArray[card2].name){
        matched+=1
        checkcards[0].innerHTML = ""
        checkcards[1].innerHTML = ""
        checkcards[0].style.background = "transparent"
        checkcards[1].style.background = "transparent"
        checkcards[0].style.border = "none"
        checkcards[1].style.border = "none"
        checkcards[0].classList.remove('active')
        checkcards[1].classList.remove('active')

    }
    else{
        checkcards[0].innerHTML = ""
        checkcards[1].innerHTML = ""
        checkcards[0].classList.add('backside')
        checkcards[1].classList.add('backside')
    }
    checkcards.pop()
    checkcards.pop()
    checkGameover()
}

function checkGameover(){
    if(matched>5){
        gameboard.style.width = "300px"
        gameboard.style.height = "300px"
        gameboard.style.fontSize = "2em"
        gameboard.style.display = "flex"
        gameboard.style.background = "black"
        gameboard.style.border = "2px solid white"
        gameboard.style.borderRadius = "50%"
        gameboard.innerHTML = "!...You win...!"
        gameOVer = true;
    }
    else if(matched<6 && numofchance<1){
        gameboard.style.width = "300px"
        gameboard.style.height = "300px"
        gameboard.style.fontSize = "2em"
        gameboard.style.display = "flex"
        gameboard.style.background = "black"
        gameboard.style.border = "2px solid white"
        gameboard.style.borderRadius = "50%"
        gameboard.innerHTML = "!...You loss...!"
        gameOVer = true;
    }
}
