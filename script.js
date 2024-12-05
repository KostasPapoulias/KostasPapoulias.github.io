let results = [1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0,2,
     0,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,2,
     1,1,0,0,0,1,0,1,1,1,0,1,1,0,0,1,0,1,0,0,2,
     0,1,1,1,1,1,0,1,0,1,1,0,0,0,1,1,0,0,1,0,1,1,1,0,2,
     1,0,1,0,1,1,0,1,0,0,0,1,0,2,
     1,1,1,0,1,1,0,0,1,0,0,0,0,0,1,0,1,0,0,2,
     0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,0,0,0,1,1,0,2,
     0,1,1,0,1,0,0,1,1,1,0,1,0,1,1,1,0,1,1,0,2,
     0,0,0,0,1,0,0,1,0,1,0,0,0,0,2,
     0,1,1,1,0,1,1,0,0,1,0,1,0,0,0,0,0,3];
let results1 = [1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0,2,
    0,0,1,1,1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,2,
    1,1,0,0,0,1,0,1,1,1,0,1,1,0,0,1,0,1,0,0,2,
    0,1,1,1,1,1,0,1,0,1,1,0,0,0,1,1,0,0,1,0,1,1,1,0,2,
    1,0,1,0,1,1,0,1,0,0,0,1,0,2,
    1,1,1,0,1,1,0,0,1,0,0,0,0,0,1,0,1,0,0,2,
    0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,0,0,0,1,1,0,2,
    0,1,1,0,1,0,0,1,1,1,0,1,0,1,1,1,0,1,1,0,2,
    0,0,0,0,1,0,0,1,0,1,0,0,0,0,2,
    0,1,1,1,0,1,1,0,0,1,0,1,0,0,0,0,0,3];

// let budget = 22.7;
// let temp_budget = budget;
// let performance = 1.80;

document.getElementById('clear').addEventListener('click', function() {
    document.getElementById('results-table').innerHTML = '';
});
document.getElementById('bettingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let budget = parseFloat(document.getElementById('budget').value);
    let bet = parseFloat(document.getElementById('bet').value);
    let performance = parseFloat(document.getElementById('performance').value);
    let factor = parseFloat(document.getElementById('factor').value);
    let step = parseFloat(document.getElementById('step').value);
    let option = document.getElementById('option').value;

    // Call your existing functions with the input values
    calculateBets(budget, bet, performance);
    console.log(step)
    if(option == "lose_win"){
        for(let i = 0.1; i < 1; i+= 0.1){
            loss_win(i, budget, performance, factor, step); 
        }
    }

    // Display the selected option
    document.getElementById('results').innerHTML = `<p>Selected Option: ${option}</p>`;
});


function appendRow(rowName, value) {
    let rowHTML = `<tr><td>${rowName}</td><td>${value}</td></tr>`;
}

function calculateBets(budget, bet, performance) { 
    for (let bet = 0.1; bet <= 1.0; bet += 0.1) {
        let temp_budget = budget;
        let times = 0;

        while (temp_budget >= bet) {
            temp_budget -= bet;
            times++;
        }

        appendRow(bet.toFixed(1), times);
    }
}

function startCalculations() {
    let budget = parseFloat(document.getElementById('budget').value);
    let bet = parseFloat(document.getElementById('bet').value);
    let performance = parseFloat(document.getElementById('performance').value);



    // Calculate bets and update the table
    calculateBets(budget, bet, performance);
}

// calculate_unders(0.1, "left");
// calculate_unders(0.2, "right");
// calculate_overs(0.1, "left");
// calculate_overs(0.2, "right");

// let toDiv = '<table border="1">';


function loss_win(bet, budget, performance ,factor, step) {
    let toDiv = '<table border="1">';
    T = budget;
    P = bet;
    LOSS = P;
    WIN = P * performance;
    GAIN = WIN - LOSS;
    let i = factor;
    let repeatTime = 1;

    let j = 0, tempJ = 0;

    while (budget > LOSS) {
        P = Math.round(P * 100) / 100;
        P = P * i;
        LOSS = LOSS + P;
        i += step;
        if(budget > LOSS)
            tempJ++;
    }
    j = tempJ;
    P = bet;
    LOSS = P;
    // Initialize the table with headers
    toDiv += '<tr><th></th>';
    toDiv += `<th>${repeatTime}</th>`;
    while (j) {
        repeatTime++;
        toDiv += `<th>${repeatTime}</th>`;
        j--;
    }
    toDiv += '</tr>';

    // Reset variables for table rows
    i = factor;
    repeatTime = 1;
    P = bet;
    LOSS = P;
    WIN = P * performance;
    GAIN = WIN - LOSS;
    j = tempJ;

    // Add Bet row
    toDiv += '<tr><td style="font-weight: bold;">Bet</td>';
    toDiv += `<td>${P.toFixed(3)}</td>`;
    while (j) {
        P = Math.round(P * 100) / 100;
        P = P * i;
        toDiv += `<td>${P.toFixed(3)}</td>`;
        i += step;
        j--;
    }
    toDiv += '</tr>';

    // Reset variables for next row
    i = factor;
    P = bet;
    LOSS = P;
    j = tempJ;

    // Add Loss row
    toDiv += '<tr style="color: red;"><td style="font-weight: bold;">Loss</td>';
    toDiv += `<td>${LOSS.toFixed(3)}</td>`;
    while (j) {
        P = Math.round(P * 100) / 100;
        P = P * i;
        LOSS = LOSS + P;
        toDiv += `<td>${LOSS.toFixed(3)}</td>`;
        i += step;
        j--;
    }
    toDiv += '</tr>';

    // Reset variables for next row
    i = factor;
    P = bet;
    WIN = P * performance;
    j = tempJ;

    // Add Win row
    toDiv += '<tr style="color: blue;"><td style="font-weight: bold;">Win</td>';
    toDiv += `<td>${WIN.toFixed(3)}</td>`;
    while (j) {
        P = Math.round(P * 100) / 100;
        P = P * i;
        WIN = P * performance;
        toDiv += `<td>${WIN.toFixed(3)}</td>`;
        i += step;
        j--;
    }
    toDiv += '</tr>';

    // Reset variables for next row
    i = factor;
    P = bet;
    LOSS = P;
    WIN = P * performance;
    GAIN = WIN - LOSS;
    j = tempJ;

    // Add Gain row
    toDiv += '<tr style="color: green;"><td style="font-weight: bold;">Gain</td>';
    toDiv += `<td>${GAIN.toFixed(3)}</td>`;
    while (j) {
        P = Math.round(P * 100) / 100;
        P = P * i;
        LOSS = LOSS + P;
        WIN = P * performance;
        GAIN = WIN - LOSS;
        toDiv += `<td>${GAIN.toFixed(3)}</td>`;
        i += step;
        j--;
    }
    toDiv += '</tr>';

    toDiv += '</table>';

    document.getElementById('results-table').innerHTML += toDiv;
}


function calculate_unders(first_bet, div_id){
    let toDiv = '';
    temp_budget = budget;
    factor = 2.2;
    bet = first_bet;
    i = 0;
    row = 1;
    gain = 0;
    while(results[i] < 3 && temp_budget >= bet){
        temp_budget = temp_budget - bet;

        if(results[i] == 0) {
           
            temp_budget = temp_budget + bet * performance;
            factor = 2.2;
            bet = first_bet;
        }
        else{

            bet = bet * factor;
            factor = factor + 0.1;
            
        }
        i++;
        if(results[i] == 2){
            // T = T.toFixed(4);
            toDiv += "<div>Σειρα: " + row + " Αποτελεσμα ωρας: " + temp_budget.toFixed(4) +"<br/> Κερδος: " + (temp_budget - gain).toFixed(4) + "</div>\n";
            console.log("\nΣειρα: " + row + " Αποτελεσμα ωρας: " + temp_budget + " \nΚερδος: " + (temp_budget - gain));
            row++;
            gain = temp_budget;

        }
    }
    toDiv += "\nΤελικο αποτελεσμα: " + temp_budget.toFixed(4) +"\n"+ "<br/>Κερδος: " + (temp_budget - temp_budget).toFixed(4) + "</div>\n";
    console.log("\n Τελικο αποτελεσμα: " + temp_budget);

    if(div_id == "left"){
        document.getElementById('left').innerHTML = toDiv;

    }
    else{
        document.getElementById('right').innerHTML = toDiv;
    }   
}

function calculate_overs(first_bet, div_id){
    let toDiv = '';
    temp_budget = budget;
    factor = 2.2;
    bet = first_bet;
    i = 0;
    row = 1;
    gain = 0;
    while(results1[i] < 3 && temp_budget >= bet){
        temp_budget = temp_budget - bet;

        if(results[i] == 1) {
           
            temp_budget = temp_budget + bet * performance;

            factor = 2.2;
            bet = first_bet;
        }
        else if(results[i] == 0){

            bet = bet * factor;
            factor = factor + 0.1;
            
        }
        i++;
        if(results1[i] == 2){
            // T = T.toFixed(4);
            toDiv += "<div>Σειρα: " + row + " Αποτελεσμα ωρας: " + temp_budget.toFixed(4) +"<br/> Κερδος: " + (temp_budget - gain).toFixed(4) + "</div>\n";
            console.log("\nΣειρα: " + row + " Αποτελεσμα ωρας: " + temp_budget + " \nΚερδος: " + (temp_budget - gain));
            row++;
            gain = temp_budget;

        }
    }
    toDiv += "\nΤελικο αποτελεσμα: " + temp_budget.toFixed(4) +"\n"+ "<br/>Κερδος: " + (temp_budget - temp_budget).toFixed(4) + "</div>\n";
    console.log("\n Τελικο αποτελεσμα: " + temp_budget);

    if(div_id == "left"){
        document.getElementById('left').innerHTML = toDiv;

    }
    else{
        document.getElementById('right').innerHTML = toDiv;
    }  
}

function getResults() {
    let i = 0;
    let loss = 0;
    let factor = 2.2;
    let bet = 0.1;
    let win_rate = 1.8;
    while (i < results.length) {

        loss = loss + bet;


        if(results[i] == 0){

            budget = (budget - loss) + bet * win_rate;
            factor = 2.2;
            bet = 0.1;
        }
        if (results[i] === 1) {
            
            loss = loss - bet;
            budget -= loss;
            factor += 0.1;
        }
        

        i++;
    }
    return results;
}