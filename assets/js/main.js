const inputTask = document.querySelector('.input-task');
const enviarTaskButton = document.querySelector('.enviar-task-button');
const tasks = document.querySelector('.tasks');
const apagarLocalStorage = document.querySelector('.apagar-localStorage');
let myStorage = localStorage;

function criarLi() {
    const li = document.createElement('li');
    return li;
}

function limparInput() {
    inputTask.value = '';
    inputTask.focus();
}

function criarButtonApagar(li) {
    li.innerText += ' ';
    const buttonApagar = document.createElement('button');
    buttonApagar.innerText = 'Apagar';
    buttonApagar.setAttribute('class', 'apagar')
    li.appendChild(buttonApagar);
}

function salvarTasks() {
    const liTasks = tasks.querySelectorAll('li');
    const taskList = [];

    for (let task of liTasks) {
        let taskText = task.innerText
        taskText = taskText.replace('Apagar', '').trim(); // trim retira os espaços sobrando nas pontas
        taskList.push(taskText);
    }
    
    const tasksJSON = JSON.stringify(taskList); // Transforma o array em string
    myStorage.setItem('tasks', tasksJSON);
}

function criarTask(task) {
    const li = criarLi();
    li.innerText = task;
    tasks.appendChild(li);
    limparInput();
    criarButtonApagar(li);
    salvarTasks()
}

function carregarTasksSalvas() {
    const tasks = myStorage.getItem('tasks');
    const taskList = JSON.parse(tasks); // Transforma a string em array
    
    for (let task of taskList) {
        criarTask(task);
    }
}

inputTask.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        criarTask(inputTask.value)
    }
});

enviarTaskButton.addEventListener('click', (e) => {
    if (!inputTask.value) return;
    criarTask(inputTask.value);
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('apagar')) {
        e.target.parentElement.remove();
        salvarTasks();
    }
});

carregarTasksSalvas()