// register lets
let form = document.getElementById("registerDataForm");
let FirstName = document.getElementById("FirstNameRegister");
let SecName = document.getElementById("SecNameRegister");
let registerUserName = document.getElementById("registerUserName");
let email = document.getElementById("email");
let registerPassword = document.getElementById("registerPassword");
// login lets
let form1 = document.getElementById("loginDataForm");
let loginUserName = document.getElementById("loginUserName");
let loginPassword = document.getElementById("loginPassword");
let alert = document.getElementById("alert");

function User(FirstName, SecName, registerUserName, email, registerPassword) {
  this.firstName = FirstName;
  this.SecName = SecName;
  this.registerUserName = registerUserName;
  this.email = email;
  this.registerPassword = registerPassword;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    FirstName.value &&
    SecName.value &&
    registerUserName.value &&
    email.value &&
    registerPassword.value
  ) {
    getRegisterInfo();
    form.reset();
  }
});

var usersArr = new Array("1");
function getRegisterInfo() {
  usersArr = JSON.parse(localStorage.getItem("Users"))
    ? JSON.parse(localStorage.getItem("Users"))
    : usersArr;
  const user = new User(
    FirstName.value,
    SecName.value,
    registerUserName.value,
    email.value,
    registerPassword.value
  );
  if (usersArr[0] === "1") {
    usersArr.unshift(user);
    usersArr.pop();
  } else {
    usersArr.push(user);
  }
  localStorage.setItem("Users", JSON.stringify(usersArr));
  localStorage.setItem("logged", registerUserName.value);
  setTimeout(() => {
    window.location = "./app.html";
  }, 1500);
}

form1.addEventListener("submit", (e) => {
  e.preventDefault();
  let usersDataJson = localStorage.getItem("Users");
  let usersArr = JSON.parse(usersDataJson);

  if (usersArr) {
    if (loginUserName.value && loginPassword.value) {
      usersArr.forEach((element) => {
        if (
          element.registerUserName == loginUserName.value &&
          element.registerPassword == loginPassword.value
        ) {
          localStorage.setItem("logged", loginUserName.value);
          setTimeout(() => {
            window.location = "./app.html";
          }, 500);
        } else {
          setTimeout(() => {
            alert.innerHTML =
              "* Email or password wrong! Please check you info :)";
          }, 1000);
        }
      });
    }
  }
});
let isLogged = localStorage.getItem("logged");
if (isLogged) {
  setTimeout(() => {
    window.location = "./app.html";
  }, 1500);
}

const chk = document.getElementById("chk");

chk.addEventListener("change", () => {
  document.body.classList.toggle("darkTheme");
});
