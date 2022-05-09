//fetch().then().then().catch()

let deckId= ''

fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
.then(res => res.json()) //parse into JSON
.then(data => {
    console.log(data)
    deckId = data.deck_id
})
.catch(err => console.log(err))

document.getElementById('dealCards').addEventListener('click', drawCards)

function drawCards(){
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json()) // parse into JSON
    .then(data => {
        console.log(data)
    document.getElementById('player1Card').src = data.cards[0].image
    document.getElementById('player2Card').src = data.cards[1].image
    document.querySelector('h4').innerText = 'Number of Cards Remaining: ' + data.remaining

    let player1Value = convertingToNum(data.cards[0].value)
    let player2Value = convertingToNum(data.cards[1].value)

        if(player1Value > player2Value){
            document.querySelector('h3').innerText = "Player 1 Wins!"
        }else if(player1Value < player2Value){
            document.querySelector('h3').innerText = "Player 2 Wins!"
        }else{
            document.querySelector('h3').innerText = "Time for War!"
        }

    })
}

function convertingToNum (value) {
    if(value === 'ACE'){
        return 14
    }else if(value === 'KING'){
        return 13
    }else if(value === 'QUEEN'){
        return 12
    }else if(value === 'JACK'){
        return 11
    }else {
        return Number(value)
    }
}