document.addEventListener("DOMContentLoaded", () => {
    let button1 = document.getElementById('button1');
    let select1 = document.getElementById('selectGame1');
    button1.addEventListener('click', () => {
        localStorage.setItem( 'MAX_ANIMALS', "4");
        localStorage.setItem( 'MAX_ANIMALS', select1.value);
        startGame();
    });

    let button2 = document.getElementById('button2');
    button2.addEventListener('click', () => {
        //TODO: game2
    });

    let button3 = document.getElementById('button3');
    button3.addEventListener('click', () => {
        //TODO: game3
    });

    function startGame() {
        overrideMenu();
        loadGameScript();
    }

    function overrideMenu() {
        document.querySelector('.menu').innerHTML = `
            <div class="contain">
                <div class="main_section" id="main_section"></div>
                <div class="select_section" id="select_section"></div>
                <div class="overlay" id="overlay"></div>
            </div>
            <div class="background-image">
                <img src="pictures/bgFullHD.png" alt="">
            </div>
            <script src="Animals/script.js"></script>
            <link rel="stylesheet" href="Animals/style.css">

            `;
    }

    function loadGameScript() {
        let scriptElement = document.createElement('script');
        scriptElement.src = "../Animals/script.js";
        document.body.appendChild(scriptElement);
    }
});
