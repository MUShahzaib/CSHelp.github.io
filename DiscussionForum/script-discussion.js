import {getData,saveUpdatedData} from "../contentManager.js";
import { addLikeShareEvents } from "../LikeShareView/script-likeViewsShare.js";
    
localStorage.setItem("FileWritePath","http://localhost:5500/write/data/discussion.json");
 
// Load questions from a JSON file (replace with actual data retrieval logic)
let questions = [];
const addQuestionBtn = document.getElementById('addQuestionBtn');
const closeViewModal = document.getElementById('closeViewModal');
const closeQuestionModal = document.getElementById('closeModal');
const questionForm = document.getElementById('questionForm');
const searchInput = document.getElementById('searchInput');
const filterByType = document.getElementById('filterByType');

// Add the drop down options
addDropDownOptions();
// Initial display of questions
loadQuestions();

// Function to load questions from the JSON file
async function loadQuestions() {
   // const prevQuestions=questions;
    questions=await getData('http://localhost:5500/data/discussion.json');
    if(questions){
      //  questions= prevQuestions.concat(questions);
        displayQuestions(questions);
    }
}

// Function to display questions in the questionsContainer
function displayQuestions(questionsToDisplay) {
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';

    console.log(questions.length);
    questionsToDisplay.forEach(question => {
        const questionCard = document.createElement('div');
        questionCard.classList.add('question-card');
        questionCard.innerHTML = `<h3>${question.subject}</h3>       
        <label> Views: <b> ${question.views} </b></label>
        <label> Answers: <b> ${question.answers.length} </b></label>
        <p>${question.text.substring(0, 50)}...</p>`;
        questionCard.addEventListener('click', () => openQuestionModal(question));
        // questionCard.addEventListener('click', () => openQuestionInNewTab(question));
        questionsContainer.appendChild(questionCard);
    });
}

///// this method adds multiple same drop down option////
function addDropDownOptions(){
    // Get the reference to the dropdown template
    const dropdownTemplate = document.getElementById('dropdownTemplate');
    // Get all the divs where you want to insert the dropdown
    const dropdownContainers = document.querySelectorAll('.questionTypes');

    // Clone the dropdown template and insert it into each container
    dropdownContainers.forEach(container => {
        const clonedDropdown = dropdownTemplate.content.cloneNode(true);
        container.appendChild(clonedDropdown);
    });

}

// Function to open the view question modal
function openQuestionModal(question) {
    const viewQuestionModal = document.getElementById('viewQuestionModal');
    const viewQuestionSubject = document.getElementById('viewQuestionSubject');
    const viewQuestionText = document.getElementById('viewQuestionText');
    const answersContainer = document.getElementById('answersContainer');
    viewQuestionSubject.textContent = question.subject;
    viewQuestionText.textContent = question.text;

    // Clear answers container
    answersContainer.innerHTML = '';
    // Display answers
    if (question.answers && question.answers.length > 0) {
        question.answers.slice().reverse().forEach(answer => {
            const answerCardTemplate= document.getElementById("answer-card");
            const answerCard = answerCardTemplate.cloneNode(true);
            answerCard.querySelector('.answerText').textContent=answer;
            answerCard.style.display='block';
            answersContainer.appendChild(answerCard);
        });
        addLikeShareEvents();
    }

    saveNewAnswer(question.id);
    // Show the view question modal
    viewQuestionModal.style.display = 'block';
}

function addNewCard(elemetId, cardName,textToShow){
    const elementContainer = document.getElementById(elemetId);
    const elementCard = document.createElement('div');   
    elementCard.classList.add(cardName);
    elementCard.textContent = textToShow;
    elementContainer.appendChild(elementCard);
}

// Function to open the add answer modal
function saveNewAnswer(questionId) {
    // const addAnswerModal = document.getElementById('addAnswerModal');
    const answerForm = document.getElementById('answerForm');
    const answerTextArea = document.getElementById('answerTextArea');

    // Add event listener to the answer form submission
    answerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const answerText = answerTextArea.value;

        if (answerText) {
            // Find the question in the data array
            const questionToUpdate = questions.find(question => question.id === questionId);

            if (questionToUpdate) {
                // Modify the answers for the specific question
                // Check if the question already has answers; if not, initialize an array
                questionToUpdate.answers = questionToUpdate.answers || [];

                // Add the new answer to the answers array
                questionToUpdate.answers.push(answerText);
            }

            // Save the entire data (including your updates) back to the JSON file
              saveUpdatedData(questions);

            // Update the answers in the view modal
            // const answersContainer = document.getElementById('answersContainer');
            // const answerCard = document.createElement('div');
            
            // answerCard.classList.add('answer-card');
            // answerCard.textContent = answerText;
            // answersContainer.appendChild(answerCard);
        }
    });
}

// Event listener for the "Add Question" button
addQuestionBtn.addEventListener('click', () => {
    const addQuestionModal = document.getElementById('addQuestionModal');
    addQuestionModal.style.display = 'block';
});


// Event listener for the close button in the view question modal
closeViewModal.addEventListener('click', () => {
    const viewQuestionModal = document.getElementById('viewQuestionModal');
    viewQuestionModal.style.display = 'none';
});

// Event listener for the close button in the add question modal
closeQuestionModal.addEventListener('click', () => {
    const addQuestionModal = document.getElementById('addQuestionModal');
    addQuestionModal.style.display = 'none';
});

// Event listener for the question form submission
questionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const questionSubject = document.getElementById('questionSubject').value;
    const questionText = document.getElementById('questionText').value;
    const questionType=document.getElementById('questionTypes').value;

    const newQuestion = {
        id: questions[questions.length - 1].id + 1,
        subject: questionSubject,
        type: questionType,
        text: questionText,
        views:0,
        answers: []
    };

    // Concatenate the new question with the existing questions
    questions.push(newQuestion);
    saveUpdatedData(questions);
    loadQuestions();
    // Update the questions in the view modal
    //addNewCard('questionsContainer','question-card',questionText);
    // Clear the form
    questionForm.reset();
});


// Event listener for the search input
searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    const filteredQuestions = questions.filter(question =>
        question.subject.toLowerCase().includes(searchText) ||
        question.text.toLowerCase().includes(searchText)
    );
    displayQuestions(filteredQuestions);
});

// Function to filter questions by type
filterByType.addEventListener('change', () => {
    const typeFilter = document.getElementById('filterByType').value;
    console.log(typeFilter);
    if (typeFilter && typeFilter!="All") {
        const filteredQuestionsByType = questions.filter(question => question.type === typeFilter);
        displayQuestions(filteredQuestionsByType);
    } else {
        displayQuestions(questions);
    }
});



