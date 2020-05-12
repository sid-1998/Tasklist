const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

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
        taskInput.value = '';
    }

    e.preventDefault();
}



taskList.addEventListener('click', removeTask);

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();
    }
    
}

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

    // slower way
    // taskList.innerHTML = '';

    // let b = new Date().getTime();
    // let c = b-a;
    // console.log(a);
    // console.log(b);
    // console.log(c);
    e.preventDefault();
}