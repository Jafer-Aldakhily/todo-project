const boxs = document.querySelectorAll(".box");
const cards = document.querySelectorAll(".cards");
let drag = null;

let btn = document.getElementById("btn");
let title = document.getElementById("title").value;
let description = document.getElementById("description").value;
let div = document.getElementById("div");
let date = document.getElementById("date").value;
let priority = document.getElementById("priority").value;

let form = document.getElementById("form");

const body = document.querySelector("body");
let displayForm1 = document.getElementById("exampleModal1");

// ------------------------------Edit Todo form selectors---------------------------------------
let titleInp1 = document.querySelector("#title1");
let descriptionInp1 = document.querySelector("#description1");
let priorityInp1 = document.querySelector("#priority1");
let dateInp1 = document.querySelector("#date1");
// ------------------------------./Edit Todo form selectors---------------------------------------
// -------------------------Todo class ------------------------
let todos = [];
class Todo {
  constructor(
    userName,
    title,
    description,
    day,
    month,
    priority,
    todoStatus,
    color
  ) {
    this.userName = userName;
    this.id = generateId();
    this.title = title;
    this.description = description;
    this.day = day;
    this.month = month;
    this.priority = priority;
    this.todoStatus = todoStatus;
    this.color = color;
    date = dateFormate(date);
  }
}

function generateId() {
  return Math.floor(Math.random() * 10000);
}

const dateFormate = (date) => {
  let dateFormate = new Date(date);
  let day = dateFormate.getUTCDay;
  let month = dateFormate.getUTCMonth;
  month++;

  return day + month;
};

let arr = [1];
let loggedInUser = localStorage.getItem("logged")
  ? localStorage.getItem("logged")
  : loggedInUser;
const addTodo = (e) => {
  arr ? JSON.parse(localStorage.getItem("todos")) : arr;
  title = e.target.title.value;
  description = e.target.description.value;
  date = e.target.date.value;
  priority = e.target.priority.value;
  let color = "";
  switch (priority) {
    case "critical":
      color = "red";
      break;
    case "low-priority":
      color = "green";
      break;
    case "normal":
      color = "blue";
      break;
  }
  todoStatus = 0;
  let dateFormate = new Date(date);
  let day = dateFormate.getUTCDate();
  let month = dateFormate.getUTCMonth();

  let formatedMonth = setMonth(month);
  // console.log(mama);
  switch (priority) {
    case "critical":
      priority = "Critical";
      // priority.style.color = "red";
      break;
    case "normal":
      priority = "Normal";
      break;
    case "low-priority":
      priority = "low priority";
      break;
  }
  let todo = new Todo(
    loggedInUser,
    title,
    description,
    day,
    formatedMonth,
    priority,
    todoStatus,
    color
  );

  if (arr[0] == 1) {
    arr.unshift(todo);
    arr.pop();
  } else {
    arr.push(todo);
  }
  // console.log(arr);
  localStorage.setItem("todos", JSON.stringify(arr));
  renderFromLocal();
};

function setMonth(month) {
  switch (month) {
    case 0:
      month = "Jan";
      break;
    case 1:
      month = "Feb";
      break;
    case 2:
      month = "Mar";
      break;
    case 3:
      month = "Apr";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "Aug";
      break;
    case 8:
      month = "Sept";
      break;
    case 9:
      month = "Oct";
      break;
    case 10:
      month = "Nov";
      break;
    case 11:
      month = "Dec";
      break;
  }
  return month;
}

window.onload = () => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (todos) {
    arr = todos;
  }
  renderFromLocal();
  dragTask();
};

const renderFromLocal = () => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (todos) {
    todos.forEach((item) => {
      if (item.userName == loggedInUser) render(item);
    });
  }
};

// -------------------------Todo class ------------------------

function render(paraTodos) {
  cards[0].innerHTML += `
    <div class="container cardDrag" draggable=true>
          <div class="row">
            <div class="col-lg-12">
              <div class="card card-margin" >
                <div class="card-header no-border">
                  <h5 id="priority" style="color: ${paraTodos.color} !important" class="card-title">${paraTodos.priority}</h5>
                </div>
                <div class="card-body pt-0">
                  <div class="widget-49">
                    <div class="widget-49-title-wrapper">
                      <div class="widget-49-date-success">
                        <span id="day" class="widget-49-date-day">${paraTodos.day}</span>
                        <span id="month" class="widget-49-date-month">${paraTodos.month}</span>
                      </div>
                      <div class="widget-49-meeting-info">
                        <span id="title" class="widget-49-pro-title fs-3 ps-3"
                          >${paraTodos.title}</span
                        >
                      </div>
                    </div>
                    <p class="pt-4 fs-4" id="description">${paraTodos.description}</p>
                    <div class="widget-49-meeting-action">
                      
                        <button
                          
                          type="button"
                          class="btn btn-sm btn-flash-border-success displayFormBtn1"
                          onClick="editTodo(${paraTodos.id})"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal1"
                        >
                        Edit
                        </button>
                        <button
                          
                          type="button"
                          class="btn btn-sm btn-flash-border-success displayFormBtn1"
                          onClick="Del(${paraTodos.id}); window.location.href=window.location.href"
                          style="color:red "
                        >
                        del
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
}
// start del-------------------------------------------------------------------------------
function Del(id) {
  let popedArr;
  const toDel = JSON.parse(localStorage.getItem("todos"));

  popedArr = toDel.filter((todo) => todo.id != id);
  console.log(popedArr);
  localStorage.setItem("todos", JSON.stringify(popedArr));

  cards[0].innerHTML = "";
  cards[1].innerHTML = "";
  cards[2].innerHTML = "";
  cards[3].innerHTML = "";
  renderFromLocal();
}

// end del-------------------------------------------------------------------------------
// new fixed-------------------------------------edit todo
const form1 = document.querySelector("#form1");
let title1;
let description1;
let date1;
let priority1;
let items = [];
// ---------edit------------------------
const editTodo = (id) => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  items = todos.filter((todo) => {
    if (todo.id == id) {
      titleInp1.value = todo.title;
      descriptionInp1.value = todo.description;
      priorityInp1.value.selected = todo.priority;
    }
    return todo;
  });
  form1.addEventListener("submit", (e) => {
    e.preventDefault();
    items = [];
    items = todos.filter((todo) => {
      if (todo.id == id) {
        todo.title = e.target.title1.value;
        todo.description = e.target.description1.value;
        todo.priority = e.target.priority1.value;
        let dateFormate = new Date(e.target.date1.value);
        todo.day = dateFormate.getUTCDate();
        let month = dateFormate.getUTCMonth();
        let formatedMonthEdit = setMonth(month);
        todo.month = formatedMonthEdit;
        let color = "";
        switch (todo.priority) {
          case "critical":
            todo.color = "red";
            break;
          case "low-priority":
            todo.color = "green";
            break;
          case "normal":
            todo.color = "blue";
            break;
        }
      }
      return todo;
    });
    localStorage.setItem("todos", JSON.stringify(items));
    cards[0].innerHTML = "";
    cards[1].innerHTML = "";
    cards[2].innerHTML = "";
    cards[3].innerHTML = "";
    renderFromLocal();
    window.location.href = window.location.href;
  });
};

const dragTask = () => {
  const items = document.querySelectorAll(".cardDrag");
  items.forEach((item) => {
    item.addEventListener("dragstart", () => {
      drag = item;
      item.style.opacity = "1";
    });
    item.addEventListener("drag", () => {
      drag = item;
      item.style.opacity = "0";
    });

    item.addEventListener("dragend", () => {
      drag = null;
      item.style.opacity = "1";
    });

    boxs.forEach((box, index) => {
      box.addEventListener("dragover", (e) => {
        e.preventDefault();
        box.style.backgroundColor = "#65b1fdc8";
        box.style.color = "#fff";
      });

      box.addEventListener("dragleave", () => {
        box.style.backgroundColor = "#fff";
        box.style.color = "#000";
      });

      box.addEventListener("drop", () => {
        cards[index].append(drag);
        box.style.backgroundColor = "#fff";
        box.style.color = "#000";
      });
    });
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.title.value != "" && e.target.description.value != "") {
    cards[0].innerHTML = "";
    cards[1].innerHTML = "";
    cards[2].innerHTML = "";
    cards[3].innerHTML = "";
    addTodo(e);
    e.target.title.value = "";
    e.target.description.value = "";
  }
  dragTask();
});

function getFromLocal() {
  cards[0].innerHTML = "";
  cards[1].innerHTML = "";
  cards[2].innerHTML = "";
  cards[3].innerHTML = "";
  let jsonArr = localStorage.getItem("todos");
  let arr = JSON.parse(jsonArr);
  todos = arr;
  todos.forEach((todo) => {
    render(todo);
  });
}

function logout() {
  localStorage.removeItem("logged");

  setTimeout(() => {
    window.location = "./index.html";
  }, 1500);
}

let displayFormBtn = document.getElementById("displayFormBtn");

let displayForm = document.getElementById("exampleModal");
displayFormBtn.addEventListener("click", (e) => {
  displayForm.style.visibility = "visible";

  console.log("clicked");
});

// -----------------------------------------------------------------

function showProfile() {
  let offHeader = document.getElementById("offheader");
  let offUsername = document.getElementById("username0");
  let offEmail = document.getElementById("offEmail");

  let users = JSON.parse(localStorage.getItem("Users"));
  let activeUser = localStorage.getItem("logged");
  if (users) {
    users.forEach((element) => {
      if (activeUser == element.registerUserName) {
        offHeader.innerHTML = `Hello ${element.firstName}`;
        offUsername.innerHTML = `User Name:  ${element.registerUserName}`;
        offEmail.innerHTML = `Email:  ${element.email}`;
      }
    });
  }
}
showProfile();
