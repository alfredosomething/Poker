class Deck{
  constructor(){
    this.deck = [];
    this.player = [];

  }
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
    console.log("what");
  }


  placeCard(idSlot, card){
      //creates a blank card
    var div = document.createElement("div");
    div.className = "blank";

    if(card.show == true){

    deck.showCard(div, idSlot,card);

  }
  else{idSlot.appendChild(div);}


  }


  playerHands(){



    for(var i = 0; i<8; i++){
        this.player[i] = [];
      for(var j = 0; j<2; j++){
          this.player[i].push(this.deck[this.deck.length - 1]);
          this.deck.pop();
      }
    }
  }

  fillSlots(){

    for(var i=0; i<8; i++){
      let parent = document.getElementById(i);
      for(var j=0; j<2; j++){
        if(i!=0)this.player[i][j].show = false;
        console.log(this.player[i][j].show)
      deck.placeCard(parent ,this.player[i][j]);

      }

    }

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

deck = new Deck();
deck.makeDeck();
deck.shuffle();
deck.playerHands();
deck.fillSlots();

}

function next(){

}
