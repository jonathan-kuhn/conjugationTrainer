function loadVerbsFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const verbs = data
        .split("\n")
        .map((verb) => verb.trim())
        .filter((verb) => verb.length > 0);
      resolve(verbs);
    };
    reader.onerror = (error) => {
      console.error("Error reading the file:", error);
      reject([]);
    };
    reader.readAsText(file);
  });
}

let verbs = [];

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  //fileInput.click();  //does not work, as some browsers block the click event

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      loadVerbsFromFile(file).then((loadedVerbs) => {
        verbs = loadedVerbs;
      });
    }
  });
});

let language = "fr";

let time_forms = [
  "présent",
  "imparfait",
  "passé-composé",
  "imperatif-présent",
  "futur-simple",
]; //currently usable time forms, understood by verbecc, possible other forms: ['présent', 'passé composé', 'imparfait', 'futur simple', 'durativ', 'impératif', 'passé récent'];
let readable_time_forms = [
  "Present",
  "Imperfect",
  "Past (PC)",
  "Imperative",
  "Future",
];
let people = ["Je", "Tu", "Il", "Nous", "Vous", "Ils"]; //I know it's not very gender-inclusive, but but neither is the french language
let imperativ_people = ["Tu", "Nous", "Vous"];

let button = document.getElementById("changeSentenceButton");
let check_button = document.getElementById("checkSolutionButton");
let sentence_paragraph = document.getElementById("sentence");
let solution_input = document.getElementById("solution");
let success_message = document.getElementById("successMessage");
let streak_message = document.getElementById("streak");

var solution = "Please create a sentence first";

var streak = 0;

var new_sentence_created = false;

button.addEventListener("click", () => {
  if (new_sentence_created) {
    button.textContent = "Correct the current sentence first";
    return;
  }
  solution_input.value = "";
  console.log("Creating a new sentence");

  let time_form_number = Math.floor(Math.random() * 5); // 0-4
  let time_form = time_forms[time_form_number];
  let readable_time_form = readable_time_forms[time_form_number];
  console.log("time form is: " + time_form);
  console.log("time form is also: " + readable_time_form);

  let person = Math.floor(Math.random() * 6); // 0-5
  let human_readable_person = people[person];

  let verb = verbs[Math.floor(Math.random() * verbs.length)]; // Random word from the list

  console.log(`Is reflexive: ${isReflexive}, Verb: ${verb}`);

  if (time_form === "imperatif-présent") {
    // Imperative has only 3 persons, so we need to adjust the person and human_readable_person
    person = Math.floor(Math.random() * 3);
    human_readable_person = imperativ_people[person];
  }

  let sentence = `Person: ${human_readable_person}, Time/Form: ${readable_time_form}, Verb: ${verb}, Reflexive: ${isReflexive}`;

  sentence_paragraph.textContent = sentence;

  getConjugatedVerb(verb, time_form, person).then((conjugated_verb) => {
    let sentence_end = ".";
    if (time_form === "imperatif-présent") {
      sentence_end = "!";
    }
    solution = `${
      conjugated_verb.charAt(0).toUpperCase() + conjugated_verb.slice(1)
    }${sentence_end}`;
  });
  new_sentence_created = true;
  check_button.textContent = "Check solution";
});

async function getConjugatedVerb(verb, time_form, person) {
  // this function gets the conjugated verb from the API
  console.log(person);
  console.log(time_form);
  console.log(verb);
  console.log(language);
  let response = await fetch(
    `https://proxy.jonathan-simon-kuhn.workers.dev/?url=http://verbe.cc/verbecc/conjugate/${language}/${verb}`
  ); //https://api.cors.lol/?url=
  console.log(response);
  let data = await response.json();
  console.log(data);
  let form;
  if (time_form === "imperatif-présent") {
    // correct the form for the API, no idea what the thing is called (überbegriff of indicatif and imperative)
    form = "imperatif";
  } else {
    form = "indicatif";
  }
  console.log(form);
  let conjugated_verb = data.value.moods[form][time_form][person];
  return conjugated_verb;
}

check_button.addEventListener("click", () => {
  // this function checks the solution
  if (!new_sentence_created) {
    check_button.textContent = "Create a sentence first";
    return;
  }
  let user_solution = solution_input.value;
  if (solution === user_solution) {
    success_message.textContent = "Correct!";
    streak++;
  } else {
    success_message.textContent = "Incorrect!, solution is: " + solution;
    streak = 0;
  }
  streak_message.textContent = `Streak: ${streak}`;
  new_sentence_created = false;
  button.textContent = "New exercise";
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (new_sentence_created) {
      check_button.click();
    } else {
      button.click();
    }
  }
});
