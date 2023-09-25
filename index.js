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
function adjustCardHeight(noteId) {
    const taskList = document.querySelector(`#taskList-note${noteId}`);
    const card = document.querySelector(`#note-card${noteId}`);

    // Minimum height of the card
    const minHeight = 200; // Adjust this value based on your design

    // Calculate new height based on the number of tasks
    const newHeight = minHeight + taskList.clientHeight;

    card.style.height = `${newHeight}px`;
}


function toggleTaskStatus(checkImg) {
    console.log("toggle status called....");
    const taskText = checkImg.closest('li').querySelector('span');

    if (checkImg.src.includes('square-check-regular')) {
        checkImg.src = './square-check-solid.svg';
        taskText.style.textDecoration = 'line-through'; 
        checkImg.closest('li').querySelector('#edit').style.display = 'none'; 
    } else {
        checkImg.src = './square-check-regular.svg';
        taskText.style.textDecoration = 'none';  
        checkImg.closest('li').querySelector('#edit').style.display = 'inline'; 
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

        editButton.style.display = 'inline';
        deleteButton.style.display = 'inline';

        taskItem.removeChild(taskTextInput);
        taskItem.removeChild(saveButton);
    });

    taskItem.insertBefore(taskTextInput, editButton);
    taskItem.insertBefore(saveButton, editButton);
}

let noteCount = 1;

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

    noteCard.id = `note-card${noteCount}`; // Unique ID for each card

    noteCard.innerHTML = `
        <i onclick="deleteCard(this)" class="gg-close card-close-Btn"></i>
        <h1><span class="noteHead">${notesHeading}</span> - Note ${noteCount} </h1>
        <input type="text" id="new-task-input-note${noteCount}" placeholder="Today's plans...?">
        <button onclick="addTask(${noteCount})" id="add">Add task</button>
        <h2>Your tasks :</h2>
        <ul class="unlist" id="taskList-note${noteCount}"></ul>`;

    notesContainer.appendChild(noteCard);
    noteCount++;
    notesHeadInput.value=''
}

function deleteCard(delCardBtn) {
    delCardBtn.parentElement.remove();
}
