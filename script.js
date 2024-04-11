//      GLOBAL 
let animals = ['cat', 'duck', 'frog', 'goat', 'horse', 'pig', 'rabbit', 'turkey', 'dachshund']; //Default array with all the animals
let numberOfAnimals = localStorage.getItem('numberOfAnimals')  ?? 3;

//show result on screen
const overlay = document.getElementById('overlay');
const closeButton = document.createElement('span');
const contentDiv = document.createElement('div');

function createOverlay(){
    closeButton.textContent = '×';
    closeButton.classList.add('close-button');
    overlay.appendChild(closeButton);

    contentDiv.classList.add('message');
    overlay.appendChild(contentDiv);
    closeButton.addEventListener('click', hideOverlay);
}
function showOverlay(text) {
    overlay.style.display = 'block';
    contentDiv.innerHTML = text;
}
function hideOverlay() {
    overlay.style.display = 'none';
}


//      LOCAL
let total_attemps = 0 ;
let success_attemps=0;


let cell_selection =[]; //animals that exists in the select section
let cell_highlight =[]; //animals that exists in the highlight section
shuffleArray(animals);
let cell1 = animals.slice(0, numberOfAnimals); //cell_selection
let cell2 = animals.slice(0, numberOfAnimals); //cell_highlight

let highlightCell = document.createElement('div'); //this variable is used to display the highlight image and as a parent
let rightInnerDiv; //displays the image from the dragged cell
let leftInnerDiv; //displays the highlight
let newDiv; //child of highlightCell and parent of rightInnerDiv and leftInnerDiv
let tempName; //stores the name of the highlightCell

let selectedCellName; //stores the name of selected cell
let select_section = document.getElementById('select_section');
let main_section = document.getElementById('main_section');

leftInnerDiv = document.createElement('div'); // leftInnerDiv contains the image of the highlightCell
leftInnerDiv.classList.add('cell');

leftInnerDiv.addEventListener('dragover', dragOver);
leftInnerDiv.addEventListener('dragenter', dragEnter);
leftInnerDiv.addEventListener('drop', drop);

rightInnerDiv = document.createElement('div'); // rightInnerDiv contains the image of the dragged cell from the select section
rightInnerDiv.classList.add('cell');

rightInnerDiv.addEventListener('dragover', dragOver);
rightInnerDiv.addEventListener('dragenter', dragEnter);
rightInnerDiv.addEventListener('drop', drop);

newDiv = document.createElement('div'); // newDiv contains the leftInnerDiv and the RightInnerDiv

rightInnerDiv.style.margin = "0px" ;
leftInnerDiv.style.margin = "0px" ;
rightInnerDiv.style.marginBottom = "10px" ;
leftInnerDiv.style.marginBottom = "10px" ;

class cellClass{
    constructor(name, side, image){
        this.name = name;
        this.side = side;
        this.displayed = false;
        this.image = image;
    }

    // displayed variable for
    // cell_highlight is used to declare if the cell is displayed at least once
    // cell_selection is used to declare if the cell should be displayed on the screen
    setDisplayed(flag){
        this.displayed = flag;
    }
    getDisplayed(){
        return this.displayed;
    }
    getName(){
        return this.name;
    }
    getSide(){
        return this.side;
    }
    getImage(){
        return this.image;
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * creates an instance of cellClass for each cell and stores it in cell_highlight or cell_selection
 */
function createCells() {

    i = 0;
    cell1.forEach((cellName) => {
        const image = addImage(cellName, 1);
        const instance = new cellClass(cellName, 1, image);
        cell_highlight[i] = instance;
        i++;
    });

    i = 0;
    cell2.forEach((cellName) => {
        const image = addImage(cellName, 2);
        const instance = new cellClass(cellName, 2, image);
        cell_selection[i] = instance;
        i++;
    });

    shuffleArray(cell_selection);
    shuffleArray(cell_highlight);
}

/**
 * @param name of the cell
 * @param side of the cell 1(front) or 2(back).
 * @returns the path of the image
 */
function addImage(name, side){
    let img = document.createElement("img");
    img.src = "../png/" + name + side + ".png" ;

    img = imageResize(name, side, img);
    return img;
}

function imageResize(name,side , img){
    switch(name+side){
        case 'horse1':
            img.style.width = 200 + "px";
            img.style.height = 300 + "px";
            break;
        case 'horse2':
            img.style.width = 200 + "px";
            img.style.height = 200 + "px";
            break;
        case 'pig1':
            img.style.width = 200 + "px";
            img.style.height = 300 + "px";
            break;
        case 'pig2':
            img.style.width = 200 + "px";
            img.style.height = 235 + "px";
            break;
        case 'rabbit1':
            img.style.width = 200 + "px";
            img.style.height = 250 + "px";
            break;
        case 'rabbit2':
            img.style.width = 200 + "px";
            img.style.height = 250 + "px";
            break;
        case 'dachshund1':
            img.style.width = 200 + "px";
            img.style.height = 250 + "px";
            break;
        case 'dachshund2':
            img.style.width = 200 + "px";
            img.style.height = 170 + "px";
            break;
        case 'goat1':
            img.style.width = 200 + "px";
            img.style.height = 300 + "px";
            break;
        case 'goat2':
            img.style.width = 200 + "px";
            img.style.height = 190 + "px";
            break;
        case 'turkey1':
            img.style.width = 200 + "px";
            img.style.height = 300 + "px";
            break;
        case 'turkey2':
            img.style.width = 200 + "px";
            img.style.height = 200 + "px";
            break;

        case 'duck2':
            img.style.height = 195 + "px";
            break;

    }
    return img;
}

/**
 * when the drag starts the selectCellName gets the textContext of the div in the select section
 * @param event
 */
function dragStart(event) {
    const cellDiv = event.target.closest('.cell');
    if (cellDiv) {
        event.dataTransfer.setData('text/plain', cellDiv.textContent.trim());
        selectedCellName = cellDiv.textContent.trim();
    }
}

function dragOver(event) {
    event.preventDefault();
}

added = false;

/**
 * when the dragged cell from select section enters the highlightCell, the highlightCell hides and the newDiv appears
 * @param event
 */
function dragEnter(event) {
    event.preventDefault();

     if (!added) {
        tempName = highlightCell.textContent;
        leftInnerDiv.textContent = tempName;
        leftInnerDiv.appendChild(addImage(tempName, 1));

        rightInnerDiv.textContent = tempName;
        rightInnerDiv.appendChild(addImage(selectedCellName, 2));

        newDiv.appendChild(leftInnerDiv);
        newDiv.appendChild(rightInnerDiv);

        main_section.removeChild(highlightCell);
        main_section.appendChild(newDiv);
        added = true;
     }
}

/**
 * when the dragged cell leaves the highlight section the highlightCell returns and the newDiv is removed
 */
newDiv.addEventListener('dragleave', (event) => {
    if (event.target !== newDiv) return;
        main_section.removeChild(newDiv);
        highlightCell.textContent = tempName;
        highlightCell.appendChild(addImage(tempName, 1));
        highlightCell.addEventListener('drop', drop);
        main_section.appendChild(highlightCell);
        added = false;
});

/**
 * after drop newDiv is removed
 * highlightCell is replaced in the main section
 * calls the control
 * @param event
 */
function drop(event) {
    event.preventDefault();
        main_section.removeChild(newDiv);
        highlightCell.textContent = tempName;
        highlightCell.appendChild(addImage(tempName, 1));
        highlightCell.addEventListener('drop', drop);
        main_section.appendChild(highlightCell);
        added = false;

    const dropTarget = tempName;
    if (!dropTarget) return;

    control(dropTarget === selectedCellName);

}

/**
 * decides if there will be a new highlight cell or the end of the round
 * @param result is the compare of the highlighted and the selected after the drop
 */
function control(result){

    if(result){
        success_attemps++;
        index = getValidIndex(cell_highlight);
        setHighlight(index);
        updateSelectSection();
    }
    else{
        showOverlay("Try again");
    }

    total_attemps++;
    if(total_attemps === numberOfAnimals){
        if(success_attemps === numberOfAnimals){
            showOverlay("Success");
            reset();
        }
        else{
            showOverlay("Failure");
            reset();
        }
    }
}

/**
 * checks to find the cell from select section with same name as the cell which as been dragged and dropped
 * removes it from the display
 * calls removeAt to remove it from the list
 * calls getMaxOfAvailable to see if there are available images to displayed in places of the removed
 */
function updateSelectSection() {
    for (let i = 0; i < numberOfAnimals; i++) {
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

/**
 * this function searches for a cell that is not displayed and return the index
 * @param array
 * @returns {number} i is the valid index
 */
function getValidIndex(array) {
    for (let i = 0; i < array.length; i++) {
      if (!array[i].displayed) {
        return i;
      }
    }
}

/**
 * @param index indicates which cell from cell_highlight array will be displayed on the screen
 * new cell for highlightCell
 */
function setHighlight(index){
    if (index >= 0 && index < cell_highlight.length) {
        highlightCell.textContent = cell_highlight[index].getName();
        highlightCell.appendChild(cell_highlight[index].getImage());
        cell_highlight[index].setDisplayed(true);
        cell_highlight[index].displayed = true;
    }
}

/**
 * used to set the round
 * initializes highlightCell
 * initializes select section
 */
function setFirstRound(){

    highlightCell.classList.add('cell');
    highlightCell.textContent = cell_highlight[0].getName();
    highlightCell.appendChild(cell_highlight[0].getImage());
    main_section.appendChild(highlightCell);
    cell_highlight[0].setDisplayed(true);

    highlightCell.addEventListener('dragenter', dragEnter);

    for(let i = 0; i < numberOfAnimals; i++){

        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = cell_selection[i].getName();
        cell.appendChild(cell_selection[i].getImage());
        cell.addEventListener('dragstart', dragStart);
        select_section.appendChild(cell);
        cell_selection[i].selected = false; //selected indicates if the cell has been dragged and dropped
        cell_selection[i].element = cell;
    }
}

/**
 * reset is used after each round
 */
function reset() {
    total_attemps = 0;
    success_attemps = 0;
    main_section.innerHTML = '';
    select_section.innerHTML = '';
    shuffleArray(animals);
    cell1 = animals.slice(0, numberOfAnimals);
    cell2 = animals.slice(0, numberOfAnimals);

    createCells();
    setFirstRound();
}
createOverlay();
createCells();
setFirstRound();
