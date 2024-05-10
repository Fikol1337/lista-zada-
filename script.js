document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const newTask = document.createElement('li');
            newTask.textContent = taskText;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Usuń';
            deleteBtn.classList.add('delete-btn');
            newTask.appendChild(deleteBtn);

            taskList.appendChild(newTask);
            taskInput.value = '';
        }
    }

    addTaskBtn.addEventListener('click', addTask);

    taskList.addEventListener('click', function(event) {
        const clickedElement = event.target;

        if (clickedElement.tagName === 'LI') {
            if (clickedElement.style.textDecoration === 'line-through') {
                clickedElement.style.textDecoration = 'none'; // Anulowanie przekreślenia
            } else {
                clickedElement.style.textDecoration = 'line-through';
            }
        } else if (clickedElement.classList.contains('delete-btn')) {
            let listItem = clickedElement.parentNode;
            listItem.parentNode.removeChild(listItem);
        }


    });
});
