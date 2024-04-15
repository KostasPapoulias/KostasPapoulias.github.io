document.addEventListener("DOMContentLoaded", () => {
    parseSettings();

    document.querySelector('.settings-group.horizontal').addEventListener('change', function(event) {
        if (event.target.matches('input[type="checkbox"]')) {
            const switchId = event.target.id;
            const switchValue = event.target.checked;
            if (switchId === 'switch1' || switchId === 'switch2') {
                localStorage.setItem(switchId.toUpperCase(), switchValue);
                const slider = event.target.parentNode.querySelector('.slider');
                slider.classList.toggle('checked', switchValue);
            }
        }
    });

    let radioButtons = document.querySelectorAll('.settings-group input[type="radio"]');

    radioButtons.forEach(radioButton => {
        radioButton.addEventListener('change', () => {
            if (radioButton.checked) {
                const maxAnimals = document.querySelector('input[name="radio1"]:checked').value;
                const max_rounds = document.querySelector('input[name="radio2"]:checked').value;
                localStorage.setItem('MAX_ANIMALS', maxAnimals);
                localStorage.setItem('MAX_ROUNDS', max_rounds);
            }
        });
    });



    // Обработчик нажатия кнопок старта игры
    document.querySelectorAll('img').forEach(button => {
        button.addEventListener('click', () => {
            const gameId = button.id;
            startGame(gameId);
        });
    });

// Функция запуска игры
    function startGame(gameId) {
        overrideMenu();
        const gamePath = gameId === 'button3' ? "../SoundClick/game.js" :
            gameId === 'button2' ? "../Animals/script.js" :
                // gameId === 'button2' ? "../js/script_game2.js" :
                gameId === 'button1' ? "../Clicks/game.js" :
                    null; // Обработка неизвестного ID кнопки
        if (gamePath) {
            loadGameScript(gamePath);
        } else {
            console.error("Неизвестный ID кнопки:", gameId);
        }
    }



    function overrideMenu() {
        document.querySelector('.menu').innerHTML = `
            <div id="icons">
                <img src="../pictures/icons/home.png" name="home" onclick="location.reload();">
                <img src="../pictures/icons/tip.png" name="tip" onclick="guessHelper()">
                <img src="../pictures/icons/warn.png" name="warn" onclick="showInfo()">
            </div>
            <div class="contain">
                <div class="main_section" id="main_section"></div>
                <div class="select_section" id="select_section"></div>
                <div class="overlay" id="overlay"></div>
                <div class="overlay" id="overlayEnd"></div>
            </div>
                <style>
                    body{
                        background-image: url('../background/bgFullHD.png');
                    }
                </style>
            </div>`;
    }

    function loadGameScript(path) {
        let scriptElement = document.createElement('script');
        scriptElement.src = path;
        document.body.appendChild(scriptElement);
    }

    function restoreRadioState() {
        setTimeout(() => {
            const maxAnimals = localStorage.getItem('MAX_ANIMALS');
            const maxRounds = localStorage.getItem('MAX_ROUNDS');
            if (maxAnimals && maxRounds) {
                try {
                    const radio1 = document.querySelector(`input[name="radio1"][value="${maxAnimals}"]`);
                    const radio2 = document.querySelector(`input[name="radio2"][value="${maxRounds}"]`);
                    if (radio1) radio1.checked = true;
                    if (radio2) radio2.checked = true;
                } catch (error) {
                    console.error('Error restoring radio state:', error);
                }
            }
        }, 100); // Adjust delay time as needed
    }




    // Вызов функции восстановления состояния радиокнопок при загрузке страницы
    restoreRadioState();

});

document.addEventListener("change", function(event) {
    if (event.target.matches("input[type='checkbox']")) {
        if (event.target.id === "switch1") {
            saveCheckboxState("switch1", "COMPLEXITY_INC");
        } else if (event.target.id === "switch2") {
            saveCheckboxState("switch2", "INFINITY_GAME");
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    setCheckboxStateFromLocalStorage("switch1", "COMPLEXITY_INC");
    setCheckboxStateFromLocalStorage("switch2", "INFINITY_GAME");

    setSliderStateFromLocalStorage("slider1", "COMPLEXITY_INC");
    setSliderStateFromLocalStorage("slider2", "INFINITY_GAME");
});



function parseSettings(){
    let max_animals = Number(JSON.parse(localStorage.getItem('MAX_ANIMALS'))) ? localStorage.getItem('MAX_ANIMALS') : 3;
    let max_rounds = Number(JSON.parse(localStorage.getItem('MAX_ROUNDS'))) ? localStorage.getItem('MAX_ROUNDS') : 2;
    let infinity_game = Boolean(JSON.parse(localStorage.getItem('INFINITY_GAME'))) ? localStorage.getItem('INFINITY_GAME') : false;
    let complexity_game = Boolean(JSON.parse(localStorage.getItem('COMPLEXITY_INC'))) ? localStorage.getItem('COMPLEXITY_INC') : false;

    localStorage.setItem('MAX_ANIMALS',max_animals);
    localStorage.setItem('MAX_ROUNDS',max_rounds);
    localStorage.setItem('INFINITY_GAME',infinity_game);
    localStorage.setItem('COMPLEXITY_INC',complexity_game);

}

function saveCheckboxState(checkboxId, localStorageKey) {
    const checkbox = document.getElementById(checkboxId);
    if (checkbox) {
        localStorage.setItem(localStorageKey, checkbox.checked);
    }
}

function setCheckboxStateFromLocalStorage(checkboxId, localStorageKey) {
    const checkbox = document.getElementById(checkboxId);
    if (checkbox) {
        const value = localStorage.getItem(localStorageKey);
        if (value !== null) {
            checkbox.checked = JSON.parse(value);
        }
    }
}

function setSliderStateFromLocalStorage(sliderId, localStorageKey) {
    const slider = document.getElementById(sliderId);
    if (slider) {
        const value = localStorage.getItem(localStorageKey);
        if (value !== null) {
            if (JSON.parse(value)) {
                slider.classList.add('checked');
            } else {
                slider.classList.remove('checked');
            }
        }
    }
}
