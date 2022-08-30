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
    color,
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
    this.position = 0
  }
}

function generateId() {
  return Math.floor(Math.random() * 10000);
}

const dateFormate = (date) => {
  let dateFormate = new Date(date);
  let day = dateFormate.getUTCDay();
  let month = dateFormate.getUTCMonth();
  month++;

  return day + month;
};

let arr = [1]
let loggedInUser = 1
let position = 0
loggedInUser = localStorage.getItem("logged")
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
      priority = "critical";
      // priority.style.color = "red";
      break;
    case "normal":
      priority = "normal";
      break;
    case "low-priority":
      priority = "low-priority";
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
    color,
  );

  if (arr[0] == 1) {
    arr.unshift(todo);
    arr.pop();
  } else {
    arr.push(todo);
  }
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
  if(loggedInUser === 1) window.location = "./index.html"
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (todos) {
    arr = todos;
  }
  // setPositionCard()
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
  cards[paraTodos.position].innerHTML += `
    <div class="container cardDrag"  draggable=true id=${paraTodos.id}>
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


let cardId; 
const dragTask = () => {
  const items = document.querySelectorAll(".cardDrag");
  items.forEach((item) => {
    item.addEventListener("dragstart", (e) => {
      cardId = item.id;
      drag = item;
      e.target.style.opacity = 1
      item.style.opacity
      console.log(item.style.opacity);
    });
    item.addEventListener("drag", () => {
      drag = item;
    });

    item.addEventListener("dragend", () => {
      drag = null;
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
        let todos = JSON.parse(localStorage.getItem("todos"));
        // console.log(todos);
        todos =  todos.filter((todo) => {
          if(todo.id == cardId)
          {
            todo.position = index
          }
          return todo
        })
        localStorage.setItem("todos",JSON.stringify(todos)) 
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

// Light & Dark mode
const chk = document.getElementById("chk");
chk.addEventListener("change", () => {
    localStorage.setItem("theme",chk.value)
    document.body.classList.toggle("darkTheme");
});



let filterForm = document.getElementById("filterForm");
let filterSelect = document.getElementById("filterSelect");
let activeUser = localStorage.getItem("logged");

function filter() {
  let tasks = localStorage.getItem("todos");
  let pTasks = JSON.parse(tasks)
  pTasks = pTasks.filter((item) => filterSelect.value == item.priority)
  console.log(pTasks);
  cards[0].innerHTML = "";
  cards[1].innerHTML = "";
  cards[2].innerHTML = "";
  cards[3].innerHTML = "";
  pTasks.forEach((element) => {
    render(element);
  });
}
filterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  filter();
});
