const addBtn = document.querySelector('.add-btn');
const list = document.querySelector('.parent-list');
const deleteBtn = document.querySelector('.delete-btn');
const userInput = document.querySelector('#userInput');
const completedTasksBtn = document.querySelector('.completed-tasks');
const activeTasksBtn = document.querySelector('.active-tasks');



let tasks = [];


function createTaskElement() {
    list.innerHTML = '';

    tasks.forEach((task, index) => {
        console.log(task);
        console.log(index);
        const newList = document.createElement('div');
        newList.classList.add('item');
        newList.classList.add('active');

        if (task.isImportant) {
            newList.classList.add('yellow');
            const hideThese = document.querySelectorAll('.completed');
            hideThese.forEach(el => {
                el.style.display = 'none'
            });
        } else {
            const hideThese = document.querySelectorAll('.completed');
            hideThese.forEach(el => {
                el.style.display = 'none'
            });
        }

        if (task.isCompleted) {
            newList.classList.add('completed');
            const hideThese = document.querySelectorAll('.completed');
            hideThese.forEach(el => {
                el.style.display = 'none'
            });
        };

        completedTasksBtn.addEventListener('click', () => {
            const hideThese = document.querySelectorAll('.active');
            const showThese = document.querySelectorAll('.completed');

            completedTasksBtn.classList.add('selected');
            activeTasksBtn.classList.remove('selected');

            hideThese.forEach(el => {
                el.style.display ='none';
            });

            showThese.forEach(el => {
                el.style.display = 'flex'
            });
        });

        activeTasksBtn.addEventListener('click', () => {
            const showThese = document.querySelectorAll('.active');
            const hideThese = document.querySelectorAll('.completed');

            completedTasksBtn.classList.remove('selected');
            activeTasksBtn.classList.add('selected');

            showThese.forEach(el => {
                el.style.display = 'flex'
            });

            hideThese.forEach(el => {
                el.style.display = 'none'
            });
        });
        
        newList.innerHTML = `
            <p id="editable-text" class="task-item">${task.title}</p>
            <div>
                <button class="priority-btn" onclick="importantTask(${index})">
                    <svg xmlns="http://www.w3.org/2000/svg" class="priority-icon h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                </button>

                <button class="complete-btn item-button" onclick="completedTask(${index})">
                    <svg class="complete-icon h-6 w-6" xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </button>

                <button class="edit-btn item-button" onclick="editText(${index})">
                    <svg class="w-6 h-6 button-icon edit-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </button>

                <button class="delete-btn item-button" onclick="deleteTask(${index})">
                    <svg class="w-6 h-6 button-icon delete-icon"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"        stroke-width="1.5" stroke="currentColor" >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74  9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
            </div>
        `
        
        list.appendChild(newList);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// to add new task
function handleAddTask() {
    const userInput = document.querySelector('#userInput');
    const value = userInput.value;
    console.log(value);

    if (!value) {
        return;
    }

    const newTask = {
        title: value,
        isImportant: false,
        isCompleted: false
    };

    tasks.push(newTask);
    createTaskElement();

    userInput.value = '';
};

addBtn.addEventListener('click', handleAddTask)

// so that pressing Enter will also add the task
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleAddTask();
    };
});

// to focus the input box without having to use the mouse
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        userInput.focus();
    };
});

// mark task as important
function importantTask(index) {
    tasks[index].isImportant = !tasks[index].isImportant;
    createTaskElement();
}

// mark as completed
function completedTask(index) {
    tasks[index].isCompleted = !tasks[index].isCompleted;
    createTaskElement()
}

// edit button
function editText(index) {
    const text = document.querySelectorAll('#editable-text');
    const taskItem = text[index];
    taskItem.contentEditable = true;
    taskItem.focus();
  
    taskItem.addEventListener('blur', () => {
      taskItem.contentEditable = false;
      tasks[index].title = taskItem.innerText.trim();
      createTaskElement();
    });
};

// delete button
function deleteTask(index) {
    tasks.splice(index, 1);
    createTaskElement();
    return
};

//restore added tasks
const storedTodos = localStorage.getItem('tasks');

if (storedTodos) {
  tasks = JSON.parse(storedTodos);
};

window.onload = () => {
    activeTasksBtn.click()
    activeTasksBtn.active()
}

createTaskElement();