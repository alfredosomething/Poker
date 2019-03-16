const suitNames = "CDSH";
const rankNames = "23456789TJQKA";
const cardList = [
  "🂲 🂳 🂴 🂵 🂶 🂷 🂸 🂹 🂺 🂻 🂽 🂾 🂱",
  "🂢 🂣 🂤 🂥 🂦 🂧 🂨 🂩 🂪 🂫 🂭 🂮 🂡",
  "🃂 🃃 🃄 🃅 🃆 🃇 🃈 🃉 🃊 🃋 🃍 🃎 🃁",
  "🃒 🃓 🃔 🃕 🃖 🃗 🃘 🃙 🃚 🃛 🃝 🃞 🃑",
];
const allPerms = "01234,01235,01236,01245,01246,01256,01345,01346,01356,01456,02345,02346,02356,02456,03456,12345,12346,12356,12456,13456,23456".split(",");
const cardToString = (card) => rankNames[card & 15] + suitNames[card >> 4];
const rankingNames = "Royal flush,Straight flush,Four of a kind,Full house,Flush,Straight,Three of a kind,Two pair,Two of a kind,".split(",");
const flushes       = /00000|11111|22222|33333/;
const straights     = /01234|12345|23456|34567|45678|56789|6789a|789ab|89abc/;
const fourOfKind    = /0000|1111|2222|3333|4444|5555|6666|7777|8888|9999|aaaa|bbbb|cccc/;
const threeOfKind   = /000|111|222|333|444|555|666|777|888|999|aaa|bbb|ccc/;
const twoOfKind     = /00|11|22|33|44|55|66|77|88|99|aa|bb|cc/;
const fullHouse     = /(000|111|222|333|444|555|666|777|888|999|aaa|bbb|ccc)(00|11|22|33|44|55|66|77|88|99|aa|bb|cc)|(00|11|22|33|44|55|66|77|88|99|aa|bb|cc)(000|111|222|333|444|555|666|777|888|999|aaa|bbb|ccc)/;
const twoPair       = /(00|11|22|33|44|55|66|77|88|99|aa|bb|cc).*(00|11|22|33|44|55|66|77|88|99|aa|bb|cc)/;










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
  evaluateHand(playerCard){
    var newHand = [];
    var card1 = playerCard[0];
    var card2 = playerCard[1];
    newHand.push(card1.value + card1.suit);
    newHand.push(card2.value + card2.suit);
    this.river.forEach(card =>{
      newHand.push(card);
    });
    var parsedHand = deck.parseString(newHand);
    //return hand to scores
    console.log(parsedHand);//[0, 2, 3, 51, 20, 27, 60]
    //function inserts the parsedhand and returns the highest score of that players hand
    var suited, ranked, hand;
    var allHandsRanked = [];
    const tests = {  // a set of named tests that test a hand and return true if the hand matches
        royalFlush    : () => tests.flush() && tests.straight() && tests.royal(),
        straightFlush : () => tests.flush() && tests.straight(),
        kind4         : () => fourOfKind.test(ranked),
        fullHouse     : () => fullHouse.test(ranked),
        flush         : () => flushes.test(suited),
        straight      : () => straights.test(ranked),
        kind3         : () => threeOfKind.test(ranked),
        twoPair       : () => twoPair.test(ranked),
        kind2         : () => twoOfKind.test(ranked),
        highCard      : () => true,  // always true last type checked
        royal         : () => ranked[4] === "c",  // extra test used for royal flush
    };
    //size of all perms
    console.log("test");
    const ranking = Object.values(tests);

    var found = false;
    // this will positon the the 5 cards to every perm until tests return true(loop will terminate and allhandsranked with the highest score)
    for(let permHand = 0; permHand<21 && found!==true; permHand++){
      ranked = suited = hand = "";
      //loop will make a new order of 5 cards depending on the permutation then turn it into a 16 bit string
      for(let index = 0; index<5; index++){
        const singleCard = parsedHand[allPerms[permHand][index]];
        ranked += (singleCard & 15).toString(16);
        suited += (singleCard >> 4).toString(16);
        hand += " " + cardToString(singleCard);
      }
      hand = hand.substr(1);
      //will loop through all test, if a test is passed, that will be the highest possible score
      for(let i = 0; i<11 && found!==true; i++){
        if (ranking[i]()) {  // if test passed
            allHandsRanked.push({ // add the hand and score the hand
                name : rankingNames[i],
                hand : hand,
                score : i * 13 + (12-parseInt(ranked[4],16)),
            });
            found = true;
        }
      }

    }
    console.log(allHandsRanked);
    return allHandsRanked
    .sort((a,b) => a.score - b.score)
    .filter((hand,i,arr)=> i=== 0 ? true : hand.score === arr[i-1].score);



  }

  pickWinner(){
    var winners = [];
    var scores = [];
    for(let i = 0; i<8; i++){
      var result = deck.evaluateHand(this.player[i]);//display the score of player hand
      console.log(result);
      result.forEach(hand => {
      scores.push(hand.score);
      });
    }
    console.log(scores);
    var newValue = scores[1];
    var scoreIndex = 0
    for (let i = 0; i < scores.length; i++) {
      if (scores[i] < newValue) {
        //console.log(scores[i]);
        console.log(newValue);
        winners = [];
        newValue = scores[i];
        winners.push(i);//array contains index of the highest scores
      }
      else if(scores[i] == newValue){
        winners.push(i);
      }
    }
      //return winners;
      console.log(winners);
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
  //checks to see if deck variable was made before, if it was, it will clear the cards and make a new deck
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
  deck.pickWinner();
  //return winners index
}
