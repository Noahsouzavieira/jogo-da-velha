let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");


// Matriz de padrão vencedora //

let winningPaternn = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];


// Jogador "X" joga primeiro//

let xTurn = true;
let count = 0;

//Desabilita todos os botões
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    //habilita aparecer
    popupRef.classList.remove("hide");
};

//Habilitar todos os botões(Para novo jogo e recomeço)
const enableButtons = () => {
    btnRef.forEach(element => {
        element.innerText = "";
        element.disabled = false;
    });
    //desabilitar abertura
    popupRef.classList.add("hide");
};




//Esta função é executada quando um jogador ganha
const winFunction =
    (letter) => {
        disableButtons();
        if (letter == "X") {
            msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
        } else {
            msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
        }
    };

//Função para empate
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#1F60E; <br> Isso é um empate";
};


//Novo Jogo
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});




//Lógica de vitória
const winChecker = () => {
    //Percorre todos os padrões de vitória
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        //Verificar se os elementos estão preenchidos
        //Se 3 elementos vazios são iguais e dariam vitória
        if (element1 != "" && (element2 != "") & (element3 != "")) {
            if (element1 == element2 && element2 == element3) {
                //Se todos os 3 botões tiverem os mesmos valores, passe o valor para winFunction
                winFunction(element1);
            }
        }
    }
};

//Exibição X/O ao clicar//
btnRef.forEach((element) => {

    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            //Exibição X 
            element.innerText = "X";
            element.disabled = true;
        } else {
            xTurn = true;
            //Exibição Y
            element.innerText = "O";
            element.disabled = true;
        }
        //Incrementar a contagem a cada clique//
        count += 1;
        if (count == 9) {
            drawFunction();
        }
        //verifique a vitória em cada clique
        winChecker();
    });
});
//Habilitar botões e desabilitar abertura na página de carregamento
window.onload = enableButtons;