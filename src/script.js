//require("dotenv").config();
let home = document.getElementById("home");
let homeDiv = document.querySelector(".home-container");
let login = document.getElementById("login");
let register = document.getElementById("register");
let signinForm = document.querySelector(".signin");
let signupForm = document.querySelector(".signup");
let admin = document.getElementById("admin");
let adminDiv = document.querySelector(".admin-container");

admin.addEventListener("click", () => {
  login.children[0].classList.remove("active");
  register.children[0].classList.remove("active");
    home.children[0].classList.remove("active");
    admin.children[0].classList.add("active");
    homeDiv.classList.add("home-container-hidden");
    homeDiv.classList.remove("d-flex", "flex-column");
  adminDiv.classList.add("d-flex", "flex-column");
  adminDiv.classList.remove("admin-container-hidden");
  signupForm.classList.remove("signup-div");
  signupForm.classList.add("signup-hidden");
  signinForm.classList.remove("signin-div");
  signinForm.classList.add("signin-hidden");
});

home.addEventListener("click", () => {
    admin.children[0].classList.remove("active");
  login.children[0].classList.remove("active");
  register.children[0].classList.remove("active");
    home.children[0].classList.add("active");
    homeDiv.classList.remove("home-container-hidden");
    homeDiv.classList.add("d-flex", "flex-column");
  adminDiv.classList.remove("d-flex", "flex-column");
  adminDiv.classList.add("admin-container-hidden");
  signupForm.classList.remove("signup-div");
  signupForm.classList.add("signup-hidden");
  signinForm.classList.remove("signin-div");
  signinForm.classList.add("signin-hidden");
});
login.addEventListener("click", () => {
    admin.children[0].classList.remove("active");
  login.children[0].classList.add("active");
  register.children[0].classList.remove("active");
  home.children[0].classList.remove("active");
  homeDiv.classList.add("home-container-hidden");
    homeDiv.classList.remove("d-flex", "flex-column");
    adminDiv.classList.add("admin-container-hidden");
    adminDiv.classList.remove("d-flex", "flex-column");
  if (signupForm.classList.contains("signup-div")) {
    signupForm.classList.remove("signup-div");
    signupForm.classList.add("signup-hidden");
  }
  signinForm.classList.remove("signin-hidden");
  signinForm.classList.add("signin-div");
});
register.addEventListener("click", () => {
    admin.children[0].classList.remove("active");
  login.children[0].classList.remove("active");
  register.children[0].classList.add("active");
  home.children[0].classList.remove("active");
  homeDiv.classList.add("home-container-hidden");
    homeDiv.classList.remove("d-flex", "flex-column");
    adminDiv.classList.add("admin-container-hidden");
    adminDiv.classList.remove("d-flex", "flex-column");
  if (signinForm.classList.contains("signin-div")) {
    signinForm.classList.remove("signin-div");
    signinForm.classList.add("signin-hidden");
  }
  signupForm.classList.remove("signup-hidden");
  signupForm.classList.add("signup-div");
});
