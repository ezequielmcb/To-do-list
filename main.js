// le asignamos un valor a la variables de html
const taskInput = document.querySelector(".task-input input");
addBtn = document.querySelector(".task-input button"),
btns = document.querySelectorAll(".sections span"),
clearAll = document.querySelector(".clear-btn"),
taskBox = document.querySelector(".task-box");
console.log(taskInput)

let editId,
styleTask = false,
todos = JSON.parse(localStorage.getItem("todo-list"));

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let list = "";
    if (todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all") {
                list += `  <li class="task">
                            <label for="${id}" class="lista">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            ${filter === 'completed' ? `<div class="secdelete" onclick="deleteTask(${id}, '${filter}')"><i class="fa fa-trash"></i></div>` : ''}
                            </li>`;
            }
        });
    }
    taskBox.innerHTML = list;
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}

showTodo("all");

function showMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "active";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}

function deleteTask(deleteId, filter) {
    styleTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filter);
}

clearAll.addEventListener("click", () => {
    styleTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo()
});

addBtn.addEventListener("click", () => {
    let userTask = taskInput.value.trim();
    if (userTask) {
        if (!styleTask) {
            todos = !todos ? [] : todos;
            let taskInfo = { name: userTask, status: "active" };
            todos.push(taskInfo);
        } else {
            styleTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    }
});


