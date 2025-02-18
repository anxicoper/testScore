
let namesArr = ['Ben', 'Joel', 'Judy', 'Anne'];
let scoresArr = [88, 98, 77, 88];

function getAvgScore() {
    let i = 0,
        sum = 0,
        len = scoresArr.length;
    let name = '';
    for (i; i < len; i++) {
        sum += scoresArr[i];
    }
    return sum / len;
}

function getHighScore() {
    let i = 0,
        max = 0,
        len = scoresArr.length;
    let name = '';
    for (i; i < len; i++) {
        if (scoresArr[i] > max) {
            max = scoresArr[i];
            name = namesArr[i];
        }
    }
    return name + ' with score of ' + max;
}

function initializeResults() {
    let results = $('#results');
    let high = getHighScore();
    let avg = getAvgScore().toFixed(1);
    $('#highScore').html(high);
    $('#avgScore').html(avg);
}


function displayScores() {
    for (let i = 0; i < namesArr.length; i++) {
        // Assuming namesArr and scoresArr are arrays containing names and scores.
        $('#scores_table').append('<tr><td>' + namesArr[i] + '</td><td>' + scoresArr[i] + '</td></tr>');
    }
}


function displayResults() {
    let results = $('#results');
    results.toggle();
}

function insertTableElement(scoresTable, index) {
    scoresTable.append('<tr><td>' + namesArr[index] + '</td><td>' + scoresArr[index] + '</td></tr>');
}




function initializeScoresTable() {
    $('#scores_table tr').slice(1).remove(); 
    for (let i = 0; i < scoresArr.length; i++) {
        insertNewTableElement(namesArr[i], scoresArr[i]); // Adds the data rows
    }
}



function addScore() {
    let score = $('#score');
    let name = $('#name');
    if (score.val() === '' || name.val() === '') {
        alert('Name and score must have values');
        return;
    }
    scoresArr.push(parseInt(score.val()));
    namesArr.push($("#name").val());
    initializeScoresTable();
    score.val('');
    name.val('');
    initializeResults();
    $('#scores').show();
    $('#results').show();
}

window.onload = function () {
    $(document).ready(function() {
        
        jQuery.extend(jQuery.expr[':'], {
            focusable: function(el, index, selector) {
                return $(el).is('a, button, :input, [tabindex]');
            }
        });
    
        
        $(document).on('keypress', 'input,select', function(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                let $canfocus = $(':focusable');
                let index = $canfocus.index(this) + 1;
                if (index >= $canfocus.length) index = 0;
                $canfocus.eq(index).focus(); // Moves focus to the next element
            }
        });
            
        $('#name').focus();
    });
    
    $('#display_results').on('click',  function() {
        displayResults();
    });

    $('#display_scores').on('click',  function() {
        displayScores();
    });
    $('#add').on('click',  function() {
        addScore();
    });

    let name = $('#name');
    let score = $('#score');

    name.focus();
    initializeResults();
    initializeScoresTable();
}