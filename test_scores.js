let namesArr = ['Ben', 'Joel', 'Judy', 'Anne'];
let scoresArr = [88, 98, 77, 88];

function getAvgScore() {
    let sum = scoresArr.reduce((acc, score) => acc + score, 0);
    return (sum / scoresArr.length).toFixed(1);
}

function getHighScore() {
    let maxIndex = scoresArr.indexOf(Math.max(...scoresArr));
    return `${namesArr[maxIndex]} with a score of ${scoresArr[maxIndex]}`;
}

function initializeResults() {
    $('#highScore').html(getHighScore());
    $('#avgScore').html(getAvgScore());
}

function insertTableElement(name, score) {
    $('#scores_table').append(`<tr><td>${name}</td><td>${score}</td></tr>`);
}

function initializeScoresTable() {
    $('#scores_table tr').slice(1).remove();
    for (let i = 0; i < scoresArr.length; i++) {
        insertTableElement(namesArr[i], scoresArr[i]);
    }
}

function displayResults() {
    $('#results').toggle();
}

function displayScores() {
    initializeScoresTable();
    $('#scores').show();
}

function addScore() {
    let name = $('#name').val().trim();
    let score = parseInt($('#score').val(), 10);

    if (!name || isNaN(score) || score < 0 || score > 100) {
        alert('You must enter a name and a valid score (0-100).');
        return;
    }

    namesArr.push(name);
    scoresArr.push(score);

    initializeScoresTable();
    initializeResults();

    $('#name').val('').focus();
    $('#score').val('');
    $('#scores, #results').show();
}

window.onload = function () {
    $(document).ready(function () {
        $('#name').focus();

        $(document).on('keypress', 'input,select', function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                let focusable = $(':focusable');
                let index = focusable.index(this) + 1;
                if (index >= focusable.length) index = 0;
                focusable.eq(index).focus();
            }
        });

        $('#display_results').on('click', displayResults);
        $('#display_scores').on('click', displayScores);
        $('#add').on('click', addScore);

        initializeResults();
        initializeScoresTable();
    });
};
