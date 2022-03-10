// create a class that would define the 52 cards that will be distributed.
class Cards {
    constructor(index, value, name, symbol){
        this.index = index;
        this.value = value;
        this.name = name;
        this.symbol = symbol;
    };

    //calledName = `${this.name} of ${this.symbol}`;
   
    defineCard(){
        console.log(this.value + this.name + this.index + this.symbol)
    };
}

class Players{
    constructor(){
        this.deck = [];
        this.points = 0;
    }
}

// distribute values using loop.
let my = new Players();
let cpu = new Players();


let cardDeck = [];
for (i = 0; i < 52; i++){
    switch (i%13){
        case 0:
            cardDeck.push(new Cards(i,1,'Ace'));
            break;
        case 1:
            cardDeck.push(new Cards(i,2,'2'));
            break;
        case 2:
            cardDeck.push(new Cards(i,3,'3'));
            break;
        case 3:
            cardDeck.push(new Cards(i,4,'4'));
            break; 
        case 4:
            cardDeck.push(new Cards(i,5,'5'));
            break;
        case 5:
            cardDeck.push(new Cards(i,6,'6'));
            break;
        case 6:
            cardDeck.push(new Cards(i,7,'7'));
            break;
        case 7:
            cardDeck.push(new Cards(i,8,'8'));
            break;
        case 8:
            cardDeck.push(new Cards(i,9,'9'));
            break;
        case 9:
            cardDeck.push(new Cards(i,10,'10'));
            break;
        case 10:
            cardDeck.push(new Cards(i,11,'Jack'));
            break;
        case 11:
            cardDeck.push(new Cards(i,12,'Queen'));
            break;
        case 12:
            cardDeck.push(new Cards(i,13,'King'));
            break;
    }
}

for(i = 0; i < 52 ; i++){
    switch(i%4){
        case 0:
            cardDeck[i].symbol = 'Spade';
            break;
        case 1:
            cardDeck[i].symbol = 'Heart';           
            break;
        case 2:
            cardDeck[i].symbol = 'Club';            
            break;
        case 3:
            cardDeck[i].symbol = 'Diamond';          
            break;
    }
}

//Distribute Deck to Players

let rand;

for(i = 0; i < 52;i++){
        rand = Math.floor(Math.random()*(52-i));
    
    if (i%2){
        my.deck.push(cardDeck[rand]);   
        cardDeck.splice(rand,1);
    } else {
        cpu.deck.push(cardDeck[rand]);
        cardDeck.splice(rand,1);
    }
}

class Menu{
    constructor(){
        this.round = 0;
    }

//Create Function that would number of rounds. 
    start(){
        let selection = this.runOpeningScreen();

        while (selection !=0){
            if (selection === null){
                alert ('Game Over')
                return;
            }
            
            switch(selection){
                case'1':
                    this.drawCard();
                    break;
             /*   case '2':
                    this.readRules();
                    break;  This is very buggy */
                case'0':
                    selection = 0;
                    break;
                default:
                    break;
            }
            this.runOpeningScreen();
        } 
    }

    runOpeningScreen(){
        return prompt(`
        1)Start Game
        2)Read Rules
        0)Exit
        `)
    };

 /*   readRules(){
        return prompt(`
        The players plays a card each round, the player who played the higher card is awarded a point. Tie results in no points for either player. The player with the highest point in the end wins.
        1)OK
        `     
        alert("The players plays a card each round, the player who played the higher card is awarded a point. Tie results in no points for either player. The player with the highest point in the end wins.");
        selection = this.runOpeningScreen();
    }   */

    //Create function that would increase round

    

    drawCard(){
       console.log("Round" + this.round); 
       this.myRandom = Math.floor(Math.random()*(my.deck.length));
       this.cpuRandom = Math.floor(Math.random()*(cpu.deck.length));

       let myCardName = `${my.deck[this.myRandom].name} of ${my.deck[this.myRandom].symbol}`
       let cpuCardName = `${cpu.deck[this.cpuRandom].name} of ${cpu.deck[this.cpuRandom].symbol}`

       console.log("Cards" + my.deck.length);
       if (my.deck[this.myRandom].value === cpu.deck[this.cpuRandom].value){
           console.log ("Tie")
       } else if (my.deck[this.myRandom].value > cpu.deck[this.cpuRandom].value){
            my.points++;   
            console.log ('You won with a ' + myCardName + ' against ' + cpuCardName + '! You have ' + my.points);
       }
       my.deck.splice(this.myRandom,1);
       cpu.deck.splice(this.cpuRandom,1);
       this.round++;
    }



}

let war = new Menu();
war.start();