/* 
Un alert() espone 5 numeri generati casualmente. (Decidete voi se debbano essere tutti diversi)
Non appena l'utente schiaccia "ok", parte un timer di 30 secondi. (Bonus: visualizzare il timer)
Al termine dei 30 secondi l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt(). (Bonus: far inserire i numeri da un form)
Dopo che sono stati inseriti i 5 numeri, il software mostra in un alert quanti e quali dei numeri da indovinare sono stati individuati. (Bonus: stampare in pagina il risultato, in alternativa all'alert.)
*/

//Array numeri random
const randomNumbers = [];

//Array numeri indovinati
const matchingNumbers = [];

//Array numeri utente
const userNumbers = [];

//Timer
let seconds = 30;

//Recupero elemento html
var countdown = document.getElementById("countdown");
var userGuesses = document.getElementById("user-guesses");
var guess = document.getElementById("number-guess");
var send = document.getElementById("send");
var alertMessage = document.getElementById("alert");
countdown.innerText = seconds--;

//Generare 5 numeri casuali
while (randomNumbers.length < 5) {
    const random = Math.floor(Math.random() * 100) + 1;
    if (!randomNumbers.includes(random)) {
        randomNumbers.push(random);
    }
}

//Stampo numeri casuali
alert(randomNumbers.join(", "));
console.table(randomNumbers);

//Parte il timer
var timer = setInterval (function(){
    //Timer si ferma a 0
    if (seconds === 0) {
        clearInterval(timer);
        //Inserimento numeri utente
        countdown.classList.add("hidden");
        userGuesses.classList.remove("hidden");
        send.addEventListener ("click", function() {
            //Validation
            var userGuess = guess.value;
            if (!userGuess || isNaN(userGuess) || userGuess.trim() === "" || userGuess < 1 || userGuess > 100) {
                alertMessage.classList.remove("hidden");
                guess.value = "";
            } else {
                userNumbers.push(parseInt(userGuess));
                alertMessage.classList.add("hidden");
                guess.value = "";
            }
            //Verifica se il numero è corretto
            if(userNumbers.length === 5) {
                userGuesses.classList.add("hidden");
                countdown.classList.remove("hidden");
                for (let i = 0; i < 5; i++) {
                    if (randomNumbers.includes(userNumbers[i]) && !matchingNumbers.includes(userNumbers[i])) {
                        matchingNumbers.push(userNumbers[i]);
                    }   
                }
                //Stampa risultato
                if (matchingNumbers.length > 1) {
                    countdown.innerText = matchingNumbers.length + " numeri corretti: " + matchingNumbers.join(", ");
                } else if (matchingNumbers.length === 1) {
                    countdown.innerText = "1 numero corretto: " + matchingNumbers;
                } else {
                    countdown.innerText = "Nessun numero inserito è corretto";
                }
            }
        });
    } else {
        countdown.innerText = seconds--;
    }
}, 1000);