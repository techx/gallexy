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
    },
    onSuccess: function(e) {
      e.preventDefault();
      e.stopPropagation();
      var mail = $("#email").val();
      var pass = $("#password").val();
      //begin AJAX call to API backend
      var sendObject = JSON.stringify({email: mail, password: pass});
      $.ajax({
        type: "POST",
        url: signupURL,
        headers: {"Content-Type": "application/json; charset=UTF-8"},
        data : sendObject,
        success: function(res) {
          if (res.message !== "success") {
            $('.server').addClass('visible').html(res.message);
          } else {
            window.location.replace(signup2URL);
          }
        },
        error: function(res, status, error) {
             $('.server').addClass('visible').html("Could not contact server, please try again later.");
          //render eror to form
        }
      });
    }
  });
});

// My type signature right now
// Angel_Alvarez :: (Code a) => Caffine -> a
