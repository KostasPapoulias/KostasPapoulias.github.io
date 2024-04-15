//      GLOBAL
let animals = ['cat', 'duck', 'frog', 'goat', 'horse', 'pig', 'rabbit', 'turkey', 'rooster', 'rat', 'cow', 'dachshund']; //Default array with all the animals
let IMG_PATH = "../../png/";
let MAX_ANIMALS = localStorage.getItem('MAX_ANIMALS');
let MAX_ROUNDS = localStorage.getItem('MAX_ROUNDS');
let INFINITY_GAME = JSON.parse(localStorage.getItem('INFINITY_GAME'));
let COMPLEXITY_INC = JSON.parse(localStorage.getItem('COMPLEXITY_INC'));

//show result on screen
const overlay = document.getElementById('overlay');
const contentDiv = document.createElement('div');


const overlayEnd = document.getElementById('overlayEnd');
const buttonContainer = document.createElement('div');
const restartButton = document.createElement('button');
const menuButtonOv = document.createElement('button');
const contentDivEnd = document.createElement('div');

function createOverlay(){
    contentDiv.classList.add('message');
    overlay.appendChild(contentDiv);
}
function createEndGameOverlay(){
    buttonContainer.classList.add('button-container');
    menuButtonOv.textContent = 'Return to Menu';
    restartButton.textContent = 'Play Again!';

    menuButtonOv.classList.add('end_button');
    restartButton.classList.add('end_button');

    buttonContainer.appendChild(menuButtonOv);
    buttonContainer.appendChild(restartButton);

    contentDivEnd.classList.add('message');
    overlayEnd.appendChild(contentDivEnd)

    overlayEnd.appendChild(buttonContainer);

    //listeners
    menuButtonOv.addEventListener('click', returnMenu);
    restartButton.addEventListener("click", reset)
}
function endGame(){
    overlayEnd.style.display = 'block';
}
function closeEndGame(){
    overlayEnd.style.display = 'none';
}
function returnMenu(){
    location.reload();
}
function showOverlay(text) {
    overlay.style.display = 'block';
    contentDiv.innerHTML = text;
    setTimeout(hideOverlay,2000)
}
function hideOverlay() {
    overlay.style.display = 'none';
}

class cellClass{
    constructor(name, side, image){
        this.name = name;
        this.side = side;
        this.displayed = false;
        this.image = image;
    }

    setDisplayed(flag){
        this.displayed = flag;
    }

    getName(){
        return this.name;
    }

    getImage(){
        return this.image;
    }
}

//      LOCAL
let total_attempts = 0;
let success_attempts= 0;
let ROUNDS_PLAYED = 0;
let WIN_STREAK = 0;
let guessedAnimals = 0;

let cell_selection =[]; //animals that exists in the select section
let cell_highlight =[]; //animals that exists in the highlight section
shuffleArray(animals);
let cell1 = animals.slice(0, MAX_ANIMALS); //cell_selection
let cell2 = animals.slice(0, MAX_ANIMALS); //cell_highlight

let highlightCell = document.createElement('div'); //this variable is used to display the highlight image and as a parent

let selectedCellName; //stores the name of selected cell
let select_section = document.getElementById('select_section');
let main_section = document.getElementById('main_section');



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCells() {
    cell_highlight = []
    let i = 0;
    cell1.forEach((cellName) => {
        const image = addImage(cellName, 1);
        cell_highlight[i] = new cellClass(cellName, 1, image);
        i++;
    });
    cell_selection = []
    i = 0;
    cell2.forEach((cellName) => {
        const image = addImage(cellName, 2);
        cell_selection[i] = new cellClass(cellName, 2, image);
        i++;
    });

    shuffleArray(cell_selection);
    shuffleArray(cell_highlight);
}

function addImage(name, side){
    let img = document.createElement("img");
    img.src = IMG_PATH + name + side + ".png" ;

    // img = imageResize(name, side, img);
    img.classList.add('anim_img1')

    return img;
}




function click(name) {

    control(name === highlightCell.textContent.trim());
}

function getCellElements() {
    const selectSection = document.getElementById('select_section');
    const cellElements = selectSection.querySelectorAll('.cell');
    return Array.from(cellElements);
}

function activateCheatClass(el) {
    el.classList.toggle('cheat');
}

function guessHelper(){
    let cells = getCellElements();
    cells.forEach(el => {
        if (el.textContent === cell_highlight[findHighlightIndex(cell_highlight)].getName()){
            console.log("Guess helper found")
            setTimeout(function() {
                activateCheatClass(el);
            }, 4000)
            activateCheatClass(el);
        }
    });
}

function findHighlightIndex(array) {
    for (let i = 0; i < array.length; i++) {
        if (!array[i].displayed) {
            if (i >= 1) {
                return i - 1;

            } else
                return 0;
        }
        if (i == array.length - 1) {
            return i;
        }
    }
}


function control(result){
    ROUNDS_PLAYED++;
    total_attempts++;
    let index;
    if (result) {
        console.log("Clicked right")
        success_attempts++;
        guessedAnimals++;
        WIN_STREAK = WIN_STREAK + 1;
        index = getValidIndex(cell_highlight);
        showOverlay("Success! That was " + cell_highlight[findHighlightIndex(cell_highlight)].getName() + "!");

        setHighlight(index);
        updateSelectSection();
    } else {
        if (COMPLEXITY_INC && ROUNDS_PLAYED > 3) {
            MAX_ANIMALS = parseInt(localStorage.getItem('MAX_ANIMALS'))
            reset()
            WIN_STREAK = 0;
            showOverlay("Missed, let's try again.");
            return
        }
        WIN_STREAK = 0;
        showOverlay("Missed, let's try again.");
    }
    if (MAX_ROUNDS > 3) {
        winStreakValidator();

    }

    endGameValidator()
}
function winStreakValidator(){
    console.log("Win streak: " + WIN_STREAK)
    if (WIN_STREAK > 0 && (guessedAnimals > 0 && guessedAnimals % MAX_ANIMALS == 0) && COMPLEXITY_INC){
        if (MAX_ANIMALS  == 7) {
            reset()
        } else {
            MAX_ANIMALS++;
            console.log("Increasing max animals. Currently: " + MAX_ANIMALS)
            reset()
        }
    }
}

function endGameValidator(){
    console.log("Rounds played: " + ROUNDS_PLAYED)
    console.log("Max rounds: " + MAX_ROUNDS)
    if(MAX_ANIMALS >= MAX_ROUNDS && ROUNDS_PLAYED == MAX_ROUNDS  && !INFINITY_GAME ){
        console.log("Game is ended")
        hideOverlay();
        contentDivEnd.innerHTML = 'Great Play, Dear!\n' + "Your Score is: " + success_attempts + "/" + total_attempts;
        endGame();
        ROUNDS_PLAYED = 0;
        WIN_STREAK = 0;
    } else if (MAX_ANIMALS < MAX_ROUNDS  && !INFINITY_GAME ) {
        if (guessedAnimals == MAX_ANIMALS) {
            reset()
        }
        if (ROUNDS_PLAYED == MAX_ROUNDS) {
            console.log("Game is ended")
            hideOverlay();
            contentDivEnd.innerHTML = 'Great Play, Dear!\n' + "Your Score is: " + success_attempts + "/" + total_attempts;
            endGame();
            ROUNDS_PLAYED = 0;
            WIN_STREAK = 0;
        }
    } else if (MAX_ANIMALS >= MAX_ROUNDS && ROUNDS_PLAYED == MAX_ROUNDS  && INFINITY_GAME ) {
        console.log("Game is ended")
        reset()
    } else if (MAX_ANIMALS < MAX_ROUNDS  && INFINITY_GAME ) {
        if (guessedAnimals == MAX_ANIMALS) {
            reset()
        }
    }
}

function updateSelectSection() {
    for (let i = 0; i < MAX_ANIMALS; i++) {
        if(cell_selection[i].getName() === selectedCellName) {
            cell_selection[i].selected = true;
        }
        if (cell_selection[i].selected) {
            cell_selection[i].element.style.display = "none";
        } else {
            cell_selection[i].element.style.display = "inline-block";
        }
    }
}

function getValidIndex(array) {
    for (let i = 0; i < array.length; i++) {
        if (!array[i].displayed) {
            return i;
        }
    }
}

function setHighlight(index){
    if (index >= 0 && index < cell_highlight.length) {
        highlightCell.textContent = cell_highlight[index].getName();
        highlightCell.appendChild(cell_highlight[index].getImage());
        cell_highlight[index].setDisplayed(true);
        cell_highlight[index].displayed = true;
    }
}

function setFirstRound(){

    highlightCell.classList.add('cell');
    highlightCell.textContent = cell_highlight[0].getName();
    highlightCell.appendChild(cell_highlight[0].getImage());
    main_section.appendChild(highlightCell);
    cell_highlight[0].setDisplayed(true);


    for(let i = 0; i < MAX_ANIMALS; i++){

        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = cell_selection[i].getName();
        cell.appendChild(cell_selection[i].getImage());
        cell.addEventListener('click', () => {
            click(cell.textContent);
        });
        select_section.appendChild(cell);
        cell_selection[i].selected = false; //selected indicates if the cell has been dragged and dropped
        cell_selection[i].element = cell;
    }
}


function reset() {
    guessedAnimals = 0;
    closeEndGame();
    main_section.innerHTML = '';
    select_section.innerHTML = '';
    console.log("MAX_ANIMALS = " + MAX_ANIMALS)
    console.log("local storage max animals = " + localStorage.getItem('MAX_ANIMALS'))
    shuffleArray(animals);
    cell1 = animals.slice(0, MAX_ANIMALS);
    console.log(cell1)
    cell2 = animals.slice(0, MAX_ANIMALS);
    createCells();
    setFirstRound();
    console.log("cell_highlight")
    for (let i = 0; i < cell_highlight.length; i++) {
        console.log(cell_highlight[i])
    }
}

createEndGameOverlay();
createOverlay();
createCells();
setFirstRound();