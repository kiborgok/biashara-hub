//require("dotenv").config();
let home = document.getElementById("home");
let homeDiv = document.querySelector(".home-container");
let login = document.getElementById("login");
let register = document.getElementById("register");
let signinForm = document.querySelector(".signin");
let signupForm = document.querySelector(".signup");
let activeLink = document.querySelector(".nav-link");

home.addEventListener("click", () => {
  login.children[0].classList.remove("active");
  register.children[0].classList.remove("active");
  home.children[0].classList.add("active");
  homeDiv.classList.add("d-flex", "flex-column");
  homeDiv.classList.remove("home-container-hidden");
  signupForm.classList.remove("signup-div");
  signupForm.classList.add("signup-hidden");
  signinForm.classList.remove("signin-div");
  signinForm.classList.add("signin-hidden");
});
login.addEventListener("click", () => {
  login.children[0].classList.add("active");
  register.children[0].classList.remove("active");
  home.children[0].classList.remove("active");
  homeDiv.classList.add("home-container-hidden");
  homeDiv.classList.remove("d-flex", "flex-column");
  if (signupForm.classList.contains("signup-div")) {
    signupForm.classList.remove("signup-div");
    signupForm.classList.add("signup-hidden");
  }
  signinForm.classList.remove("signin-hidden");
  signinForm.classList.add("signin-div");
});
register.addEventListener("click", () => {
  login.children[0].classList.remove("active");
  register.children[0].classList.add("active");
  home.children[0].classList.remove("active");
  homeDiv.classList.add("home-container-hidden");
  homeDiv.classList.remove("d-flex", "flex-column");
  if (signinForm.classList.contains("signin-div")) {
    signinForm.classList.remove("signin-div");
    signinForm.classList.add("signin-hidden");
  }
  signupForm.classList.remove("signup-hidden");
  signupForm.classList.add("signup-div");
});
