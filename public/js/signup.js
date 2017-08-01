const signupURL = window.location.protocol + "//" + window.location.host + "localhost:3000/api/signup";
const signup2URL = window.location.protocol + "//" + window.location.host + "/signup2";

$(document).ready(function() {
  $("form").form({
    fields: {
      email: {
        identifier: "email",
        rules: [
          {
            type: "empty",
            prompt: "Please enter a valid MIT issued Email."
          },
          {
            type: "email",
            prompt: "Please enter a valid MIT issued Email."
          },
          {
            type: "contains[@mit.edu]",
            prompt: "Please enter a valid MIT issued Email."
          }
        ]
      },
      password: {
        identifier: "password",
        rules: [
          {
            type: "empty",
            prompt: "Please enter a password"
          },
          {
            type: "minLength[6]",
            prompt: "Please enter a more secure password"
          }
        ]
      },
      confirm_password: {
        identifier: "confirm_password",
        rules: [
          {
            type:"empty",
            prompt:"Please confirm your password by retyping it in the confirmation field."
          },
          {
            type: "match[password]",
            prompt: "Passwords do not match, Please make sure you have typed your passwords into both fields exactly or use a more memorable password."
          }
        ]
      }
    }
});
});
