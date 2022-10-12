// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {

    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks); 

    // Add task event
    form.addEventListener('submit', addTask);

    // Remove task event
    taskList.addEventListener('click', removeTask);

    // Clear task event
    clearBtn.addEventListener('click', clearTask);

    // Filter task event
    filter.addEventListener('keyup', filterTask);
}

// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    } else {
        // Create li element
        const li = document.createElement('li');
        // Add Class
        li.className = 'collection-item';
        // Create text node and append
        li.appendChild(document.createTextNode(taskInput.value));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>'
        // Append
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);

        // Store in Local Storage
        storeTaskInLocalStorage(taskInput.value);

        // Clear Input
        taskInput.value = '';
    }

    e.preventDefault();
}

// Get Tasks from Local Storage 
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Create li element
        const li = document.createElement('li');
        // Add Class
        li.className = 'collection-item';
        // Create text node and append
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>'
        // Append
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);

    });
}

// Store Task in Local Storage 
function storeTaskInLocalStorage(task) {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {

    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
        }
    }


    // Remove Tasks from Local Storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}


// Remove tasks from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Clear Task
function clearTask() {
    taskList.innerHTML = '';

    // Clear from local storage
    localStorage.clear();
}

// Filter Task
function filterTask(e) {
    const text = e.target.value.toLowerCase();


    if (filter.value === '') {
        alert('No Task Added');
    } else {
        document.querySelectorAll('.collection-item').forEach(
            function (task) {
                const item = task.firstChild.textContent;
                if (item.toLowerCase().indexOf(text) != -1) {
                    task.style.display = 'block';
                } else {
                    task.style.display = 'none';
                }
            });
    }
}

const timer = document.querySelector('.timer');

/* var start = Date.now();
setInterval(function() {
    var delta = Date.now() - start; // milliseconds elapsed since start
    
    console.log(Math.floor(delta / 1000)); // in seconds
    // alternatively just show wall clock time:
    //output(new Date().toUTCString());
}, 1000); // update about every second */