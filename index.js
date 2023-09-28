//This function is used to add new tasks into the card
function addTask(noteId) {
    console.log("add task called....");
    const input = document.querySelector(`#new-task-input-note${noteId}`);
    const taskText = input.value;

    if (!taskText) {
        alert('Please fill the task.');
        return;
    }

    const taskList = document.querySelector(`#taskList-note${noteId}`);
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <span>
            <img class="check-regular" onclick="toggleTaskStatus(this)" src="./square-check-regular.svg" />
            ${taskText}
        </span>
        <button id="edit" onclick="editTask(this)">Edit</button>
        <button id="delete" onclick="deleteTask(${noteId}, this)">Delete</button>`;

    taskList.appendChild(taskItem);

    adjustCardHeight(noteId);

    input.value = '';
}
//Function used to calc the ht of the card and increasing it as user adds tasks
function adjustCardHeight(noteId) {
    const taskList = document.querySelector(`#taskList-note${noteId}`);
    const card = document.querySelector(`#note-card${noteId}`);

    // Let us take minimum ht of the card as 200px
    const minHeight = 200; 
    // Here iam calculating new height based on the number of tasks
    const newHeight = minHeight + taskList.clientHeight;

    card.style.height = `${newHeight}px`;
}
//As soon as user clicks on checkbox, the following actions takes place....
function toggleTaskStatus(checkImg) {
    console.log("toggle status called....");
    const taskText = checkImg.closest('li').querySelector('span');
    const editBtn = checkImg.closest('li').querySelector('#edit');
    //unchecked turns into checked, line passes through text ensuring your task is completed and disabling edit button
    if (checkImg.src.includes('square-check-regular')) {
        checkImg.src = './square-check-solid.svg';
        taskText.style.textDecoration = 'line-through'; 
        editBtn.style.display = 'none'; 
    } 
    //checked turns into unchecked, removes line passing through text ensuring your task is still pending and enables edit button
    else {
        checkImg.src = './square-check-regular.svg';
        taskText.style.textDecoration = 'none';  
        editBtn.style.display = 'inline'; 
    }
}
function deleteTask(noteId, delBtn) {
    const taskItem = delBtn.parentElement;
    taskItem.remove();
}
function editTask(editBtn) {
    const taskItem = editBtn.parentElement;

    const editButton = taskItem.querySelector('#edit');
    const deleteButton = taskItem.querySelector('#delete');
    //Making edit,delete btns invisible as soon as user clicks on edit button
    editButton.style.display = 'none';
    deleteButton.style.display = 'none';

    const taskText = taskItem.querySelector('span');
    const taskTextInput = document.createElement('input');
    taskTextInput.type = 'text';
    taskTextInput.value = taskText.innerText;
    taskTextInput.className = 'editInputBox'
    const saveButton = document.createElement('button');
    saveButton.id = 'saveBtn';
    saveButton.innerText = 'Save';
    saveButton.addEventListener('click', () => {
        taskText.innerHTML = `
            <img class="check-regular" src="./square-check-regular.svg" onclick="toggleTaskStatus(this)">
            ${taskTextInput.value}`;
        //Once user clicks on save btn, edit and delete options are available again
        editButton.style.display = 'inline';
        deleteButton.style.display = 'inline';

        taskItem.removeChild(taskTextInput);
        taskItem.removeChild(saveButton);
    });

    taskItem.insertBefore(taskTextInput, editButton);
    taskItem.insertBefore(saveButton, editButton);
}
//Here noteCount is used to identify each card uniquely
//Initializing noteCount with 1
let noteCount = 1;
//This function is used to add new note into the card-container
function addNote() {
    const notesHeadInput = document.querySelector('.add-note-input-field')
    let notesHeading = notesHeadInput.value
    if (!notesHeading) {
        alert('Please give a heading to your notes.');
        return;
    }
    const notesContainer = document.querySelector('.notes-container');
    
    const noteCard = document.createElement('div');
    noteCard.className = 'card';
    noteCard.classList.add('card');

    noteCard.id = `note-card${noteCount}`; // Assigning unique ID for each card through noteCount
    //Inserting all the required html content into the note card immediately after clicking on 'Add a new Note' button
    noteCard.innerHTML = `
        <i onclick="deleteCard(this)" class="gg-close card-close-Btn"></i>
        <h1><span class="noteHead">${notesHeading}</span> - Note ${noteCount} </h1>
        <input type="text" id="new-task-input-note${noteCount}" placeholder="Today's plans...?">
        <button onclick="addTask(${noteCount})" id="add">Add task</button>
        <h2>Your tasks :</h2>
        <ul class="unlist" id="taskList-note${noteCount}"></ul>`;

    notesContainer.appendChild(noteCard);
    //incrementing noteCount for each creation of a new note.
    noteCount++;
    //Emptying the input field after clicking 'addNote' button
    notesHeadInput.value=''
}

function deleteCard(delCardBtn) {
    //Deleting the card through .parentElement which triggers to id='card' element
    delCardBtn.parentElement.remove();
}
