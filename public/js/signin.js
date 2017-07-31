const signinURL =  window.location.protocol + "//" + window.location.host + "/api/signin";
const profileURL = window.location.protocol + "//" + window.location.host + "/profile";

$(document).ready(function() {
$("form").form({
  fields: {
    email: {
      identifier: "email",
      rules: [
        {
          type: "empty",
          prompt: "Please enter your MIT issued Email"
        },
        {
          type: "email",
          prompt: "Please enter a valid MIT issued Email"
        },
        {
          type: "contains[@mit.edu]",
          prompt: "Please enter a valid MIT issued Email"
        }
      ]
    },
    password: {
      identifier: "password",
      rules: [
        {
          type: "empty",
          prompt: "Please enter a password"
        }
      ]
    }
  },
  onSuccess: function(e) {
      e.preventDefault();
      e.stopPropagation();
      var mail = $("#email").val();
      var pass = $("#password").val();

      var sendObject = JSON.stringify({email: mail, password: pass});
      $.ajax({
        type: "POST",
        url: signinURL,
        headers:  {"Content-Type": "application/json; charset=UTF-8"},
        data: sendObject,
        success: function(res) {
          if (res.message !== "success") {
            $('.server').addClass('visible').html(res.message);
          } else {
            if (res.token) {
              // if server sends token, figure out how to send token.
                sessionStorage.setItem('token', res.token);
                sessionStorage.setItem('kerberos', res.kerberos);
                window.location.replace(profileURL + "?kerberos=" + res.kerberos); //go to the profile, with the kerberos
            } else {
              $('.server').addClass('visible').html("Failed to authenticate, bad response. Please try again.");
            }
          }
        },
        error: function(res, status, error) {
            $('.server').addClass('visible').html("Could not contact server, please try again later.");
        }
      });
    }
  });
});
