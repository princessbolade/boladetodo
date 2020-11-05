// Get Elements

const date = document.querySelector(".date");
const lists = document.getElementById("lists");
const tasknum = document.querySelector(".tasknum");
const close = document.querySelector("close");
const addtodo = document.querySelector(".addtodo");
const itemInput = document.querySelector(".addInput");
const listItems = document.getElementsByClassName("listItems");

let todoItems = JSON.parse(localStorage.getItem("items")) || [];
// Get dates
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const d = new Date();
const dayName = days[d.getDay()];
const monthName = monthNames[d.getMonth()];
const day = (d.getDay() + 1).toString();
date.textContent = `${dayName}, ${day} ${monthName}`;

// Number of task
const updateTaskNumber = () => {
  tasknum.textContent = `${todoItems.length} tasks`;
};

updateTaskNumber();

// Strike Todo

const updateTask = (param) => {
  if (param.checked) {
    param.parentNode.style.textDecoration = "line-through";
  } else {
    param.parentNode.style.textDecoration = "none";
  }
};

// Modal

document.getElementById("modalBtn").addEventListener("click", function () {
  document.querySelector(".bg-modal").style.display = "flex";
});
document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".bg-modal").style.display = "none";
});

// delete todo

const deleteTodo = (node) => {
  //confirm("Are you sure you want to delete this task");
  var txt;
  var r = confirm("Are you sure you want to delete this task?");
  if (r == true) {
    txt = "Task deleted";
  } else {
    return false;
  }
  const mainNode = node.parentNode;
  const parent = mainNode.parentNode;
  const text = mainNode.textContent.trim();
  const index = todoItems.findIndex((td) => td === text);
  console.log(index);
  todoItems.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(todoItems));
  // console.log(parent, mainNode);
  parent.removeChild(mainNode);
  updateTaskNumber();
};

//Add a to-do

function addTodo() {
  if (
    itemInput.value.trim() === "" ||
    itemInput.value.trim() === null ||
    itemInput.value.trim() === "  "
  ) {
    return false;
  } else {
    const position = "beforeEnd";
    const text = `<li class="listItems">
    <div>
      <input onclick="updateTask(this)" type="checkbox"  id="checkbox" job="complete"/>
      ${itemInput.value}
      </div>
      <a onclick="deleteTodo(this)" href="#">
        <i class="far fa-trash-alt delete" job="delete"></i>
      </a>

    </li>`;
    lists.insertAdjacentHTML(position, text);
    document.querySelector(".bg-modal").style.display = "none";
    //console.log("are you mad!");
    todoItems.push(itemInput.value);
    itemInput.value = "";
    updateTaskNumber();
    localStorage.setItem("items", JSON.stringify(todoItems));
  }
}

addtodo.addEventListener("click", addTodo);

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("yy");
  todoItems.forEach((td) => {
    const position = "beforeEnd";
    const text = `<li class="listItems">
    <div>
    <input onclick="updateTask(this)" type="checkbox" id="checkbox" job="complete"/>
    ${td}
    </div>
    <a onclick="deleteTodo(this)" href="#">
      <i class="far fa-trash-alt delete" job="delete"></i>
    </a>
  </li>`;
    lists.insertAdjacentHTML(position, text);
  });
});
