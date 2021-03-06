const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

// submit task event
form.addEventListener('submit', addTask);
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }
    else{
        // create a li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        const textNode = document.createTextNode(taskInput.value);
        li.appendChild(textNode);
        
        //delete icon
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';//secondary-content is a materialize class added to make the icon appear on the left side.
        link.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(link);
        taskList.appendChild(li);

        storeInLocalStorage(taskInput.value);

        taskInput.value = '';
    }

    e.preventDefault();
}
// Adding task to LocalStorage
function storeInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// removing a particular task
taskList.addEventListener('click', removeTask);

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();

        removeFromLocalStorage(e.target.parentElement.parentElement);
    }
    
}
//removing a particular task from local storage
function removeFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// removing all tasks at once
clearBtn.addEventListener('click', clearAllTasks);
function clearAllTasks(e){
    // let a = new Date().getTime();

    // poor performance
    // const allTasks = Array.from(taskList.children);
    // allTasks.forEach(function(task){
    //     task.remove();
    // })

    //fastest way
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }
    localStorage.clear();
    // slower way
    // taskList.innerHTML = '';

    // let b = new Date().getTime();
    // let c = b-a;
    // console.log(a);
    // console.log(b);
    // console.log(c);
    e.preventDefault();
}

//filtering task on the basisi of content
filter.addEventListener('keyup', filterTasks);
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.collection-item');
    
    items.forEach(function filterItems(item){
        if(item.textContent.toLowerCase().indexOf(text) != -1){
            item.style.display = 'block';
        }
        else{
            item.style.display = 'none';
        }
    })
}

//DOM load event for displaying persisted tasks
document.addEventListener('DOMContentLoaded', getTasks);

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        li = document.createElement('li');
        li.className = 'collection-item';

        li.appendChild(document.createTextNode(task));

        link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove" i></i>';

        li.appendChild(link);

        taskList.append(li);
    })

}