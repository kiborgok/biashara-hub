//require("dotenv").config()
// let login = document.getElementById("login");
let logout = document.getElementById("logout-user");
 let profile = document.getElementById("profile");

function getUserProfile() {
  if (localStorage.getItem("account")) {
    //const user = JSON.parse(localStorage.getItem("account"));
    login.style.display = "none"
    register.style.display = "none";
    return
  }
  logout.style.display = "none";
  admin.style.display = "none";
  profile.style.display = "none";
}
getUserProfile()

const createUserForm = document.getElementById("create-user");
const loginForm = document.getElementById("login-user");
const logOutBtn = document.getElementById("logout-user");

logOutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let session = JSON.parse(localStorage.getItem("session"))
  logoutUser(session["id"]);
});

createUserForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const username = e.target.username.value;
  const password = e.target.password.value;
  createUser({ email, password, username });
  createUserForm.reset();
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  loginUser({ email, password });
  loginForm.reset();
});

function getUser(userId) {
  return fetch(`https://api.m3o.com/v1/user/Read`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer YmE4NGQ0NjktNjQ0Mi00OGQ3LWJlYmItMGFiMThmMmEzMmU1`,
      Accept: "application/json",
    },
    body: JSON.stringify({ id:userId }),
  })
    .then((res) => res.json())
    .then((account) => {
      if (account.status === "Internal Server Error" || account.code === 500) {
        localStorage.setItem("account","")
      }
      localStorage.setItem("account", JSON.stringify(account.account));
    })
}

function logoutUser(sessionId) {
  fetch(`https://api.m3o.com/v1/user/Logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer YmE4NGQ0NjktNjQ0Mi00OGQ3LWJlYmItMGFiMThmMmEzMmU1`,
      Accept: "application/json",
    },
    body: JSON.stringify({sessionId}),
  })
    .then((res) => res.json())
    .then((account) => {
      if (
        account.status === "Internal Server Error" ||
        account.code === 500
      ) {
        throw new Error("You are logged out");
      }
      alert("Logged out successfully");
      localStorage.removeItem("account")
      window.location.reload()
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

function loginUser({ email, password }) {
  fetch(`https://api.m3o.com/v1/user/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer YmE4NGQ0NjktNjQ0Mi00OGQ3LWJlYmItMGFiMThmMmEzMmU1`,
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((account) => {
      if (account.status === "Unauthorized" || account.code === 401) {
        throw new Error("Invalid email/password");
      } else if (
        account.status === "Internal Server Error" ||
        account.code === 500
      ) {
        throw new Error("User not found");
      }
      alert("Logged in successfully")
      
      console.log(account);
      localStorage.setItem("session", JSON.stringify(account.session));
      getUser(account.session.userId);
      setTimeout(() => {
        window.location.reload();
      },3000)
      
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

function createUser({ email, password, username }) {
  fetch(`https://api.m3o.com/v1/user/Create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer YmE4NGQ0NjktNjQ0Mi00OGQ3LWJlYmItMGFiMThmMmEzMmU1`,
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      username,
    }),
  })
    .then((res) => res.json())
    .then((account) => {
      if (account.status === "Bad Request" || account.code === 400) {
        throw new Error(account.detail.toUpperCase());
      }
      console.log("Registered successfully", account);
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}
