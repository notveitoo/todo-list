let todoList = [];

// Load todoList from localStorage if available
const storedTodoList = localStorage.getItem('todoList');
if (storedTodoList) {
    todoList = JSON.parse(storedTodoList);
}

// Function to render the todo list
function renderTodolist() {
    let todoHTML = '';

    // Loop through todoList and create HTML for each item
    for (let i = 0; i < todoList.length; i++) {
        const todoObject = todoList[i];
        const { name, dueDate } = todoObject;
        const html = `
            <div>${name}</div>
            <div>${dueDate}</div>
            <button onclick="
                todoList.splice(${i}, 1);
                saveTodoList();
                renderTodolist();
            " class= "btn-delete-task"
            >Delete</button>`;
        todoHTML += html;
    }

    // Display the HTML in the .js-list-todo element
    document.querySelector('.js-list-todo').innerHTML = todoHTML;
}

// Function to add a new todo item
function addTodo() {
    // Get input elements
    const inputElement = document.querySelector('.js-input-todo');
    const inputElementDate = document.querySelector('.js-input-date');

    // Get values from input elements
    const name = inputElement.value;
    const dueDate = inputElementDate.value;

    if (!dueDate) {
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Adding 1 because months start from 0
        const day = currentDate.getDate();

        // Format the date as YYYY-MM-DD
        const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

        // Add a new todo item to the todoList array
        todoList.push({
            name,
            dueDate: formattedDate // Fix here, use dueDate instead of formattedDate
        });
    } else {
        // Add a new todo item to the todoList array
        todoList.push({
            name,
            dueDate
        });
    }

    // Save the updated todoList and render the updated todo list
    saveTodoList();
    renderTodolist();
}

// Function to save todoList to localStorage as a JSON string
function saveTodoList() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Get the input element for todo
var inputTodo = document.querySelector('.js-input-todo');

// Add event listener for the 'keypress' event to trigger addTodo on 'Enter'
inputTodo.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        addTodo();
    }
});

// Initial rendering of the todo list
renderTodolist();
