let inputAdd = document.querySelector(".input-text");
let listBox = document.querySelector(".list");
let btn = document.querySelector(".myButton");
let todoArray = [];
let allInput = document.querySelector("#input-list");

let all = document.querySelector(".main-card");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    let todo = localStorage.getItem("todo");
    if (todo === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(todo);
    }
    todoArray.push(inputAdd.value);
    inputAdd.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
});

function displayTodo() {
    let todo = localStorage.getItem("todo");
    if (todo === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(todo);
    }

    let htmlCode = "";
    for (
        let todo_arr_index = 0; todo_arr_index < todoArray.length; todo_arr_index++
    ) {
        htmlCode += ` 
            <div>
                <div>
                <input class="input-text" type="text"  value="${todoArray[todo_arr_index]}"> <i id="delete" onclick='deleteTodo(${todo_arr_index})' class="bi bi-x-circle"></i>
                </div>
            </div>`;
    }
    listBox.innerHTML = htmlCode;
    let inputlist = allInput.getElementsByTagName("input");
    if (inputlist)
        for (let index = 0; index < inputlist.length; index++) {
            inputlist[index].addEventListener("blur", (e) => {
                e.preventDefault();
                let todo = localStorage.getItem("todo");
                todoArray = JSON.parse(todo);
                todoArray[index] = e.target.value;
                localStorage.setItem("todo", JSON.stringify(todoArray));
            });
        }
}

function deleteTodo(i) {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    todoArray.splice(i, 1);
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
}

let count = 0;

function sortClick() {
    
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    if (todoArray)
        if (count == 0) {
            count++;
            todoArray.sort().reverse();
            localStorage.setItem("todo", JSON.stringify(todoArray));
        } else if (count == 1) {
        count--;
        todoArray.sort();
        localStorage.setItem("todo", JSON.stringify(todoArray));
    }
    displayTodo();
}
function myFunction(x) {
    x.classList.toggle("fa-arrow-up-short-wide");
  }


window.addEventListener("DOMContentLoaded", (_) => {
    displayTodo();
    sortClick();
});






inputAdd.addEventListener("click", function(event) {
    event.target.style.outline = "0";
});
inputAdd.addEventListener("focus", function(event) {
    event.target.style.outline = "0";
});

allInput.addEventListener("click", function(event) {
    event.target.style.outline = "0";
});
allInput.addEventListener("focus", function(event) {
    event.target.style.outline = "0";
});


new Sortable(allInput,{
    animation:300
});