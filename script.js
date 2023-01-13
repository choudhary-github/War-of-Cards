let newDeck = document.getElementById("new-deck");
let deckId;
let drawCard = document.getElementById("new-cards");
let card1Value;
let card2Value;
let computerScore = 0;
let playerScore = 0;
let cardsValue = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "JACK",
  "QUEEN",
  "KING",
  "ACE",
];

function handleClick() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
    });
  setTimeout(() => {
    drawCard.disabled = false;
  }, 1000);
  document.getElementById("remaining").innerHTML = `
  Remaining Cards: 52
`;
}
newDeck.addEventListener("click", handleClick);

function drawCards() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      let images = data.cards.map((item) => item.image);
      for (let i = 0; i < images.length; i++) {
        document.getElementById("cards").children[i].innerHTML = `
          <img src=${images[i]} alt=''/>
        `;
      }
      card1Value = data.cards[0].value;
      card2Value = data.cards[1].value;
      let winner = compareValues(card1Value, card2Value);
      let remainingCards = data.remaining;
      document.getElementById("winner").innerText = winner;
      document.getElementById(
        "remaining"
      ).innerText = `Remaining Cards : ${remainingCards}`;
      if (remainingCards === 0) {
        newDeck.disabled = true;
        drawCard.disabled = true;
        document.getElementById("remaining").innerText =
          computerScore > playerScore
            ? `Computer Win score : ${computerScore}`
            : `Player Win score : ${playerScore}`;
      }
    });
}
drawCard.addEventListener("click", drawCards);

function compareValues(card1Value, card2Value) {
  let card1 = cardsValue.indexOf(card1Value);
  let card2 = cardsValue.indexOf(card2Value);

  computerScore += card1;
  playerScore += card2;
  console.log(computerScore, playerScore);

  if (card1 > card2) {
    return "Computer win the game";
  } else if (card2 > card1) {
    return "Player win the game";
  } else {
    return "War!";
  }
}

// let card1 = cardsValue.indexOf(card1Value);
// let card2 = cardsValue.indexOf(card2Value);
// console.log(card1, card2);
