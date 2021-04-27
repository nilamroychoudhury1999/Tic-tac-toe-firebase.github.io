var box1 = document.getElementById("box1"),
    box2 = document.getElementById("box2"),
    box3 = document.getElementById("box3"),
    box4 = document.getElementById("box4"),
    box5 = document.getElementById("box5"),
    box6 = document.getElementById("box6"),
    box7 = document.getElementById("box7"),
    box8 = document.getElementById("box8"),
    box9 = document.getElementById("box9");

// Your web app's Firebase configuration

var firebaseConfig = {
    apiKey: "AIzaSyA3EM1Uabi8BiVGLbkiFraaGo_9VdcZW3A",
    authDomain: "kolk-59615.firebaseapp.com",
    projectId: "kolk-59615",
    storageBucket: "kolk-59615.appspot.com",
    messagingSenderId: "747357026461",
    appId: "1:747357026461:web:961f235e02ee699924bc74"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var tictactoeState = database.ref('board/box1');

const boardState = database.ref('board');

boardState.on('value', (snapshot) => {
    const data = snapshot.val();
    // box1.innerHTML = data;
    for (var boxName in data) {
        if (boxName === 'turn') continue;
        console.log(boxName);
        document.getElementById(boxName).innerHTML = data[boxName];
    }
    getWinner();
});

var turn = document.getElementById("turn"),

    boxes = document.querySelectorAll("#main div"),
    X_or_O = 'X';

database.ref('board/turn').on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        turn.innerHTML = data + " Turn Now";
        X_or_O = data;
    } else {
        turn.innerHTML = "Play";
    }
});

function selectWinnerBoxes(b1, b2, b3) {
    b1.classList.add("win");
    b2.classList.add("win");
    b3.classList.add("win");
    turn.innerHTML = b1.innerHTML + " Won Congrat";
    turn.style.fontSize = "40px";
}

function getWinner() {

    if (box1.innerHTML !== "" && box1.innerHTML === box2.innerHTML && box1.innerHTML === box3.innerHTML)
        selectWinnerBoxes(box1, box2, box3);

    if (box4.innerHTML !== "" && box4.innerHTML === box5.innerHTML && box4.innerHTML === box6.innerHTML)
        selectWinnerBoxes(box4, box5, box6);

    if (box7.innerHTML !== "" && box7.innerHTML === box8.innerHTML && box7.innerHTML === box9.innerHTML)
        selectWinnerBoxes(box7, box8, box9);

    if (box1.innerHTML !== "" && box1.innerHTML === box4.innerHTML && box1.innerHTML === box7.innerHTML)
        selectWinnerBoxes(box1, box4, box7);

    if (box2.innerHTML !== "" && box2.innerHTML === box5.innerHTML && box2.innerHTML === box8.innerHTML)
        selectWinnerBoxes(box2, box5, box8);

    if (box3.innerHTML !== "" && box3.innerHTML === box6.innerHTML && box3.innerHTML === box9.innerHTML)
        selectWinnerBoxes(box3, box6, box9);

    if (box1.innerHTML !== "" && box1.innerHTML === box5.innerHTML && box1.innerHTML === box9.innerHTML)
        selectWinnerBoxes(box1, box5, box9);

    if (box3.innerHTML !== "" && box3.innerHTML === box5.innerHTML && box3.innerHTML === box7.innerHTML)
        selectWinnerBoxes(box3, box5, box7);

}

for (var i = 0; i < boxes.length; i++) {
    boxes[i].onclick = function() {

        if (this.innerHTML !== "X" && this.innerHTML !== "O") {
            if (X_or_O === "X") {
                var value2set = "X";
                database.ref('board/' + this.id).set(value2set);
                database.ref('board/turn').set("O");
                console.log(X_or_O);
                this.innerHTML = value2set;
                // turn.innerHTML = "O Turn Now";
                getWinner();
                // X_or_O += 1;

            } else {
                var value2set = "O";
                database.ref('board/' + this.id).set(value2set);
                database.ref('board/turn').set("X");
                console.log(X_or_O);
                this.innerHTML = value2set;
                // turn.innerHTML = "X Turn Now";
                getWinner();
                // X_or_O += 1;
            }
        }

    };
}

function replay() {

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].classList.remove("win");
        boxes[i].innerHTML = "";
        turn.innerHTML = "Play";
        turn.style.fontSize = "25px";
    }

    database.ref('board').set({
        box1: '',
        box2: '',
        box3: '',
        box4: '',
        box5: '',
        box6: '',
        box7: '',
        box8: '',
        box9: '',
        turn: ''
    });

}
