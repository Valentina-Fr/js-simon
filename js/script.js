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

//Timer
let seconds = 30;

//Recupero elemento html
var countdown = document.getElementById("countdown");
countdown.innerText = seconds;

//Generare 5 numeri casuali
while (randomNumbers.length < 5) {
    const random = Math.floor(Math.random() * 100) + 1;
    if (!randomNumbers.includes(random)) {
        randomNumbers.push(random);
    }
}
alert(randomNumbers);
console.table(randomNumbers);

//Parte il timer
var timer = setInterval (function(){
    if(seconds === 0) {
        clearInterval(timer);
        countdown.innerText = "";
        for (let i = 0; i < 5; i++) {
            do {
                var guess = prompt("Inserisci un numero da 1 a 100");
            } while (!guess || isNaN(guess) || guess.trim() === "" || guess < 1 || guess > 100);
            if (randomNumbers.includes(parseInt(guess))) {
                matchingNumbers.push(parseInt(guess));
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
    } else {
        countdown.innerText = --seconds;
    }
}, 1000)