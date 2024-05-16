document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const allTasksBtn = document.getElementById('allTasksBtn');
    const activeTasksBtn = document.getElementById('activeTasksBtn');
    const completedTasksBtn = document.getElementById('completedTasksBtn');

    let tasks = [];

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const newTask = document.createElement('li');
            newTask.textContent = taskText;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Usuń';
            deleteBtn.classList.add('delete-btn');
            newTask.appendChild(deleteBtn);

            tasks.push({ text: taskText, element: newTask, completed: false });

            renderTasks();

            taskInput.value = '';
        }
    }

    function renderTasks() {
        taskList.innerHTML = '';

        tasks.forEach(function(task) {
            const newTask = task.element;
            if (task.completed) {
                newTask.classList.add('task-done');
            } else {
                newTask.classList.remove('task-done');
            }
            taskList.appendChild(newTask);
        });
    }

    function filterTasks(filterType) {
        switch (filterType) {
            case 'active':
                renderActiveTasks();
                break;
            case 'completed':
                renderCompletedTasks();
                break;
            default:
                renderAllTasks();
                break;
        }
    }

    function renderActiveTasks() {
        const activeTasks = tasks.filter(task => !task.completed);
        taskList.innerHTML = '';
        activeTasks.forEach(task => taskList.appendChild(task.element));
    }

    function renderCompletedTasks() {
        const completedTasks = tasks.filter(task => task.completed);
        taskList.innerHTML = '';
        completedTasks.forEach(task => taskList.appendChild(task.element));
    }

    function renderAllTasks() {
        renderTasks();
    }

    addTaskBtn.addEventListener('click', addTask);

    taskList.addEventListener('click', function(event) {
        const clickedElement = event.target;

        if (clickedElement.tagName === 'LI') {
            const clickedTaskIndex = tasks.findIndex(task => task.element === clickedElement);
            tasks[clickedTaskIndex].completed = !tasks[clickedTaskIndex].completed;
            renderTasks();
        } else if (clickedElement.classList.contains('delete-btn')) {
            const listItem = clickedElement.parentNode;
            const listItemIndex = tasks.findIndex(task => task.element === listItem);
            tasks.splice(listItemIndex, 1);
            listItem.parentNode.removeChild(listItem);
        }
    });

    allTasksBtn.addEventListener('click', function() {
        filterTasks('all');
    });

    activeTasksBtn.addEventListener('click', function() {
        filterTasks('active');
    });

    completedTasksBtn.addEventListener('click', function() {
        filterTasks('completed');
    });
});
