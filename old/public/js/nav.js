/* This script is supposed to implement all the navigation call backs, any page with buttons that navigate to other elements should include this*/

function signInClicked() {
  window.location.href = "/signin";
}

function signUpClicked() {
  window.location.href = "/signup";
}

function homeClicked() {
  window.location.href = "/"
}

function backClicked() {
  window.history.back()
}
