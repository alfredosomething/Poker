class Deck{
  constructor(){
    this.deck = [];
    this.player = [];
    this.riverCount = 0;

  }

  //creates an array of cards inserts into this.deck[]
  makeDeck(){

    let card = (value, suit) =>{
      this.value = value;
      this.suit = suit;
      this.show = true;
      this.cardName = value + ' of ' + suit;
      return {cardName:this.cardName, suit:this.suit, value:this.value, show:this.show}
    }
    let values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
    let suites = ['♣','♦','♠','♥']

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

          this.player[i].push(this.deck[this.deck.length - 1]);
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
    var div = document.createElement("div");
    div.className = "blank";

    if(card.show == true){
      //will show the card if this.player[][].show == true; true by default
    deck.showCard(div, idSlot,card);

  }
  else{idSlot.appendChild(div);}


  }

  //shows the card value and suit(flips card): showCard(the parent id(player positon/river), id name of card slot, object position in array ex: )
  showCard(div, idSlot, card){
    //creates a value div w/ textnode value and id
    var divValue = document.createElement("div");
    divValue.id = "value";
    var nodeValue = document.createTextNode(card.value);
    divValue.appendChild(nodeValue);
    //creates a suit div w/ textnode suit and id
    var divSuit = document.createElement("div");
    divSuit.id = "suit";
    var nodeSuit = document.createTextNode(card.suit);
    divSuit.appendChild(nodeSuit);

    //appends the value div and suit div to the blank div
      div.appendChild(divValue);
      div.appendChild(divSuit);

    idSlot.appendChild(div);

  }

  next(){
    console.log(this.riverCount);
    this.riverCount++;

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




//end of classes


function play(){
//checks to see if deck variable was made before
if (typeof deck !== 'undefined')console.log("new game");
deck = new Deck();

deck.makeDeck();
deck.shuffle();
deck.playerHands();
deck.fillSlots();

}

function playRiver(){
  deck.next();
}
