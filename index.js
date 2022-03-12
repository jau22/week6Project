// create a class that would define the 52 cards that will be distributed.
class Cards {
    constructor(index, value, name, symbol){
        this.index = index;
        this.value = value;
        this.name = name;
        this.symbol = symbol;
    };
   
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

let my = new Players();
let cpu = new Players();

class Menu{
    constructor(){
        this.round = 0;
    }

//Create Function that would number of rounds. 
    start(){
        let selection = this.runOpeningScreen();

        while (selection !=0){
            if (selection === null){
                alert ('Thak you for Playing')
                return;
            }
            
            switch(selection){
                case'1':
                    this.newGame();
                    this.drawCard();
                    break;
                case '2':
                    this.readRules();
                    break;
                default:
                    selection = 0;
            }
            selection = this.runOpeningScreen();
        } 
        alert ('Thank you for Playing');
    }

    runOpeningScreen(){
        return prompt(`
        1)Start Game
        2)Read Rules
        0)Exit
        `)
    };

   readRules(){
        alert("The players plays a card each round, the player who played the higher card is awarded a point. Tie results in no points for either player. The player with the highest point in the end wins.");
    } 

    newGame(){

        this.round = 0;
        my.points = 0;
        cpu.points = 0;

        let cardDeck = [];
        for (let i = 0; i < 52; i++){
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

        for(let i = 0; i < 52 ; i++){
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

        for(let i = 0; i < 52;i++){
                rand = Math.floor(Math.random()*(52-i));
            
            if (i%2){
                my.deck.push(cardDeck[rand]);   
                cardDeck.splice(rand,1);
            } else {
                cpu.deck.push(cardDeck[rand]);
                cardDeck.splice(rand,1);
            }
        }
    }

    //

    drawCard(){
        this.myRandom = Math.floor(Math.random()*(my.deck.length));
        this.cpuRandom = Math.floor(Math.random()*(cpu.deck.length));

        this.myCardName = `${my.deck[this.myRandom].name} of ${my.deck[this.myRandom].symbol}`
        this.cpuCardName = `${cpu.deck[this.cpuRandom].name} of ${cpu.deck[this.cpuRandom].symbol}`

        let description = '';
        let endDescription = '';

    
        if (my.deck[this.myRandom].value === cpu.deck[this.cpuRandom].value){
                description = `Round ${this.round + 1}: Tie
                    You: ${this.myCardName}, ${my.points} points
                    CPU: ${this.cpuCardName}, ${cpu.points} points
                    `
            } else if (my.deck[this.myRandom].value > cpu.deck[this.cpuRandom].value){
                my.points++;
                description = `Round ${this.round + 1}: You Won
                    You: ${this.myCardName}, ${my.points} points
                    CPU: ${this.cpuCardName}, ${cpu.points} points
                    `   
            } else if (my.deck[this.myRandom].value < cpu.deck[this.cpuRandom].value){
                cpu.points++;
                description = `Round ${this.round + 1}: You Lost
                    You: ${this.myCardName}, ${my.points} points
                    CPU: ${this.cpuCardName}, ${cpu.points} points
                    `
                }

        my.deck.splice(this.myRandom,1);
        cpu.deck.splice(this.cpuRandom,1);
        this.round++;
        console.log(my.deck.length);

        let selection = this.summary(description);


// if card in deck = 0...

        if (my.deck.length === 0){
            if(my.points > cpu.points){
                endDescription = `You win with ${my.points} points`
            } else if (my.points < cpu.points){
                endDescription = `CPU wins with ${cpu.points} points`
            } else if (my.points === cpu.points){
                endDescription = `You tied with the CPU`
            };
            selection = this.endSummary(endDescription);
            while (selection != 0){
                return;
                }
        } else {
            while (selection != 0){
                if (selection === null){
                    alert ('You left the game')
                    return;
                }               
                switch(selection){
                    case'1':
                        this.drawCard();
                        return;
                        break;
                    case'0':
                        selection = 0; 
                        var quit = true   
                        alert ('You left the game');
                        return;     
                    // this.start();
                        break;
                    default:
                        selection = 0;    
                        return;
                }
            }    
        }
    }

    summary(description){
        return prompt(`
        ${description}
        ------
        1) Next
        0) Leave 
        `);
    }
    
    endSummary(description){
        alert (`
        ${description}
        `);
    }
}

let war = new Menu();
war.start();