function loadVerbs() {
    return fetch('./testverbs.csv')
        .then(response => response.text())
        .then(data => {
            return data.split('\n').map(verb => verb.trim()).filter(verb => verb.length > 0);
        })
        .catch(error => {
            console.error('Error loading the CSV file:', error);
            return [];
        });
}
let verbs = [];

loadVerbs().then(loadedVerbs => {
    verbs = loadedVerbs;
});

let language = 'fr';

let time_forms = ['présent', 'imparfait', 'passé-composé'] //['présent', 'passé composé', 'imparfait', 'futur simple', 'durativ', 'impératif', 'passé récent'];
let people = ['Je', 'Tu', 'Il', 'Nous', 'Vous', 'Ils']; //I know it's not very gender-inclusive, but it's just for testing purposes
let button = document.getElementById('changeSentenceButton');
let check_button = document.getElementById('checkSolutionButton');
let sentence_paragraph = document.getElementById('sentence');
let solution_input = document.getElementById('solution');
let success_message = document.getElementById('successMessage');

var solution = 'test';

button.addEventListener('click', () => {
    let time_form = time_forms[Math.floor(Math.random() * 3)]; // 0-2
    let person = Math.floor(Math.random() * 6); // 0-5
    let human_readable_person = people[person];
    let verb = verbs[Math.floor(Math.random() * verbs.length)]; // Random word from the list
    let sentence = `Person: ${human_readable_person}, Time: ${time_form}, Verb: ${verb}`; 

    sentence_paragraph.textContent = sentence;

    getConjugatedVerb(verb, time_form, person).then(conjugated_verb => {
        solution = `${conjugated_verb}.`;
    }
);
});
async function getConjugatedVerb(verb, time_form, person) {
    //sentence_paragraph.textContent = 'Debug: entered function';
    //sentence_paragraph
    console.log(language);
    console.log(verb);
    let response = await fetch(`https://api.cors.lol/?url=http://verbe.cc/verbecc/conjugate/${language}/${verb}`);
    let data = await response.json();
    console.log(data);
    let conjugated_verb = data.value.moods.indicatif[time_form][person];
    return conjugated_verb;
}

check_button.addEventListener('click', () => {
    let user_solution = solution_input.value;
    if (solution === user_solution) {
        success_message.textContent = 'Correct!';
    } else {
        success_message.textContent = 'Incorrect!, solution is: ' + solution;
    }
});
