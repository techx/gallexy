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
  }
});
});
