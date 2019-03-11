const suitNames = "CDSH";
const rankNames = "23456789TJQKA";
const cardList = [
  "🂲 🂳 🂴 🂵 🂶 🂷 🂸 🂹 🂺 🂻 🂽 🂾 🂱",
  "🂢 🂣 🂤 🂥 🂦 🂧 🂨 🂩 🂪 🂫 🂭 🂮 🂡",
  "🃂 🃃 🃄 🃅 🃆 🃇 🃈 🃉 🃊 🃋 🃍 🃎 🃁",
  "🃒 🃓 🃔 🃕 🃖 🃗 🃘 🃙 🃚 🃛 🃝 🃞 🃑",
];;
class Deck{
  constructor(){
    this.deck = [];
    this.player = [];
    this.river = [];//will hold river cards, later pushed into finalCards array
    this.riverCount = 0;
  }

  parseString(input){
      var parsedCards;
      console.log(parsedCards);
          parsedCards = input.map(card => {

            var rank = rankNames.indexOf(card[0]);
            var suit = suitNames.indexOf(card[1]);
            return  rank+ (suit << 4);
          });


          parsedCards.sort((a, b) => {
            console.log(a);
            console.log(b);
              const dif = (a & 15) - (b & 15);
              if (dif === 0) { return a - b }
              return dif;
          });

      return parsedCards;
  }
  //creates an array of cards inserts into this.deck[]
  get last(){
    return this.deck[this.deck.length - 1];
  }
  makeDeck(){
    let card = (value, suit) =>{
      this.value = value;
      this.suit = suit;
      this.show = true;
      this.cardName = value + ' of ' + suit;
      this.parsedCard = deck.parseString([this.value + this.suit]);
      return {cardName:this.cardName, suit:this.suit, value:this.value, show:this.show, parsedCard:this.parsedCard}
    }
    let values = ['2','3','4','5','6','7','8','9','T','J','Q','K','A']
    let suites = ['C','D','S','H']

    for(let s=0; s<suites.length; s++){
      for(let v = 0; v<values.length; v++){
          this.deck.push(card(values[v], suites[s]))
      }
    }
  }

  //fills in player position and card in this.player[i = player number][j = card slot(1-2 cards)] array
  playerHands(){

    for(var i = 0; i<8; i++){
        //creates and array spot for player to hold 2 cards
        this.player[i] = [];
      for(var j = 0; j<2; j++){

          this.player[i].push(this.last);
          //console.log(this.player[i][0].value);
          this.deck.pop();
      }
    }
  }


  //will place card css to the board
  fillSlots(){

    for(var i=0; i<8; i++){
      //parent variable will hold the id name to the parent(player position) of the two new blank cards
      let parent = document.getElementById(i);
      for(var j=0; j<2; j++){
        //makes all cards that are not the first player(actual player) blank.
        if(i!=0)this.player[i][j].show = false;
      deck.placeCard(parent ,this.player[i][j]);

      }

    }

  }

  //places card on boards(checks to see if card should be just blank or be visible)
  //placeCard(parent id(player / river id) position, array positon(could be last card for river or this.player[][]))
  placeCard(idSlot, card){
      //creates a blank card

    var div = document.createElement("span");
    div.className = "textCard";

    if(card.show == true){
      div.innerText =(cardList[card.parsedCard >> 4].split(" ")[card.parsedCard & 15]);
      //will show the card if this.player[][].show == true; true by default
    //deck.showCard(div, idSlot,card);

  }else{div.innerText = "🂠"};

    idSlot.appendChild(div);

  }

  //shows the card value and suit(flips card): showCard(the parent id(player positon/river), id name of card slot, object position in array ex: )
  showCard(div, idSlot, card){
    //creates a value div w/ textnode value and id
    var divValue = document.createElement("div");
    //
    divValue.className = "textCard";
    divValue.innerText =(cardList[card.parsedCard >> 4].split(" ")[card.parsedCard & 15]);

    //divValue.appendChild(nodeValue);
    //console.log(nodeValue);

    /*
    divValue.id = "value";
    var nodeValue = document.createTextNode(card.value);
    divValue.appendChild(nodeValue);
    //creates a suit div w/ textnode suit and id
    var divSuit = document.createElement("div");
    divSuit.id = "suit";
    var nodeSuit = document.createTextNode(card.suit);
    divSuit.appendChild(nodeSuit);
*/
    //appends the value div and suit div to the blank div
    div.appendChild(divValue);
      //div.appendChild(divSuit);

    idSlot.appendChild(div);

  }

  next(){
    if(this.riverCount < 5){
      deck.placeCard(document.getElementsByClassName('riverSlot')[this.riverCount], this.last);
      console.log(this.last.parsedCard);
      this.riverCount++;
      this.river.push(this.last.value + this.last.suit);
      this.deck.pop();
    }else{
      console.log("Max river cards hit");
    }
  }
  evaluateHand(){
    var hand = [];
    var card1 = this.player[0][0];
    var card2 = this.player[0][1];
    hand.push(card1.value + card1.suit);
    hand.push(card2.value + card2.suit);
    this.river.forEach(card =>{
      hand.push(card);
    });
    var parsedHand = deck.parseString(hand);
    console.log(parsedHand);





  }


  shuffle(){
       let currentIndex = this.deck.length, temporaryValue, randomIndex;

      while(0 != currentIndex){
        randomIndex = Math.floor(Math.random()*currentIndex);
        currentIndex-=1;
        temporaryValue = this.deck[currentIndex];
        this.deck[currentIndex] = this.deck[randomIndex];
        this.deck[randomIndex] = temporaryValue;
      }
  }

}




//end of class
//button functions

function play(){
  //checks to see if deck variable was made before
  if (typeof deck !== 'undefined'){
    console.log("new game");
    for(let i = 0; i < 8; i++){
      let myNode = document.getElementById(i);
        while (myNode.firstChild) {
          myNode.removeChild(myNode.firstChild);
        }
    }
    for(let i = 0; i < 5; i++){
      let myNode = document.getElementsByClassName('riverSlot')[i];
        while (myNode.firstChild) {
          myNode.removeChild(myNode.firstChild);
        }
    }



  }
  deck = new Deck();
  deck.makeDeck();
  deck.shuffle();
  deck.playerHands();
  deck.fillSlots();


}

function playRiver(){
  deck.next();
}
function Evaluate(){
  deck.evaluateHand();
}
