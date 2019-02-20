class Deck{
  constructor(){
    this.deck = [];
    this.player = [];

  }
  makeDeck(){
    let card = (value, suit) =>{
      this.value = value;
      this.suit = suit;
      this.cardName = value + ' of ' + suit;
      return {cardName:this.cardName, suit:this.suit, value:this.value}
    }
    let values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
    let suites = ['♣','♦','♠','♥']

    for(let s=0; s<suites.length; s++){
      for(let v = 0; v<values.length; v++){
          this.deck.push(card(values[v], suites[s]))
      }
    }
  }

  draw(){
    //function returns value and suit of top card.
    /*
    function lastCard(theDeck){
      return [theDeck[theDeck.length - 1].value,theDeck[theDeck.length - 1].suit];
    }
    //starts loop to create 2 cards
    var parent = document.getElementsByClassName("container")[0]


    let playerHand = (card1, card2) =>{
      this.card1 = card1;
      this.card2 = card2;
      return {card1:this.card1, card2:this.card2}
    }





  for(var j = 0; j < 6; j++){
    this.player[j] = [];
    for(var i = 0; i <2; i++){
      //creates a blank card
      var div = document.createElement("div");
      div.className = "blank";
      //creates a value div w/ textnode value and id
      var divValue = document.createElement("div");
      divValue.id = "value";
      var nodeValue = document.createTextNode(lastCard(this.deck)[0]);
      divValue.appendChild(nodeValue);

      //creates a suit div w/ textnode suit and id
      var divSuit = document.createElement("div");
      divSuit.id = "suit";
      var nodeSuit = document.createTextNode(lastCard(this.deck)[1]);
      divSuit.appendChild(nodeSuit);
      //appends the value div and suit div to the blank div
      div.appendChild(divValue);
      div.appendChild(divSuit);
      parent.appendChild(div);

      this.player[j].push(lastCard(this.deck));
      console.log(this.player[j][i]);
      this.deck.pop();
      console.log(this.deck[2].cardName);

    }

  }



    //if(this.deck.length < 1)return document.getElementById("new").innerHTML = 'Out of cards';
    //cardId("value").innerHTML = last(this.deck).value;
    //cardId("suit").innerHTML =  last(this.deck).suit;
    //this.deck.pop();

    //cardId("value2").innerHTML = last(this.deck).value;
    //cardId("suit2").innerHTML = last(this.deck).suit;
    //this.deck.pop();
*/
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

        //creates a blank card
        var div = document.createElement("div");
        div.className = "blank";
        //creates a value div w/ textnode value and id

        if(i == 0){
        var divValue = document.createElement("div");
        divValue.id = "value";
        var nodeValue = document.createTextNode(this.player[i][j].value);
        divValue.appendChild(nodeValue);
        //creates a suit div w/ textnode suit and id
        var divSuit = document.createElement("div");
        divSuit.id = "suit";
        var nodeSuit = document.createTextNode(this.player[i][j].suit);
        divSuit.appendChild(nodeSuit);
        //appends the value div and suit div to the blank div
        div.appendChild(divValue);
        div.appendChild(divSuit);
      }
        parent.appendChild(div);

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
